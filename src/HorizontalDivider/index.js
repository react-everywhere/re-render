import React from 'react';
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
    thickness: React.PropTypes.number.isRequired,
    color: React.PropTypes.string,
};

export default HorizontalDivider;
