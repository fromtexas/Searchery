import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startRemovingTask} from 'actions'

class Modal extends Component{
  editTask (e) {
    window.location = `#/edit/${this.props.id}`;
    e.preventDefault();
  }
  remove (e) {
    e.preventDefault();
    this.props.dispatch(startRemovingTask(this.props.id))
  }
  hide (e) {
    this.props.show();
    e.preventDefault();
  }
  render () {
    const {name, action} = this.props;
    const or = () => {
      if(action === 'edit') {
        return <button onClick={this.editTask.bind(this)} type="button" className="btn">Yes</button>
      } else {
        return <button onClick={this.remove.bind(this)} type="button" className="btn">Yes</button>
      }
    };
    return (
      <div className='modal modal-window'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{action}</h5>
              <button onClick={this.hide.bind(this)} type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Start {action}ing <span className='colored-name'>{name}</span> task?</p>
            </div>
            <div className="modal-footer">
              {or()}
              <button onClick={this.hide.bind(this)} type="button" className="btn edit" data-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



export default connect()(Modal)
