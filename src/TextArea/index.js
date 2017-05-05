import React from 'react';
import TextInput from '../TextInput';


class TextArea extends React.Component {
    render() {
        return (
            <TextInput
                numberOfLines={4}
                {...this.props}
                multiline={true}
            />
        )
    }
}

export default TextArea;
