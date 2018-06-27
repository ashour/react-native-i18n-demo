import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Picker, Platform } from 'react-native';

class AddTodo extends Component {
    static navigationOptions = {
        title: "Add To-do",
    }

    state = {
        todoText: '',
    }

    onChangeText = (todoText) => this.setState({ todoText })

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>What are you planning?</Text>

                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.todoText}
                        onChangeText={this.onChangeText}
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
    },

    label: {
        fontSize: 18,
        marginBottom: 8,
    },

    textInputContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        ...Platform.select({
            ios: {
                shadowOpacity: 0.1,
                shadowRadius: 1,
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 1 },
            },
            android: {
                elevation: 2,
            }
        })
    },

    textInput: {
        height: 44,
        width: '100%',
        fontSize: 18,
        paddingHorizontal: 8,
        backgroundColor: 'white',
    }
});

export default AddTodo;
