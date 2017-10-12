import React, {Component} from 'react'
import {removeFilter} from 'actions'
import {connect} from 'react-redux'

class ActiveFilter extends Component {
  handleRemove (e) {
    let key = e.target.dataset.key;
    let property = e.target.parentElement.textContent;
    this.props.dispatch(removeFilter(key, property));
  }
  render () {
    const {propKey, property} = this.props;

    return (
      <li className='active-filter list-inline-item'>
        <a>{property}<span onClick={this.handleRemove.bind(this)} data-key={propKey} className='ion-ios-close-outline cross'></span></a>
      </li>
    )
  }
}

export default connect()(ActiveFilter)
