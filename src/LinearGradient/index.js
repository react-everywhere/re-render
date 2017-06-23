import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

export default class LinearGradient extends Component {

    static propTypes = {
        start: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}).isRequired,
        end: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}).isRequired,
        locations: PropTypes.arrayOf(PropTypes.number),
        colors: PropTypes.arrayOf(PropTypes.string).isRequired,
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    };

    render() {
        const {start, end, locations, colors, style, children, ...otherProps} = this.props;
        const vec = [end.x - start.x, -(end.y - start.y)];
        const angleRad = Math.atan(vec[1] / vec[0]);
        const angleDeg = Math.round((angleRad * 180) / Math.PI) + 180;
        const realLocations = locations || colors.map((color, i) => (1 / (colors.length - 1)) * i);
        const colorStrings = colors.map((color, i) => `${color} ${Math.round(realLocations[i] * 100)}%`).join(', ');
        return (
            <View
                {...otherProps}
                style={[style, {backgroundImage: `linear-gradient(${angleDeg}deg, ${colorStrings})`}]}>
                {children}
            </View>
        );
    }
}