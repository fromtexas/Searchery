import React, {Component} from 'react'
import {connect} from 'react-redux'

class TopBar extends Component {

  render () {
    let {uid, email} = this.props.auth;
    const renderOr = () => {
      if (uid) {
        return (
          <a href="#/user" className='btn btn-default nav-link'>{email}</a>
        )
      } else {
        return (
            <a href='#/registration' className='btn btn-default nav-link'>Sign up</a>
        )
      }
    }


    return (
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active drop-hover">
              {renderOr()}
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default connect(({auth})=>{
  return {
    auth
  }
})(TopBar)
