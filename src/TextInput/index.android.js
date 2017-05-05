import PropTypes from 'prop-types';
import React from 'react';
import { TextInput } from 'react-native';


class TextInputAndroid extends React.Component {
    render() {
        return (
            <TextInput {...this.props}
                underlineColorAndroid={this.props.underlineColor}
            />
        );
    }
}

export default TextInputAndroid;

TextInputAndroid.propTypes = {
    underlineColor: PropTypes.string,
};