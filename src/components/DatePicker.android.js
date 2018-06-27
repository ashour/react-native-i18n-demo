import React, { Component } from 'react';
import { DatePickerAndroid, Text } from 'react-native';

class DatePicker extends Component {
    state = {
        hasSelectedDate: false,
    }

    componentDidMount() {
        DatePickerAndroid.open({ date: this.props.date })
            .then(({ action, year, month, day }) => {
                if (action !== DatePickerAndroid.dismissedAction) {
                    this.setState({ hasSelectedDate: true });

                    this.props.onDateChange(new Date(year, month, day));
                }
            })
            .catch(({ message }) =>
                console.warn(`Could not open DatepickerAndroid: ${message}`));
    }

    render() {
        if (this.state.hasSelectedDate) {
            return <Text>{this.props.date.toString()}</Text>;
        }

        return null;
    }
}

export default DatePicker;
