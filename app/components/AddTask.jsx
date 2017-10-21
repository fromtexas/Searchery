import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import * as actions from 'actions'
import * as API from 'API'

class AddTask extends Component {

  constructor (props) {
    super(props)
    this.state = {
      cities: [],
      hidden: true
    }
  }
    
  check () {
      const refsKeys = Object.keys(this.refs);
        refsKeys.forEach((key) => {
            if (!this.refs[key].value && key !== 'form') {

                const node = document.createElement('LABEL');                 
                const textNode = document.createTextNode('This field can\'t be empty!');      
                node.appendChild(textNode); 
                this.refs[key].parentElement.appendChild(node);
                
            }
        });
  }

  handleGetCities () {
      //probaly may create erros
    const city = this.refs.city.value ? this.refs.city.value : ' ';
    const service = new google.maps.places.AutocompleteService();
    const res = service.getPlacePredictions({ input: city, types: ['(cities)'] },
     (predictions, status) => {
       this.setState({cities: predictions ? predictions : []})
     });
  }

  geocode (location) {
    const geocoder = new google.maps.Geocoder();
    const promise = new Promise((resolve, reject) => {
      geocoder.geocode({'address': location}, (results, status) => {
        resolve(results)
      })
    });
    return promise
  }

  addNewTask (e) {
    e.preventDefault();
    this.check();
    const {uid, email} = this.props.auth;
    const name = this.refs.name.value;
    const location = this.refs.location.value;
    const info = this.refs.info.value;
    const description = this.refs.description.value;
    const city = this.refs.city.value;
    const category = this.refs.category.innerHTML;
    const reward = this.refs.reward.value;
    let latLng ={};
    let cityImg = '';
    const fulllocation = `${city}, ${location}`;
    //remove all special char
    const regExp = (/[^\w\s]/gi);
    const cityArr = city.split(regExp);
    if (name && location && info && description && city) {
    API.getPlace(cityArr[0]).then((res) => {
      if (res) {
        cityImg = res.photos[0].image.mobile;
      }

    this.geocode(fulllocation).then((res) => {

      latLng.lat = res[0].geometry.location.lat();
      latLng.lng = res[0].geometry.location.lng();

        const task = {
          uid,
          email,
          name,
          location,
          info,
          description,
          city: cityArr[0].trim(),
          category,
          reward,
          latLng,
          cityImg
        };
        this.props.dispatch(actions.startAddTask(task));
        this.refs.form.reset();
      

    });
    });
    }
  }
  addPredict (e) {
    this.refs.city.value = e.target.innerHTML;
    this.setState({
      cities: []
    });
  }

  showList () {
    this.setState({
      hidden: !this.state.hidden
    })
  }

  selectCategory (e) {
    if (e.target && e.target.nodeName == 'P') {
      this.refs.cat.innerHTML = e.target.innerHTML;
      this.showList()
    }
  }

  render () {

    const predictions = this.state.cities.map((city) => {
      return <li onClick={this.addPredict.bind(this)} key={city.id}>{city.description}</li>
    });
    const renderList = () => {
      if(this.state.cities.length) {
        return <ul className='list-unstyled city-auto'>{predictions}</ul>
      }
    }
    const renderCategoryList = () => {
      if(!this.state.hidden) {
        return (
          <div onClick={this.selectCategory.bind(this)} className='hidden'>
            <p>Pets</p>
            <p>Cleening</p>
            <p>Constructions</p>
            <p>Mooving</p>
            <p>Other</p>
          </div>
        )
      }
    }
    return (
      <div className='add-ticket'>
        <h3 className='action-title'>Add new ticket</h3>
        <h6>All fiels are required</h6>
          <form ref='form' onSubmit={this.addNewTask.bind(this)}>
            <div className='row'>
              <div className='col-6'>
                <div className="form-group">
                  <label>Ticket</label>
                  <input ref='name' type="text" className="form-control"  placeholder="Enter name of your ticket"/>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <div className='drop-wrap'>
                    <div onClick={this.showList.bind(this)} ref='category' className="form-control category-list">
                      Other
                    </div>
                    {renderCategoryList()}
                  </div>
                </div>
                <div className="form-group">
                  <label>Your city</label>
                  <input onChange={this.handleGetCities.bind(this)} ref='city' type="text" className="form-control"  placeholder="Enter your city name"/>
                    {renderList()}
                </div>
              </div>
              <div className='col-6'>
                <div className="form-group">
                  <label>Ticket location</label>
                  <input ref='location' type="text" className="form-control"  placeholder="Enter location of your ticket"/>
                </div>
                <div className="form-group">
                  <label>Reward</label>
                  <input ref='reward' type="text" className="form-control"  placeholder="Enter reward if u want"/>
                </div>
                <div className="form-group">
                  <label>Your contact info</label>
                  <input ref='info' type="text" className="form-control"  placeholder="Enter your contact info"/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea ref='description' rows="5" className="form-control"  placeholder="Enter your ticket's description"/>
            </div>
            <button type="submit" className="btn">Submit</button>
          </form>
      </div>
    )
  }
}

export default connect(({auth})=>{
  return {
    auth
  }
})(AddTask);
