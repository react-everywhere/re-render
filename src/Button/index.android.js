import React from 'react';
import {TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

export default class CButton extends React.Component {
    render() {
        const {style,activeOpacity, ...passThroughProps} = this.props;
        return (
            <View style={{width:'100%'}}>
                <TouchableOpacity activeOpacity={activeOpacity} {...passThroughProps}
                                  style={style}>
                    {this.props.children}
                </TouchableOpacity>
            </View>
        )
    }
}

CButton.propTypes = {
    /**
     * Callback to be invoked when the button is pressed
     */
    onPress: PropTypes.func.isRequired,
    /**
     * Boolean value to disable or enable button
     */
    disabled: PropTypes.bool,
    /**
     * Style of the Button
     */
    style:PropTypes.object
};
