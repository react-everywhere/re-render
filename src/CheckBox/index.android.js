import React from 'react'
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native'

export default class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        let arr = []
        let i = 0;
        props.choices.map(item => {
            const obj = {
                [`selected${i}`]: false

            }
            arr.push(obj)
            i++
        })

        this.state = {
            selectedArray: arr
        }
    }


    _onPress = (item, index) => {
        this.state.selectedArray[index][`selected${index}`]=!this.state.selectedArray[index][`selected${index}`]
        this.setState({
            active_index: index
        });
        if (this.props.onSelect&&this.state.selectedArray[index][`selected${index}`]===true) {
            this.props.onSelect(item, index)
        }

    }


    checkboxTickmark = (isSelected,key) => {
        return (
            <View style={{
                width:'75%',
                height:'50%',
                transform:[
                    {translateY:'-20%'},
                    {rotate:'-45deg'},
                    {scaleY: '-1'},
                ],
                clipPath:'polygon(10% 10%, 100% 30%, 100% 50%, 37.5% 50%, 37.5% 100%, 20% 100%)',
                margin:'50%',
                borderRadius: this.props.buttonSize >= 30 ? ((this.props.buttonSize / 2) - 8) : 10,
                backgroundColor: this.state.selectedArray[key][`selected${key}`]===true ? this.props.buttonColor : "transparent",
            }}/>
        )
    }

    checkboxButton = (item, i) => {
        let isSelected = false
        if (this.state.active_index === i) {
            isSelected = true;
        }
        return (
            <View key={i} style={{
                flexDirection: this.props.horizontalLabelOrientation ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: this.props.horizontalLabelOrientation ? 'flex-start' : 'space-between',
                paddingTop: 5,
                paddingRight:this.props.horizontalButtonOrientation?5:0
            }}>
                <TouchableOpacity
                    key={i}
                    onPress={() => this._onPress(item, i)}
                >
                    <View
                        style={[{
                            height: this.props.buttonSize,
                            width: this.props.buttonSize,
                            borderWidth: 2,
                            borderColor: this.props.buttonColor,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, this.props.style]}>
                        {
                            this.checkboxTickmark(isSelected,i)
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
            <View style={{width: '100%'}}>
                <Text style={this.props.titleStyle}>{this.props.title}</Text>
                <View style={[{
                    flexDirection: this.props.horizontalButtonOrientation ? 'row' : 'column',
                }, this.props.buttonGroupStyle]}>
                    {this.props.choices.map((choice, key) => this.checkboxButton(choice, key))}
                </View>
            </View>
        );
    }
}

CheckBox.defaultProps = {
    titleStyle: {
        fontSize: 21,
        color: '#3c3c3c',
        fontFamily: 'Nunito'
    },
    horizontalLabelOrientation: true,
    buttonColor: '#3c3c3c',
    buttonSize:15
}
CheckBox.propTypes = {
    /**
     * Callback to be invoked when a Check Box Button is selected
     */
    onSelect: PropTypes.func,
    /**
     * Title of the Check Box Button Group
     */
    title: PropTypes.string,
    /**
     * Style of the Check Box Button Title
     */
    titleStyle: PropTypes.object,
    /**
     * Size of the Check Box Button Group wrapper
     */
    buttonGroupStyle: PropTypes.object,
    /**
     * An array of objects of the format {option:''}
     */
    choices: PropTypes.arrayOf(PropTypes.shape({
        option: PropTypes.string.isRequired,
    })).isRequired,
    /**
     * A boolean value to set Check Box Button orientation whether Horizontal or Vertical
     */
    horizontalButtonOrientation: PropTypes.bool,
    /**
     * A boolean value to set Check Box Button label's orientation whether Horizontal or Vertical
     */
    horizontalLabelOrientation: PropTypes.bool,
    /**
     * Size of the Check Box Button
     */
    buttonSize: PropTypes.number,
    /**
     * Color of the Check Box Button
     */
    buttonColor: PropTypes.string,

}