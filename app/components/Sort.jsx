import React,{Component} from 'react'
import {connect} from 'react-redux'
import {startSort} from 'actions'

class Sort extends Component {
  handleSort (e) {
    e.preventDefault();
    if(e.target && e.target.nodeName == "A") {
      const nodeList = this.refs.sort.querySelectorAll('a');
      [...nodeList].forEach((node) => {
        node.removeAttribute('id');
      })
      e.target.setAttribute('id', 'active-sort')
      this.props.dispatch(startSort(e.target.dataset.sort))
    }
  }
  render () {
    return (
      <div ref='sort' onClick={this.handleSort.bind(this)} className='sort'>
        <a id='active-sort' data-sort='createdAt'>Created at</a>
        <a data-sort='completed'>Completed</a>
        <a data-sort='name'>Task`s name</a>
        <a data-sort='city'>City</a>
        <a data-sort='reward'>Reward</a>
      </div>
    )
  }
}

export default connect()(Sort)
