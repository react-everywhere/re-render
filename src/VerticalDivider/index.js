import PropTypes from 'prop-types';
import React from 'react';
import RN from 'react-native';

const VerticalDivider = ({thickness, color}) => {
    return (
        <RN.View style={{
            width: thickness,
            // FIXME: See how to give width = 100%
            height: 'inherit',
            backgroundColor: color || '#000',
        }}/>
    )
};

VerticalDivider.propTypes = {
    thickness: PropTypes.number.isRequired,
    color: PropTypes.string,
};

export default VerticalDivider;
