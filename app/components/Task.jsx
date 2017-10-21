import React, {Component} from 'react'
import placeholder from '../img/placeholder.png'
import moment from 'moment'


class Task extends Component {
  showTask (e) {
    window.location = `#/task/${this.props.id}`;
    e.preventDefault();
  }

  render () {

    const {id, name, location, info, description, cityImg, createdAt, city, reward} = this.props;
    const imgSrc = cityImg || placeholder;
    const date = moment.unix(createdAt).format('MMMM Do, YYYY @ k:mm ');
    return (
      <div onClick={this.showTask.bind(this)} className='task'>
        <img src={imgSrc}/>
        <div>
        <h3>{name}</h3>
        <p><span className='colored'>Reward:</span> {reward}</p>
        <p><span className='colored'>Adress:</span> {city}, {location}</p>
        <p><span className='colored'>Created at:</span> {date}</p>
        </div>
      </div>

    )
  }
}

export default Task
