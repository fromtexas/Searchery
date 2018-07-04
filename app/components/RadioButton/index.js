import React, {Component} from 'react';


export default class RadioButton extends Component {


    checked () {
        return this.props.value === this.props.checkedValue;
    }

    onChange () {
        this.props.updateValue(this.props.value);
    }

    render () {
        return (         
            <label className='radio-btn'>
            <input onChange={this.onChange.bind(this)} checked={this.checked()} type='radio' name='radio-btn' value={this.props.value}/>
            {this.props.value}
            </label>
        );
    }
}