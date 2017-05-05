import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export default class Spinner extends React.Component {
    render() {
        return (
            <ActivityIndicator color={this.props.color}
                               size={this.props.size}
                               animating={true}
                               hidesWhenStopped={true}/>
        )
    }
}

Spinner.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
};