import React, { Component } from 'react';
import { Text, Platform, TouchableOpacity, StyleSheet } from 'react-native';

class AddButton extends Component {
    static defaultProps = {
        style: {},
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.addButton, this.props.style]}
                onPress={this.props.onPress}
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
        backgroundColor: '#ccc',
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
        color: '#444',
        textAlign: 'center',
    },
});

export default AddButton;
