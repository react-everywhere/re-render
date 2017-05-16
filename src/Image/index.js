import React from 'react';
import PropTypes from 'prop-types';
import { Image as RNImage, TouchableOpacity } from 'react-native';


class Image extends React.Component {
    render() {
        // eslint-disable-next-line
        const {children, style, ...passThroughProps} = this.props;

        const styles = {...style, ...{width: this.props.width, height: this.props.height,}};

        return (
            <TouchableOpacity
                onPress={this.props.onPress}>
                <RNImage {...passThroughProps}
                         style={styles}>
                    {children}
                </RNImage>
            </TouchableOpacity>
        )
    }
}

export default Image;

Image.defaultProps = {
    width: 60,
    height: 60,
};

Image.propTypes = {
    onPress: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
};