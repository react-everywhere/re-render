import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox as CB } from 'react-native-elements';

const iconType = ['check-square-o', 'check-square'];

export default class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        }
    }

    render() {
        // A user can pass whatever as checkedIcon.
        // Don't believe me... try passing apple as checkedIcon.
        // So we added the ternary below :)
        return (
            <CB
                title={this.props.title}
                checked={this.state.checked}
                checkedIcon={iconType.includes(this.props.checkedIcon) ? this.props.checkedIcon : 'check-square'}
                checkedColor={this.props.checkboxColor || 'black'}
                uncheckedColor={this.props.checkboxColor || 'black'}
                onPress={this.onClick}
            />
        )
    }

    onClick = () => {
        this.setState({
            checked: !this.state.checked
        }, this.afterSetStateCallback);
    };

    afterSetStateCallback = () => {
        if (typeof this.props.onCheckedChange === 'function')
            this.props.onCheckedChange(this.state.checked)
    }
}

CheckBox.propTypes = {
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onCheckedChange: PropTypes.func,
    checkboxColor: PropTypes.string,
    checkedIcon: PropTypes.oneOf(iconType)
};