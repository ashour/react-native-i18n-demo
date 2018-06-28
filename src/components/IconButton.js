import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import i18n from '../services/i18n';

class IconButton extends Component {
    static defaultProps = {
        style: {},
        color: '#333',
        flipForRTL: true,
        iconComponent: MaterialCommunityIcons,
    }

    getFlipForRTLStyle() {
        if (!this.props.flipForRTL) { return {}; };

        return {
            transform: [{
                scaleX: i18n.isRTL ? -1 : 1,
            }],
        };
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.button, this.getFlipForRTLStyle(), this.props.style]}
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
