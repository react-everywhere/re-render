import React from 'react';
import { TextInput } from 'react-native';


const styles = {
    //FIXME: make width and height dynamic
    textInput: {
        height: 60,
        width: 150,
    }
};

class TextInputIOS extends React.Component {
    render() {
        const style = {...this.props.style, ...styles.textInput};
        return (
            <TextInput {...this.props}
                       style={style}
            />
        );
    }
}

export default TextInputIOS;
