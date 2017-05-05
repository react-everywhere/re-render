import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

class Label extends React.Component {
    render() {
        const {value, ...passThroughProps} = this.props;
        return (
            <Text {...passThroughProps}>
                {value}
            </Text>
        )
    }
}

export default Label;

Label.propTypes = {
    value: PropTypes.string.isRequired,
    style: PropTypes.object,
};