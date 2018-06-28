import React, { Component } from 'react';
import { Text, Platform, TouchableOpacity, StyleSheet } from 'react-native';

class AddButton extends Component {
    static defaultProps = {
        style: {},
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[styles.addButton, this.props.style]}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    addButton: {
        width: 50,
        height: 50,
        paddingStart: 1,
        paddingBottom: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: Platform.OS === 'ios' ? '#0076FF' : '#2962FF',
        ...Platform.select({
            ios: {
                shadowOpacity: 0.3,
                shadowRadius: 1,
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 1 },
            },
            android: {
                elevation: 2,
            }
        })
    },

    addButtonText: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
});

export default AddButton;
