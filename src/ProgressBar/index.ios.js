import PropTypes from 'prop-types';
import React from 'react';
import { ProgressViewIOS } from 'react-native';

export default class ProgressBar extends React.Component {
    render() {
        return (
            <ProgressViewIOS
                progress={this.props.progress}
                progressTintColor={this.props.color}
                progressViewStyle={'bar'}
            />
        )
    }
}

ProgressBar.propTypes = {
    color: PropTypes.string,
    // TODO: Find a way to make indeterminate progress bar
    // indeterminate: PropTypes.bool,
    progress: PropTypes.number,
};