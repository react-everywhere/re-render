import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Label from '../Label';
import RadioButton from '../Radio/RadioButton';

export default class RadioGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedId: -1
        }
    }

    componentWillMount() {
        let selectedId = -1;
        this.props.children.map((child) => {
            // Set a pre selected radio button's id as selectedId
            if (child.props.checked)
                selectedId = child.props.id;
        });

        this.setState({selectedId});
    }

    render() {

        let choices = this.props.children.map((child) => {
            return (<RadioButton key={child.props.id}
                                 id={child.props.id}
                                 title={child.props.title}
                                 onCheckedChange={this.onItemChange}
                                 checked={child.props.id === this.state.selectedId}/>);
        });

        return (
            <View>
                <Label value={this.props.title} style={{marginBottom: 10}}/>
                {choices}
            </View>
        )
    }

    onItemChange = (itemId, isChecked) => {
        if (this.state.selectedId === itemId && !isChecked)
            itemId = -1;

        this.setState({
            selectedId: itemId
        }, () => {
            this.props.onSelectionChange(this.state.selectedId);
        });
    };
}

RadioGroup.propTypes = {
    title: PropTypes.string.isRequired,
    onSelectionChange: PropTypes.func,
};

