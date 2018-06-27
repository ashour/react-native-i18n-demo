import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class IconButton extends Component {
    static defaultProps = {
        style: {},
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.checkbox, this.props.style]}
            >
                <MaterialCommunityIcons
                    size={24}
                    color="#333"
                    name={this.props.icon}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        paddingTop: 2,
        paddingStart: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default IconButton;
