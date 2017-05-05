import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePickerAndroid, Text, TouchableHighlight, View } from 'react-native';
import Moment from 'moment';


class DatePicker extends Component {
    constructor(props) {
        super(props);

        let defaultDate;
        if (this.props.defaultDate) defaultDate = Moment(this.props.defaultDate);

        this.state = {
            // FIXME: if I try to do selectedDate: defaultDate || new Date(),
            // I get Error: expected dynamic type double but had type string
            selectedDate: defaultDate ? new Date(defaultDate) : new Date(),
        };
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={this.onPressDate}>
                <View>
                    <View>
                        <Text>{this.props.placeholder}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    onPressDate = () => {
        DatePickerAndroid.open({
            date: this.state.selectedDate,
        }).then(this.onDatePicked);
    };

    onDatePicked = ({action, year, month, day}) => {
        if (action === DatePickerAndroid.dismissedAction) {
            return;
        }
        const date = new Date(year, month, day);
        // TODO: use locale formatting
        const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        this.setState({
            selectedDate: date
        });

        if (typeof this.props.onDateChange === 'function') {
            this.props.onDateChange(date, dateStr);
        }
    };
}


DatePicker.propTypes = {
    placeholder: PropTypes.string,
    onDateChange: PropTypes.func,

    defaultDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
};

export default DatePicker;