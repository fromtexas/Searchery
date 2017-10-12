import React,{Component} from 'react'
import {connect} from 'react-redux'

class TestMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      map: {},
      markers: []
    }
  }

  initMap () {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(this.refs.map, {
      zoom: 10,
      center: uluru
    });
    this.state.map = map;
    this.setMarkers(map)
    map.addListener('click', function(event) {
         addMarker(event.latLng);
         console.log('added');
       });

     function addMarker(location) {
       var marker = new google.maps.Marker({
         position: location,
         map: map
       });
     }
  }

  setMarkers (map) {
    const geocoder = new google.maps.Geocoder();
    const {tickets} = this.props;
    const locations = filtered.map((ticket) => {
      return {
              ...ticket,
              full_loc: `${ticket.city}, ${ticket.location}`
            }
    });

    const markers = locations.map((location) => {
      geocoder.geocode({'address': location.full_loc}, (results, status) => {
        if(status === 'OK') {
          const marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map
          });
          return {
            ...location,
            marker
          }
        }
      })
    });

  this.setState({
    markers
  })
  }

  renderMarkers (mapStatus) {
    const {markers} = this.state;
    markers.forEach((item) => {
      item.marker.setMap(mapStatus)
    })
  }













  render () {
    return ()
  }
}
