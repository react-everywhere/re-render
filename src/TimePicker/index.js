import React from 'react';
import Moment from 'moment';

class TimePicker extends React.Component {
    constructor(props) {
        super(props);

        let t = this.props.defaultTime;
        if (typeof t === 'number')
            t = new Date(this.props.defaultTime);

        this.state = {
            selectedTime: t || new Date(),
            is24Hour: false,
        };
    }

    render() {
        let extraProps = {};
        if (this.props.defaultTime) {
            extraProps['defaultValue'] = Moment(this.props.defaultTime).format('HH:mm:ss');
        }

        return (
            <div>
                <input type="time"
                       {...extraProps}
                       placeholder={this.props.placeholder}
                       onChange={this.onTimePicked}/>
            </div>
        )
    }

    onTimePicked = (event) => {
        // FIXME: valueAsDate is giving some weird value. So we add a Jugaad for now
        let d = new Date();
        d.setHours(event.target.valueAsDate.getUTCHours());
        d.setMinutes(event.target.valueAsDate.getUTCMinutes());
        const time = event.target.valueAsDate;

        console.log("event.target.valueAsDate", event.target.valueAsDate);
        console.log("event.target.value", event.target.value);


        this.setState({
            selectedTime: time
        });
        // TODO: use locale formatting

        const timeStr = String(Moment(time).format(this.state.is24Hour ? 'HH:mm' : 'hh:mm A'));

        if (typeof this.props.onTimeChange === 'function') {
            this.props.onTimeChange(time, timeStr);
        }
    };
}

TimePicker.propTypes = {
    placeholder: React.PropTypes.string,
    onTimeChange: React.PropTypes.func,

    defaultTime: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Date), React.PropTypes.number]),
    is24Hour: React.PropTypes.bool,
};

export default TimePicker;