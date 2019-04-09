import React from 'react'
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native'


export default class RadioButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    _onPress = (item, index) => {
        this.setState({
            active_index: index
        });
        if (this.props.onSelect) {
            this.props.onSelect(item, index)
        }

    }


    renderRadioCircle = (isSelected) => {
        return (
            <View style={{
                height: this.props.buttonSize/2,
                width: this.props.buttonSize/2,
                borderRadius: this.props.buttonSize>=30?((this.props.buttonSize/2)-8):10,
                backgroundColor: isSelected ? this.props.buttonColor : "transparent",
            }}/>
        )
    }

    renderRadioButton = (item, i) => {
        let isSelected = false
        if (this.state.active_index === i) {
            isSelected = true;
        }
        return (
            <View key={i} style={{
                flexDirection: this.props.horizontalLabelOrientation ? 'row' : 'column',
                alignItems: 'center',
                justifyContent:this.props.horizontalLabelOrientation?'flex-start':'space-between',
                paddingTop:5
            }}>
                <TouchableOpacity
                    key={i}
                    onPress={() => this._onPress(item, i)}
                >
                    <View
                        style={[{
                            height: this.props.buttonSize,
                            width: this.props.buttonSize,
                            borderRadius:this.props.buttonSize-8,
                            borderWidth: 2,
                            borderColor: this.props.buttonColor,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, this.props.style]}>
                        {
                            this.renderRadioCircle(isSelected)
                        }
                    </View>
                </TouchableOpacity>
                <View style={{paddingLeft: 5}}>
                    <Text style={{fontSize: 18, color: '#3c3c3c'}}>{item.option}</Text>
                </View>
            </View>
        )

    }

    render() {
        return (
            <View style={{width:'100%'}}>
                <Text style={this.props.titleStyle}>{this.props.title}</Text>
                <View style={[{
                    flexDirection: this.props.horizontalButtonOrientation ? 'row' : 'column',
                },this.props.buttonGroupStyle]}>
                    {this.props.choices.map((choice, key) => this.renderRadioButton(choice, key))}
                </View>
            </View>
        );
    }
}

RadioButton.defaultProps = {
    titleStyle: {
        fontSize: 21,
        color: '#3c3c3c',
        fontFamily: 'Nunito'
    },
    horizontalLabelOrientation:true,
    buttonColor:'#3c3c3c'
}
RadioButton.propTypes = {
    /**
     * Callback to be invoked when a Radio Button is selected
     */
    onSelect: PropTypes.func,
    /**
     * Title of the Radio Button Group
     */
    title: PropTypes.string,
    /**
     * Style of the Radio Button Title
     */
    titleStyle: PropTypes.object,
    /**
     * Size of the Radio Button Group wrapper
     */
    buttonGroupStyle: PropTypes.object,
    /**
     * An array of objects of the format {option:''}
     */
    choices: PropTypes.arrayOf(PropTypes.shape({
        option: PropTypes.string.isRequired,
    })).isRequired,
    /**
     * A boolean value to set Radio Button orientation whether Horizontal or Vertical
     */
    horizontalButtonOrientation: PropTypes.bool,
    /**
     * A boolean value to set Radio Button label's orientation whether Horizontal or Vertical
     */
    horizontalLabelOrientation: PropTypes.bool,
    /**
     * Size of the Radio Button
     */
    buttonSize:PropTypes.number,
    /**
     * Color of the Radio Button
     */
    buttonColor:PropTypes.string,

}