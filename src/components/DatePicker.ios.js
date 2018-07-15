import React from 'react';
import { DatePickerIOS } from 'react-native';

import i18n from '../services/i18n';

const DatePicker = (props) => (
    <DatePickerIOS
        mode="date"
        date={props.date}
        locale={i18n.locale}
        minimumDate={props.minDate}
        onDateChange={props.onDateChange}
    />
);

export default DatePicker;
