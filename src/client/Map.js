/* eslint-disable no-undef */
import React from 'react';
import { compose, withHandlers, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import geolib from 'geolib';

import { getLatLng, getLatitudeLongitude } from './helpers';
import AgencyList from './AgencyList';


const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBeHfgfTnQ_r6xolDXFy0iecSsZU_X_jMw&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  withHandlers(() => {
    const refs = {
      map: undefined,
    }

    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
    }
  }),
)((props) => {
    const sortedAgencies = props.agencies.sort((place1, place2) => {
    const addrLatLngs = props.addresses.map(getLatitudeLongitude);
    const place1LatLng = getLatitudeLongitude(place1);
    const place2LatLng = getLatitudeLongitude(place2);
    const totalDist = (latLng) => addrLatLngs.reduce((acc, addrLL) => acc + geolib.getDistance(addrLL, latLng), 0)
    return totalDist(place1LatLng) - totalDist(place2LatLng);
  })
  
  const placeMarker = (place, idx) => {
    return <Marker onClick={props.handlePlaceClick.bind(null, place)} position={getLatLng(place)} key={`marker${idx}`} />
  }
  const showAgencies = props.addresses.length === 2;
  return (
    <div>
      <GoogleMap
        id="map"
        ref={props.onMapMounted}
        defaultZoom={15}
        defaultCenter={{ lat: 40.7474836, lng:-73.8948295 }}
        center={props.center || { lat: 40.7474836, lng:-73.8948295 } }
      >
      {props.addresses.map(placeMarker)}
      {showAgencies ? props.agencies.map(placeMarker) : null}
      </GoogleMap>
      {showAgencies ? <AgencyList {...props} agencies={sortedAgencies} /> : null}
    </div>
  )
}
)

export default Map;