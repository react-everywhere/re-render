import React from 'react';
import { StyleSheet } from 'react-native';
import Carousel from 'react-native-looped-carousel';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default class CarouselComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Carousel
                style={styles.container}
                bullets={true}
                bulletStyle={{borderColor: '#333'}}
                chosenBulletStyle={{backgroundColor: '#333', borderColor: '#333'}}
                autoplay={false}
                pageInfo={false}>
                {this.props.children}
            </Carousel>
        )
    }
}


