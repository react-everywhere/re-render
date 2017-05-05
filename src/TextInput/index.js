import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10,
    }
});

class TextInputWeb extends React.Component {
    render() {
        return (
            <TextInput {...this.props}
                       style={[this.props.style, styles.textInput, {borderColor: this.props.underlineColor || 'gray'}]}
            />
        );
    }
}

export default TextInputWeb;

TextInputWeb.propTypes = {
    underlineColor: PropTypes.string,
};