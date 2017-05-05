import React from 'react';
import PropTypes from 'prop-types';
import { Image as RNImage, TouchableOpacity } from 'react-native';


//Image is imported as RNImage as the name of class is too Image and same name will cause conflict
class Image extends React.Component {
    render() {
        // eslint-disable-next-line
        const {children, ...passThroughProps} = this.props;

        return (
            <TouchableOpacity
                onPress={this.props.onPress}>
                <RNImage {...passThroughProps}
                         style={{
                             width: this.props.width || 60,
                             height: this.props.height || 60,
                             borderRadius: 30,
                             marginRight: 20
                         }}>
                    {children}
                </RNImage>
            </TouchableOpacity>
        )
    }
}

export default Image;

Image.propTypes = {
    onPress: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
};