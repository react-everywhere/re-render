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
    color: React.PropTypes.string,
    size: React.PropTypes.number,
};