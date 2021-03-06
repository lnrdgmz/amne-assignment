import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
} from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import React from 'react';

const SearchBar = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBeHfgfTnQ_r6xolDXFy0iecSsZU_X_jMw&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        input: '',
        handleChange: (event) => {
          this.setState({
            input: event.target.value,
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          this.props.updateAddresses(places)
          this.setState({input: ''})
        },
      })
    },
  }),
  withScriptjs  
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Enter address"
        value={props.input}
        onChange={props.handleChange}
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
    <ol>
      {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
        <li key={place_id}>
          {formatted_address}
          {" at "}
          ({location.lat()}, {location.lng()})
        </li>
      )}
    </ol>
  </div>
);

export default SearchBar;