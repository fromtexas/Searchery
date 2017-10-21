import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {styles} from 'MapStyle'
import {show} from 'actions'

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
    const {tickets} = this.props;
    const {id} = this.props.params;
    let current;
    const promise = new Promise((resolve, reject) => {
      current = tickets.find((item) => {
      if(item.id == id){
        return item
      }
      }) || this.props.dispatch(show(id)).then((res) => {
        //console.log(res.val());
        return res.val() || {};
      });
      resolve(current)
    });
    
    promise.then((res) => {
    this.setState({
      name: res.name,
      location: res.location,
      description: res.description,
      id: res.id,
      info: res.info,
      city: res.city,
      category: res.category,
      reward: res.reward,
      email: res.email,
      createdAt: res.createdAt,
      latLng: res.latLng
    }, this.setMap(res.latLng)
    );
    })
  }

  setMap (latLng) {
    const map = new google.maps.Map(this.refs.map, {
      zoom: 15,
      center: latLng,
      styles: styles
    });

    const marker = new google.maps.Marker({
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
