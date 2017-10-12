import React, {Component} from 'react'
import {connect} from 'react-redux'
import UsersTasks from 'UsersTasks'
import {startLogout} from 'actions'

class User extends Component {
  logout (e) {
    e.preventDefault();
    this.props.dispatch(startLogout());
  }
  render () {
    const {email, uid} = this.props.auth;
    const {tickets} = this.props;
    const currentUserTickets = tickets.filter((ticket) => {
      if (ticket.uid === uid){
        return ticket
      }
    });
    return (
      <div className='user'>
        <h3 className='action-title'>{email}</h3>
        <button onClick={this.logout.bind(this)} className='btn'>Logout</button>
        <p>You created {currentUserTickets.length} tasks</p>
        <UsersTasks current = {currentUserTickets}/>
      </div>
    )
  }
}

export default connect(({auth, tickets})=>{
  return {
    auth,
    tickets
  }
})(User)
