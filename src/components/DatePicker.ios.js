import React, { Component } from 'react';
import { Platform, DatePickerIOS } from 'react-native';

class DatePicker extends Component {
    render() {
        if (Platform.OS === 'ios') {
            return (
                <DatePickerIOS
                    mode="date"
                    locale="en_EG"
                    date={this.props.date}
                    minimumDate={this.props.minDate}
                    onDateChange={this.props.onDateChange}
                />
            );
        }

        return null;
    }
}

export default DatePicker;
