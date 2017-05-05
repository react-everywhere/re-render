import React from 'react';
import { Button, View } from 'react-native';
import PropTypes from 'prop-types';

export default class CButton extends React.Component {
    render() {
        const {style, ...passThroughProps} = this.props;
        const {color, ...passThroughStyles} = style || {};
        return (
            <View
                style={passThroughStyles}>
                <Button {...passThroughProps}
                        color={color}
                />
            </View>
        )
    }
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};
