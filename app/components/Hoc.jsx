import React, {Component} from 'react'
import {connect} from 'react-redux'



export default (Composed, Preloader) => {
  class ShowLoader extends Component {
    
    render () {
      const {tickets} = this.props;
      const renderPreloader = () => {
        return tickets.length ? <Composed/> : <Preloader/>
      };
      return (
        renderPreloader()
      )
    }
  }
  return connect(({tickets})=>{
    return {
      tickets
    }
  })(ShowLoader)
}

