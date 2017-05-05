import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

export default class IconButton extends React.Component {
    render() {
        let touchableProps = {};

        if (this.props.onPress) {
            touchableProps.onPress = this.props.onPress;
            touchableProps.raised = true;
        }

        return (
            <Icon
                name={this.props.name}
                type='font-awesome'
                color={this.props.color}
                containerStyle={this.props.containerStyle}
                {...touchableProps}/>
        )
    }
}

IconButton.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    onPress: PropTypes.func,
    containerStyle: PropTypes.object,
};
