import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import ImagePicker from 'react-native-image-picker';

const launchType = ['picker', 'camera', 'gallery'];

export default class IP extends React.Component {

    state = {
        imagePath: null,
    };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View>
                        <Text>Select a Photo</Text>
                        {/*
                         { this.state.imagePath === null ? <Text>Select a Photo</Text> :
                         <Image style={styles.avatar} source={this.state.imagePath}/>
                         }
                         */}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        switch (this.props.launchType) {
            case 'camera':
                ImagePicker.launchCamera(options, (response) => {
                    this.handleResponse(response);
                });
                break;

            case 'gallery':
                ImagePicker.launchImageLibrary(options, (response) => {
                    this.handleResponse(response);
                });
                break;

            default:
                ImagePicker.showImagePicker(options, (response) => {
                    this.handleResponse(response);
                });
                break;
        }
    }

    handleResponse(response) {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled photo picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            this.setState({
                imagePath: response.uri
            }, () => {
                if (typeof this.props.onImageChange === 'function') {
                    this.props.onImageChange(this.state.imagePath);
                }
            });
        }
    }
}

IP.propTypes = {
    launchType: React.PropTypes.oneOfType(launchType).isRequired,
    onImageChange: React.PropTypes.func,
};