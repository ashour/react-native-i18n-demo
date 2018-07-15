import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    Platform,
    TextInput,
    StyleSheet,
} from 'react-native';

import ListRepo from '../repos/ListRepo';
import i18n, { t } from '../services/i18n';
import DatePicker from '../components/DatePicker';

class AddTodoScreen extends Component {
    static navigationOptions = () => ({
        title: t("AddTodoScreen:title"),
    })

    state = {
        text: '',
        due: new Date(),
        hasChosenDueDate: false,
        isDatePickerOpen: false,
    }

    onChangeText = text => this.setState({ text })

    onAddDatePressed = () => {
        this.setState({
            isDatePickerOpen: true,
            hasChosenDueDate: true,
        });
    }

    onDateChange = due => {
        if (due === null) {
            this.setState({ isDatePickerOpen: false });
        } else {
            this.setState({ due });
        }
    }

    onSavePressed = async () => {
        const { text, hasChosenDueDate } = this.state;

        const due = hasChosenDueDate ? this.state.due : null;

        await ListRepo
            .with(this.props.navigation.state.params.listName)
            .addTodo({ text, due });

        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.label}>
                        {t("AddTodoScreen:todoLabel")}
                    </Text>

                    <View style={styles.textInputContainer}>
                        <TextInput
                            numberOfLines={1}
                            returnKeyType="done"
                            style={styles.textInput}
                            value={this.state.text}
                            onChangeText={this.onChangeText}
                            underlineColorAndroid="transparent"
                            placeholder=
                                {t("AddTodoScreen:todoPlaceholder")}
                        />
                    </View>

                    <Text style={styles.label}>
                        {t("AddTodoScreen:dueDateLabel")}
                    </Text>

                    {this.state.isDatePickerOpen
                        ?
                        <DatePicker
                            date={this.state.due}
                            minDate={new Date()}
                            onDateChange={this.onDateChange}
                        />
                        :
                        <Button
                            title={t("AddTodoScreen:addDueDateButton")}
                            onPress={this.onAddDatePressed}
                        />
                    }
                </View>

                <Button
                    title={t("AddTodoScreen:saveButton")}
                    onPress={this.onSavePressed}
                />
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
        color: '#333',
        marginBottom: 8,
        textAlign: 'left',
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
        color: '#333',
        backgroundColor: 'white',
        textAlign: i18n.isRTL ? 'right' : 'left',
    },
});

export default AddTodoScreen;
