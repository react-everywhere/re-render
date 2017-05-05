import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { defaultStyles } from './Styles';


class Button extends React.Component {
    render() {
        let touchableProps = {
            background: this._computeFeedbackBackground()
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
            <TouchableNativeFeedback
                {...touchableProps}>

                <View style={{...defaultStyles.button,...rest}}>
                    <Text style={{color}}>
                        {this.props.title.toUpperCase()}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        )
    }

    _computeFeedbackBackground() {
        if (this.props.disabled) {
            return null;
        }

        return TouchableNativeFeedback.SelectableBackground();
    }
}

export default Button;

Button.propTypes = {
    title: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool,
};
