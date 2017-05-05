import React from 'react';
import PropTypes from 'prop-types';
import RN from 'react-native';

const HorizontalDivider = ({thickness, color}) => {
    return (
        <RN.View style={{
            backgroundColor: color || '#000',
            height: thickness,
            width: '100%'
        }}/>
    )
};

HorizontalDivider.propTypes = {
    thickness: PropTypes.number.isRequired,
    color: PropTypes.string,
};

export default HorizontalDivider;
