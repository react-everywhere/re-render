import React from 'react';
import PropTypes from 'prop-types';
import RN from 'react-native';

const HorizontalDivider = ({thickness, color, style}) => {
    const s =  {
        ...RN.StyleSheet.flatten(style),
            backgroundColor: color || '#000',
            height: thickness,
            width: '100%'
        };
    return (

        <RN.View style={s}/>
    )
};

HorizontalDivider.propTypes = {
    thickness: PropTypes.number.isRequired,
    color: PropTypes.string,
    style: PropTypes.object,
};

export default HorizontalDivider;
