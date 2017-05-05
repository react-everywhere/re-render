import React from 'react';
import { ProgressBarAndroid } from 'react-native';

export default class ProgressBar extends React.Component {
    render() {
        return (
            <ProgressBarAndroid
                style={{width:'100%'}}
                styleAttr={'Horizontal'}
                indeterminate={this.props.indeterminate}
                color={this.props.color}
                progress={this.props.progress}
            />
        )
    }
}

ProgressBar.propTypes = {
    color: React.PropTypes.string,
    indeterminate: React.PropTypes.bool,
    progress: React.PropTypes.number,
};