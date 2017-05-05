import React from 'react';
import HorizontalDivider from '../HorizontalDivider/index';
import VerticalDivider from '../VerticalDivider/index';


export default class Divider extends React.Component {
    render() {
        return (
            this.props.orientation === 'horizontal' ?
                <HorizontalDivider thickness={this.props.thickness} color={this.props.color}/>
                : <VerticalDivider thickness={this.props.thickness} color={this.props.color}/>
        )
    }
}

Divider.propTypes = {
    color: React.PropTypes.string,
    thickness: React.PropTypes.number.isRequired,
    orientation: React.PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
};