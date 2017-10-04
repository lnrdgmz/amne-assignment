import React, { Component } from 'react';
import geolib from 'geolib';

// import logo from './logo.svg';
// import './App.css';
import SearchBar from './SearchBar';
import Map from './Map';
import AgencyList from './AgencyList'
import { getLatLng, getLatitudeLongitude } from './helpers'

const TIMEOUT_LENGTH = 3000;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      agencies: [],
      mapCenter: undefined,
    }
    this.addPlaceToAddresses = this.addPlaceToAddresses.bind(this);
    this.fetchMoreAgencies = this.fetchMoreAgencies.bind(this);
    this.handlePlaceClick = this.handlePlaceClick.bind(this);
  }
  handlePlaceClick(place) {
    this.setState({
      mapCenter: getLatLng(place)
    })
  }
  fetchMoreAgencies(page) {
    fetch(`/api/getPage/${page}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })
    .then(resp => resp.json())
    .then(obj => {
      this.setState((prevState, props) => {
        return {
          agencies: prevState.agencies.concat(obj.results)
        }
      })
      // if last agency is less than 10 miles away, load more agencies
      const lastAgencyLatLng = getLatitudeLongitude(obj.results[obj.results.length - 1]);
      const addrsLatLng = this.state.addresses.map(getLatitudeLongitude);
      const distances = addrsLatLng.map((latLng) => {
        return geolib.getDistance(latLng, lastAgencyLatLng);
      });
      const totalDist = geolib.convertUnit('mi', distances.reduce((acc, d) => acc + d));
      if (totalDist < 10 && obj.next_page_token) {
        setTimeout(() => {
          this.fetchMoreAgencies(obj.next_page_token);
        }, TIMEOUT_LENGTH)
      }
    })
  }
  addPlaceToAddresses(places) {
    if (places.length !== 1) return;
    
    this.setState((prevState, props) => {
      return {
        addresses: prevState.addresses.concat(places)
      }
    });
    const place = places[0];
    const queryURL = `/api/findREAs?lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}`
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Access-Control-Allow-Origin', '*')
    
    var myInit = { method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default' };
    fetch(queryURL, myInit)
    .then(resp => resp.json())
    .then(obj => {
      this.setState((prevState, props) => {
        return {
          agencies: prevState.agencies.concat(obj.results)
        }
      })
      setTimeout(() => {
        this.fetchMoreAgencies(obj.next_page_token)
      }, TIMEOUT_LENGTH)
    })
    
  }
  render() {
    return (
      <div className="App">
        {this.state.addresses.length < 2 ? (
          <div>
            <p>Enter two addresses and see nearby real estate agencies.</p>
            <SearchBar updateAddresses={this.addPlaceToAddresses} />
          </div>
          ) : null
        }
        {/* {this.state.addresses.map(addrObj => <div>{addrObj.formatted_address}</div>)} */}
        <Map addresses={this.state.addresses}
          center={this.state.mapCenter}
          agencies={this.state.agencies}
          handlePlaceClick={this.handlePlaceClick} />
      </div>
    );
  }
}

export default App;
