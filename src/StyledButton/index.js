import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { defaultStyles } from './Styles';


export const DEFAULT_ACTIVE_OPACITY = 0.5;

class CustomButton extends React.Component {
    render() {
        let touchableProps = {
            activeOpacity: this._computeActiveOpacity(),
        };

        let {color, ...rest} = this.props.style || {};

        if (this.props.disabled) {
            color = defaultStyles.disabled.color;
            rest.backgroundColor = defaultStyles.disabled.backgroundColor;
            rest.borderColor = defaultStyles.disabled.borderColor;
        }

        // Set the onPress listener only if button is not disabled
        if (!this.props.disabled) {
            touchableProps.onPress = this.props.onPress;
        }

        color = color || defaultStyles.text.color;

        return (
            <TouchableOpacity
                {...touchableProps}
                style={{...defaultStyles.button, ...rest}}>

                <Text style={{color}}>
                    {this.props.title.toUpperCase()}
                </Text>
            </TouchableOpacity>
        )
    }

    _computeActiveOpacity() {
        if (this.props.disabled) {
            return 1;
        }

        return this.props.activeOpacity != null ? this.props.activeOpacity : DEFAULT_ACTIVE_OPACITY;
    }
}

export default CustomButton;

CustomButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};
