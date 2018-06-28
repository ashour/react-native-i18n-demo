import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class IconButton extends Component {
    static defaultProps = {
        style: {},
        color: '#333',
        iconComponent: MaterialCommunityIcons,
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.button, this.props.style]}
            >
                <this.props.iconComponent
                    size={24}
                    name={this.props.icon}
                    color={this.props.color}
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
