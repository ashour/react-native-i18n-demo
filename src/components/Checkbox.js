import React, { Component } from 'react';
import IconButton from './IconButton';

class Checkbox extends Component {
    static defaultProps = {
        style: {},
    }

    getStatusIcon() {
        return this.props.checked ?
            'checkbox-marked-outline' :
            'checkbox-blank-outline';
    }

    render() {
        return (
            <IconButton
                style={this.props.style}
                icon={this.getStatusIcon()}
                onPress={this.props.onToggle}
            />
        );
    }
}

export default Checkbox;
