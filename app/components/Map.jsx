import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as API from 'API'
import MapControls from 'MapControls'
import {styles} from 'MapStyle'

class Map extends Component {
  constructor (props) {
    super(props);
    this.state = {
      filterBy: this.props.filterBy,
      search: this.props.search,
      tickets: this.props.tickets,
      position: {},
      map: {},
      near: 0,
      markers: []
    }
  }
  componentWillReceiveProps (nextProps) {

    this.setState((prevState, props)=>{
      return {
        tickets:props.tickets,
        search:props.search,
        filterBy:props.filterBy
      }
    },()=>{
      this.hideMarkers();
      this.setMarkers(this.state.map);
    }
  )

  }

  setUserLocation(map) {
    const geoOptions = {
      maximumAge: 5 * 60 * 1000,
    };

    const infoWindow = new google.maps.InfoWindow({map: map});

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });

        infoWindow.setPosition(this.state.position);
        infoWindow.setContent(`U're here`);
        map.setCenter(this.state.position);
      }, () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }, geoOptions);
      } else {
      // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
      function handleLocationError(browserHasGeolocation, infoWindow) {
        infoWindow.setPosition(this.state.position);
        infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    }
  }



  setMarkers(map) {
    this.setState({
      markers: []
    });

    const geocoder = new google.maps.Geocoder();
    const {tickets, filterBy, search} = this.state;
    let {near} = this.state;
    const filtered = API.composeFilter(tickets, search,
       filterBy.city,
         filterBy.category,
           filterBy.formatedDate,
             filterBy.completed,
             'id');

//removw timeout and raplace it with callback
    setTimeout(()=>{


      filtered.forEach((location) =>{
        const calcDistance =  google.maps.geometry.spherical.computeDistanceBetween(
         new google.maps.LatLng(this.state.position),
         new google.maps.LatLng(location.latLng)
       );

        if(calcDistance < near || near === 0) {
         const marker = new google.maps.Marker({
           position: location.latLng,
           map: map
         });

         marker.addListener('click', () => {
           const infoWindow = new google.maps.InfoWindow({map: map});
           infoWindow.setContent(`
             <h5>${location.name}</h5>
             <p>${location.info}</p>
             <p>${location.description}</p>
           `);
           infoWindow.open(map, marker);
           map.setZoom(15);
           map.setCenter(marker.getPosition());
         });
         this.setState({
           markers:[...this.state.markers, marker]
         });
       }
      })
    },10)

  }

  getNearTasks (near) {
    this.setState({
       near
    }, () => {
      this.hideMarkers();
      this.setMarkers(this.state.map);
    })
  }

  hideMarkers () {
  const  {markers} = this.state;
  markers.forEach((marker) => {
    marker.setMap(null);
  })
  }

  showMarkers () {
    const  {markers} = this.state;
    markers.forEach((marker) => {
      marker.setMap(this.state.map);
    })
  }


  setMap() {
    const uluru = {lat: -25.363, lng: 131.044};



    const map = new google.maps.Map(this.refs.map, {
      zoom: 10,
      center: uluru,
      styles: styles
    });

    this.state.map = map;
    this.setUserLocation(map);
    this.setMarkers(map);
  }

  componentDidMount () {
        this.setMap()
  }

  render () {
    return (
    <div className='map-wrap'>
      <MapControls passNear={this.getNearTasks.bind(this)}/>
      <div className='map-buttons-wrap'>
          <button onClick={this.hideMarkers.bind(this)} className='btn edit'>Hide markers</button>
          <button onClick={this.showMarkers.bind(this)} className='btn'>Show markers</button>
      </div>
      <div ref='map' className='map'>
        <p>Map will be here</p>
      </div>
    </div>
    )
  }
}

export default connect(({tickets, search, filterBy}) => {
  return {tickets, search, filterBy}
})(Map)
