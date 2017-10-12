import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {styles} from 'MapStyle'

class ShowTask extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      description: '',
      id: 0,
      info: '',
      city: '',
      category: '',
      reward: '',
      email: ''
    }
  }

  componentDidMount () {
    var {tickets} = this.props;
    var {id} = this.props.params;
    var current = tickets.find((item) => {
      if(item.id == id){
        return item
      }
    });
    this.setState({
      name: current.name,
      location: current.location,
      description: current.description,
      id: current.id,
      info: current.info,
      city: current.city,
      category: current.category,
      reward: current.reward,
      email: current.email,
      createdAt: current.createdAt,
      latLng: current.latLng
    }, this.setMap(current.latLng)
  );
  }

  setMap (latLng) {
    var map = new google.maps.Map(this.refs.map, {
      zoom: 15,
      center: latLng,
      styles: styles
    });

    var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  }



  render () {
    const {name, location, description, info, city, category, reward, email, createdAt} = this.state;
    const date = moment.unix(createdAt).format('MMMM Do, YYYY @ k:mm ');
    const userEmail = email || 'Anonimus';
    return (
      <div className='current-task'>
        <h3>{name}</h3>
        <p><span className='colored-gray'>Category:</span> {category}</p>
        <p><span className='colored-gray'>Created at:</span> {date}</p>
        <p><span className='colored-gray'>Location:</span> {city}, {location}</p>
        <p><span className='colored-gray'>Contact info:</span> {info}</p>
        <p><span className='colored-gray'></span>{description}</p>
        <p><span className='colored-gray'>Reward:</span> {reward}</p>
        <p>{userEmail}</p>
          <div ref='map' className='map-show-task'>
            <p>Map will be here</p>
          </div>
      </div>
    )
  }
}

export default connect(({tickets}) => {
  return {
    tickets
  }
})(ShowTask);
