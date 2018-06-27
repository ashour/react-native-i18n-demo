import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    Platform,
    TextInput,
    StyleSheet,
    AsyncStorage,
} from 'react-native';

import DatePicker from '../components/DatePicker';
import ListRepo from '../repos/ListRepo';

class AddTodoScreen extends Component {
    static navigationOptions = {
        title: "Add To-do",
    }

    state = {
        text: '',
        due: new Date(),
        isDatePickerOpen: false,
    }

    onChangeText = text => this.setState({ text })

    openDatePicker = () => this.setState({ isDatePickerOpen: true })

    onDateChange = due => this.setState({ due })

    onSavePressed = async () => {
        const { text, due } = this.state;

        await ListRepo
            .with(this.props.navigation.state.params.listName)
            .saveTodo({ text, due });

        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.label}>What are you planning?</Text>

                    <View style={styles.textInputContainer}>
                        <TextInput
                            returnKeyType="done"
                            style={styles.textInput}
                            value={this.state.text}
                            onChangeText={this.onChangeText}
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <Text style={styles.label}>Due date</Text>

                    {this.state.isDatePickerOpen
                        ?
                        <DatePicker
                            date={this.state.due}
                            onDateChange={this.onDateChange}
                        />
                        :
                        <Button title="Add due date" onPress={this.openDatePicker} />
                    }
                </View>

                <Button title="Save" onPress={this.onSavePressed} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 35,
        paddingHorizontal: 16,
    },

    form: {
        flex: 1,
    },

    label: {
        fontSize: 18,
        marginBottom: 8,
    },

    textInputContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 40,
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
    },
});

export default AddTodoScreen;
