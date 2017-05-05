import PropTypes from 'prop-types';
import React from 'react';
import { ProgressBarAndroid } from 'react-native';

export default class ProgressBar extends React.Component {
    render() {
        return (
            <ProgressBarAndroid
                style={{width: '100%'}}
                styleAttr={'Horizontal'}
                indeterminate={this.props.indeterminate}
                color={this.props.color}
                progress={this.props.progress}
            />
        )
    }
}

ProgressBar.propTypes = {
    color: PropTypes.string,
    indeterminate: PropTypes.bool,
    progress: PropTypes.number,
};