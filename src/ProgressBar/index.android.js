import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Animated,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center'
    },

    progress_bar_status: {
        color: '#3c3c3c',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
});


export default class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.progress = new Animated.Value(0);
        this.state = {};
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.completeStatus !== nextProps.completeStatus) {
            this._initProgress()
        }
    }

    _initProgress = () => {
        this.progress.addListener((progress) => {
            this.setState({
                progress: parseInt(progress.value) + '%'
            });
        });
        Animated.timing(this.progress, {
            duration: 2000,
            toValue: this.props.completeStatus,
            // useNativeDriver: true
        }).start();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.completeStatus !== this.props.completeStatus) {
            this._initProgress()
        }
    }

    render() {
        const animated_width = this.progress.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%','100%']
        });
        const {progressColor, ...passThroughProps} = this.props
        const {progressBarStatusStyle, ...passThroughStyles} = passThroughProps || {}
        const {progressBarContainerStyle, ...moreStyleProps} = passThroughStyles || {}

        return (
            <View style={styles.container}>
                <View style={[progressBarContainerStyle]}>
                    <Animated.View
                        style={[{
                            width: animated_width,
                            backgroundColor: progressColor
                        }, progressBarStatusStyle]}
                    >
                        <Text style={styles.progress_bar_status}>
                            {this.state.progress}
                        </Text>
                    </Animated.View>
                </View>
            </View>
        );
    }

}

ProgressBar.defaultProps={
    progressBarStatusStyle: {
        height:20,
        borderRadius:4
    },
    progressBarContainerStyle:{
        borderWidth: 1,
        borderRadius:4,
        borderColor: '#333',
        backgroundColor: '#ccc'
    },
    progressColor:'#5AC6FF'
}

ProgressBar.propTypes = {
    /**
     * Percentage of completion without the percentage symbol
     */
    completeStatus: PropTypes.number.isRequired,
    /**
     * Style of the Progress status
     */
    progressBarStatusStyle:PropTypes.object,
    /**
     * Style of the Progress status container
     */
    progressBarContainerStyle:PropTypes.object,
    /**
     * Color of the Progressing bar
     */
    progressColor:PropTypes.string


}

