import React, {Component} from 'react'

class MapControls extends Component {
  getNearValue (e) {
    e.preventDefault()
    if (this.refs.nearInput.value) {
      this.props.passNear(this.refs.nearInput.value)
      this.refs.nearInput.value = ''
    } else {
      this.refs.nearInput.focus()
    }
  }
  render () {
    return (
      <div className='map-controls'>
       <div className='row'>
           <div className='col-6'>
               <form onSubmit={this.getNearValue.bind(this)} ref='nearForm'>
                  <div className="form-group">
                    <label>Find near</label>
                    <input ref='nearInput' type="text" className="form-control" placeholder='In meters'/>
                  </div>
                  <button type="submit" className="btn">Submit</button>
               </form>
           </div>
       </div>
        
      </div>
    )
  }
}

export default MapControls
