import React from 'react';
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
    value: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
};