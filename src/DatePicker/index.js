import React from 'react';
import Moment from 'moment';

class DatePicker extends React.Component {
    constructor(props) {
        super(props);

        let defaultDate;
        if (this.props.defaultDate) defaultDate = Moment(this.props.defaultDate);

        this.state = {
            selectedDate: defaultDate || new Date(),
        };
    }

    render() {
        let extraProps = {};
        if (this.props.defaultDate) {
            extraProps['defaultValue'] = Moment(this.props.defaultDate).format('YYYY-MM-DD');
        }

        return (
            <div>
                <input type="date"
                       {...extraProps}
                       style={{height: 48, border: 0}}
                       placeholder={this.props.placeholder}
                       onChange={this.onDatePicked}/>
            </div>
        )
    }

    onDatePicked = (event) => {
        const date = event.target.valueAsDate;
        this.setState({
            selectedDate: date
        });

        // TODO: use locale formatting
        const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        if (typeof this.props.onDateChange === 'function') {
            this.props.onDateChange(date, dateStr);
        }
    };
}

DatePicker.propTypes = {
    placeholder: React.PropTypes.string,
    onDateChange: React.PropTypes.func,

    defaultDate: React.PropTypes.oneOfType([React.PropTypes.instanceOf(Date), React.PropTypes.string]),
};

export default DatePicker;