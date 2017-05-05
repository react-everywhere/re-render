import React from 'react';
import PropTypes from 'prop-types';
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
    color: PropTypes.string,
    thickness: PropTypes.number.isRequired,
    orientation: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
};