import React from "react";

export default class InputBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            borderColor: 'white',
            labelColor: 'white',
            value: ''
        };
    }

    onFocus() {
        this.setState({
            borderColor: '#5db3dd',
            labelColor: '#5db3dd'
        })
    }

    onBlur() {
        this.setState({
            borderColor: 'white',
            labelColor: 'white'
        })
    }

    bindValue(inputValue) {
        this.props.bindValue(inputValue)
    }
}