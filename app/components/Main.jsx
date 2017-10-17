import React, {Component} from 'react'
import TopBar from 'TopBar'
import SideBar from 'SideBar'
import ControlsBar from 'ControlsBar'
import Footer from 'Footer'
import head from '../img/head.png'



class Main extends Component {
  render () {
    return (
      <div className='main'>
        <TopBar/>
        <div className='main-head'>
          <img src={head} />
          <h1>SEARCHERY</h1>
        </div>
        <div className='container-fluid'>
          <div className='row mt-3 mb-3'>
            <SideBar/>
            <div className='col'>
              <ControlsBar/>
              {this.props.children}
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Main
