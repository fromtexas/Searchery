import React, {Component} from 'react'
import Modal from 'Modal'




class UserTask extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      action: ''
    }
  }
  handleShowModal (e) {
    const event = e || null;
    let action = '';
    if (event) action = event.target.dataset.action;
    this.setState({
      showModal: !this.state.showModal,
      action
    })
  }
  render () {
    const {name,id} = this.props;
    const link = `/#/task/${id}`;

    const renderModal = () => {
      if (this.state.showModal) {
        return <Modal name={name} show={this.handleShowModal.bind(this)}  action={this.state.action}  id={id}/>
      }
    }
    return (
      <div className='user-task col-2'>
        <a href={link}>{name}</a>
        <button data-action='edit' onClick={this.handleShowModal.bind(this)} className='btn btn-primary action-button'>Edit</button>
        <button data-action='delete' onClick={this.handleShowModal.bind(this)} className='btn btn-danger action-button'>Delete</button>
        {renderModal()}
      </div>
    )
  }
}

export default UserTask
