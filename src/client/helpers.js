const getLatLng = (place) => {
  if (typeof place.geometry.location.lat === 'function') {
    return {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }
  } else {
    return {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng
    }
  }
}

const getLatitudeLongitude = (place) => {
  const {lat, lng} = getLatLng(place);
  return {
    latitude: lat,
    longitude: lng
  }
}

export {
  getLatLng,
  getLatitudeLongitude
}