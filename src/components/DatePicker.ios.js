import React, { Component } from 'react';
import { Platform, DatePickerIOS } from 'react-native';

import i18n from '../services/i18n';

class DatePicker extends Component {
    render() {
        if (Platform.OS === 'ios') {
            return (
                <DatePickerIOS
                    mode="date"
                    locale={i18n.locale}
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
