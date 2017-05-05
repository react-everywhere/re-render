import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TimePickerAndroid, TouchableHighlight, View } from 'react-native';
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
            <TouchableHighlight
                underlayColor={'transparent'}
                onPress={this.onPressTime}>
                <View>
                    <View>
                        <Text>{this.props.defaultTime ? String(Moment(this.state.selectedTime).format(this.state.is24Hour ? 'HH:mm' : 'hh:mm A')) : this.props.placeholder}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    onPressTime = () => {
        TimePickerAndroid.open({
            hour: this.state.selectedTime.getHours(),
            minute: this.state.selectedTime.getMinutes(),
            is24Hour: this.state.is24Hour,
        }).then(this.onTimePicked);
    };

    onTimePicked = ({action, hour, minute}) => {
        if (action === TimePickerAndroid.dismissedAction) {
            return;
        }

        let time = new Date();
        time.setHours(hour);
        time.setMinutes(minute);
        time.setSeconds(0);

        const timeStr = String(Moment(time).format(this.state.is24Hour ? 'HH:mm' : 'hh:mm A'));

        this.setState({
            selectedTime: time
        });

        if (typeof this.props.onTimeChange === 'function') {
            this.props.onTimeChange(time, timeStr);
        }
    };
}


TimePicker.propTypes = {
    placeholder: PropTypes.string,
    onTimeChange: PropTypes.func,

    defaultTime: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
    is24Hour: PropTypes.bool,
};

export default TimePicker;