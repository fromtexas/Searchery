import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startEditTask} from 'actions'

class EditTask extends Component {

  constructor (props) {
    super(props);
    this.state = {
      cities: [],
      name: '',
      location: '',
      description: '',
      id: 0,
      info: '',
      city: '',
      completed: '',
      category: '',
      reward: '',
      hidden: true
    }
  }

  handleGetCities (e) {
    this.handleEdit(e)
    const city = this.refs.city.value ? this.refs.city.value : ' ';
    const service = new google.maps.places.AutocompleteService();
    const res = service.getPlacePredictions({ input: city, types: ['(cities)'] },
     (predictions, status) => {
       this.setState({cities: predictions ? predictions : []})
     });
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

  editTask (e) {
    e.preventDefault();
    const editState = {
      id: this.state.id,
      name: this.state.name,
      location: this.state.location,
      description: this.state.description,
      info: this.state.info,
      city: this.state.city,
      completed: this.state.completed,
      category: this.state.category,
      reward: this.state.reward

    };
    
    this.check();
    if (editState.name && editState.location && editState.info && editState.description && editState.city){
        this.props.dispatch(startEditTask(editState));
        window.location = `#/user/`;
    }
    
    
  }

  handleEdit (e) {
   this.setState({[e.target.dataset.ref]: e.target.value});
 }

  componentDidMount () {
    const {tickets} = this.props;
    const {id} = this.props.params;
    const current = tickets.find((item) => {
      if(item.id == id){
        return item
      }
    });
    this.setState({
      name: current.name,
      location: current.location,
      description: current.description,
      id: current.id,
      info: current.info,
      city: current.city,
      completed: current.completed,
      category: current.category,
      reward: current.reward
    })
  }

  showList () {
    this.setState({
      hidden: !this.state.hidden
    })
  }
    
  selectCategory (e) {
    if (e.target && e.target.nodeName == 'P') {
        this.setState({
            category: e.target.innerHTML
        })
      this.showList()
    }
  }

  addPredict (e) {
    this.setState({
      cities: [],
      city: e.target.innerHTML
    });
  }

  render () {
    const predictions = this.state.cities.map((city) => {
      return <li onClick={this.addPredict.bind(this)} key={city.id}>{city.description}</li>
    });
    const renderList = () => {
      if(this.state.cities.length) {
        return <ul className='list-unstyled city-auto'>{predictions}</ul>
      }
    };
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
      <div className='edit-task'>
        <h3 className='action-title'>Edit</h3>
          <form ref='form' onSubmit={this.editTask.bind(this)}>
            <div className='row'>
              <div className='col-6'>
                <div className="form-group">
                  <label>Ticket</label>
                  <input data-ref='name' onChange={this.handleEdit.bind(this)} value={this.state.name} ref='name' type="text" className="form-control"  placeholder="Enter name of your ticket"/>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <div className='drop-wrap'>
                    <div onClick={this.showList.bind(this)} ref='cat' className="form-control category-list">
                      {this.state.category}
                    </div>
                    {renderCategoryList()}
                  </div>
                </div>
                <div className="form-group">
                  <label>Your city</label>
                  <input data-ref='city'  value={this.state.city} onChange={this.handleGetCities.bind(this)} ref='city' type="text" className="form-control"  placeholder="Enter your city name"/>
                    {renderList()}
                </div>
              </div>
              <div className='col-6'>
                <div className="form-group">
                  <label>Ticket location</label>
                  <input data-ref='location' onChange={this.handleEdit.bind(this)} value={this.state.location} ref='location' type="text" className="form-control"  placeholder="Enter location of your ticket"/>
                </div>
                <div className="form-group">
                  <label>Reward</label>
                  <input data-ref='reward' onChange={this.handleEdit.bind(this)} value={this.state.reward} ref='reward' type="text" className="form-control"  placeholder="Enter reward if u want"/>
                </div>
                <div className="form-group">
                  <label>Your contact info</label>
                  <input data-ref='info' onChange={this.handleEdit.bind(this)} value={this.state.info} ref='info' type="text" className="form-control"  placeholder="Enter your contact info"/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea data-ref='description' onChange={this.handleEdit.bind(this)} value={this.state.description} ref='description' rows="5" className="form-control"  placeholder="Enter your ticket's description"/>
            </div>
            <button type="submit" className="btn">Submit</button>
          </form>
      </div>
    )
  }
}

export default connect(({tickets}) => {
  return {
    tickets
  }
})(EditTask)
