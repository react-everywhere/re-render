import PropTypes from 'prop-types';
import React from 'react';
import { ProgressBar as PB } from 'react-native-web';

export default class ProgressBar extends React.Component {
    render() {
        return (
            <PB
                style={{width: '100%'}}
                color={this.props.color}
                indeterminate={this.props.indeterminate}
                progress={this.props.progress}
                trackColor={this.props.trackColor}/>
        )
    }
}

ProgressBar.defaultProps = {
    trackColor: '#e0e0e0'
};

ProgressBar.propTypes = {
    color: PropTypes.string,
    indeterminate: PropTypes.bool,
    progress: PropTypes.number,
    trackColor: PropTypes.string,
};