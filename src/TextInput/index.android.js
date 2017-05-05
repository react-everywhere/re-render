import React from 'react';
import { TextInput } from 'react-native';


class TextInputAndroid extends React.Component {
    render() {
        return (
            <TextInput {...this.props}
            />
        );
    }
}

export default TextInputAndroid;

