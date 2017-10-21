import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import * as actions from 'actions'
import {noDupe} from 'API'

import ActiveFiltersList from 'ActiveFiltersList'

class ControlsBar extends Component{

  getSearchValue (e) {
    const searchVal = this.refs.search.value;
    this.props.dispatch(actions.getSearch(searchVal))
    e.preventDefault();
  }

  handleFilter (e) {
    if(e.target && e.target.nodeName == "P"){
      const key = e.target.dataset.key;
      const property = e.target.innerHTML;
      this.props.dispatch(actions.filterBy(key, property));
    }
  }

  focusField () {
    this.refs.searchField.setAttribute('id', 'focused')
  }

  removeId () {
    this.refs.searchField.removeAttribute('id')
  }

  render () {
    const {tickets} = this.props;

    const datesNoDupe = noDupe(tickets, 'formatedDate');
    const arrWithoutDupe = datesNoDupe.map((item) => <p data-key='formatedDate' key={item}>{item}</p>);

    const citiesNoDupe = noDupe(tickets, 'city');
    const arrCitiesWithoutDupe = citiesNoDupe.map((item) => <p data-key='city' key={item}>{item}</p>);

    return (
      <nav className="navbar navbar-expand-lg">

          <ul className="navbar-nav mr-auto controls-list">
            <li  className="nav-item date-hover">
              <a className="btn" href="#">Date</a>
              <div onClick={this.handleFilter.bind(this)} className='date-dropdown'>
                {arrWithoutDupe}
                <p data-key='formatedDate'>All</p>
              </div>
            </li>
            <li  className="nav-item date-hover">
              <a className="btn" href="#">City</a>
              <div onClick={this.handleFilter.bind(this)} className='date-dropdown'>
                {arrCitiesWithoutDupe}
                <p data-key='city'>All</p>
              </div>
            </li>
            <li className="nav-item date-hover">
              <a className="btn" href="#">Status</a>
                <div onClick={this.handleFilter.bind(this)} className='date-dropdown'>
                  <p data-key='completed'>Completed</p>
                  <p data-key='completed'>Not completed</p>
                  <p data-key='completed'>All</p>
                </div>
            </li>
            <li className="nav-item date-hover">
              <a className="btn" href="#">Category</a>
                <div onClick={this.handleFilter.bind(this)} className='date-dropdown'>
                  <p data-key='category'>Pets</p>
                  <p data-key='category'>Cleening</p>
                  <p data-key='category'>Constructions</p>
                  <p data-key='category'>Mooving</p>
                  <p data-key='category'>Other</p>
                  <p data-key='category'>All</p>
                </div>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto controls-list">
              <li><Link className="btn" to='add'>Add</Link></li>
          </ul>
          <div ref='searchField' className='search-field'>
            <ActiveFiltersList/>
            <input onBlur={this.removeId.bind(this)} onFocus={this.focusField.bind(this)} onChange={this.getSearchValue.bind(this)} ref='search' className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
          </div>

      </nav>
    )
  }
}

export default connect(({tickets}) => {
  return {
    tickets
  }
})(ControlsBar)
