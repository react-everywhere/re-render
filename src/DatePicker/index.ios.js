import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePickerIOS } from 'react-native';


class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDate: this.props.defaultDate || new Date(),
            mode: this.props.mode || "date"
        }
    }

    render() {
        return (
            <DatePickerIOS
                date={this.state.selectedDate}
                mode={this.state.mode}

                onDateChange={this.onDatePicked}/>
        )
    }

    onDatePicked = (date) => {
        this.setState({selectedDate: date});

        const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        if (typeof this.props.onDateChange === 'function') {
            this.props.onDateChange(date, dateStr);
        }
    }
}

DatePicker.propTypes = {
    onDateChange: PropTypes.func,
    defaultDate: PropTypes.instanceOf(Date),
};

export default DatePicker;