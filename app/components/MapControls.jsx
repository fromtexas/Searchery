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
        <form onSubmit={this.getNearValue.bind(this)} ref='nearForm' className='form-inline'>
          <div className="form-group">
            <label>Tasks near u </label>
            <input ref='nearInput' type="text" className="form-control" placeholder='in meters'/>
          </div>
          <button type="submit" className="btn">Confirm identity</button>
        </form>
      </div>
    )
  }
}

export default MapControls
