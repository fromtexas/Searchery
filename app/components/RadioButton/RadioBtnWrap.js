import React, {Component} from 'react';

export default class RadioBtnWrap extends Component {
    constructor (props){
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    update (value) {
        this.setState({value});
        this.props.getValue(value);
    }

    render () {
        const { children } = this.props;
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, { updateValue: this.update.bind(this), checkedValue: this.state.value }));
        return <div>{childrenWithProps}</div>
    }
}