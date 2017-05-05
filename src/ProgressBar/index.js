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
                trackColor={this.props.trackColor || '#e0e0e0'}/>
        )
    }
}

ProgressBar.propTypes = {
    color: React.PropTypes.string,
    indeterminate: React.PropTypes.bool,
    progress: React.PropTypes.number,
    trackColor: React.PropTypes.string,
};