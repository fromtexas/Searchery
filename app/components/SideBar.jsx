import React, {Component} from 'react'
import {Link} from 'react-router'

class SideBar extends Component {
  render () {
    return (
      <div className="col-2">
          <div className="card">
            <div className="card-header"><Link to='/'>Main</Link></div>
            <div className="card-header"><Link to='map'>Map</Link></div>
            <div className="card-header"><Link to='add'>Add</Link></div>
          </div>
      </div>
    )
  }
}

export default SideBar
