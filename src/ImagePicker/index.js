import React from 'react';

const launchType = ['picker', 'camera', 'gallery'];

export default class ImagePicker extends React.Component {
    constructor() {
        super();
        this.state = {
            imagePath: null,
            file: null,
        }
    }

    /*
     * https://developer.mozilla.org/en-US/docs/Mozilla/B2G_OS/API/Camera_API/Introduction
     */
    render() {
        switch (this.props.launchType) {
            case 'camera':
                return (
                    <input type="file" capture="camera" accept="image/*" onChangeCapture={this.onImageSelected}/> );
            case 'picker':
            case 'gallery':
            default:
                return (<input type="file" accept="image/*" onChangeCapture={this.onImageSelected}/> );
        }
    }

    onImageSelected = (event) => {
        // Get a reference to the taken picture or chosen file
        let files = event.target.files, file;
        if (files && files.length > 0) {
            file = files[0];
            this.setState({
                file
            }, () => {
                if (typeof this.props.onImageChange === 'function') {
                    this.props.onImageChange(this.state.imagePath, this.state.file);
                }
            })
        }

        try {
            // Create ObjectURL
            let imgURL = window.URL.createObjectURL(file);

            // Set imagePath in state
            this.setState({
                imagePath: imgURL
            });

            // Revoke ObjectURL
            // URL.revokeObjectURL(imgURL);
        }
        catch (e) {
            try {
                // Fallback if createObjectURL is not supported
                let fileReader = new FileReader();
                fileReader.onload = (event) => {
                    this.setState({
                        imagePath: event.target.result
                    }, () => {
                        if (typeof this.props.onImageChange === 'function') {
                            this.props.onImageChange(this.state.file, this.state.file);
                        }
                    });
                };
                fileReader.readAsDataURL(file);
            }
            catch (e) {
                // TODO
                console.log(e);
            }
        }
    }
}

ImagePicker.propTypes = {
    launchType: React.PropTypes.oneOf(launchType).isRequired,
    onImageChange: React.PropTypes.func,
};