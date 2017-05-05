import React, { Component } from 'react';
import { DatePickerIOS } from 'react-native';
import Moment from 'moment';


class TimePicker extends Component {
    constructor(props) {
        super(props);

        let t = this.props.defaultTime;
        if (typeof t === 'number')
            t = new Date(this.props.defaultTime);

        this.state = {
            selectedTime: t || new Date(),
            is24Hour: this.props.is24Hour || false,
        };
    }

    render() {
        return (
            <DatePickerIOS
                date={this.state.selectedDate}
                mode={this.state.mode}
                onDateChange={this.onTimePicked}/>
        );
    }

    onTimePicked = (time) => {
        this.setState({selectedTime: time});

        const timeStr = String(Moment(time).format(this.state.is24Hour ? 'HH:mm' : 'hh:mm A'));

        if (typeof this.props.onTimeChange === 'function') {
            this.props.onTimeChange(time, timeStr);
        }
    }
}


TimePicker.propTypes = {
    onTimeChange: React.PropTypes.func,

    defaultTime: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Date), React.PropTypes.number]),
    is24Hour: React.PropTypes.bool,
};

export default TimePicker;