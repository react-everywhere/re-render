import React from 'react';
import PropTypes from 'prop-types';
import { ListView, Text, TouchableOpacity, View } from 'react-native';
import RecyclerView from '../RecyclerView';
import IconButton from '../IconButton';

const styles = {
    container: {
        width: 200,
    },
    autoCompleteInput: {
        width: 200,
        height: 40,
        justifyContent: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#e0e0e0',
    },
    listContainer: {
        zIndex: 1,
        position: 'absolute',
        marginTop: 40,
        backgroundColor: '#FFF',
        width: 200
    },
    listItem: {
        height: 40,
        justifyContent: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#e0e0e0',
        borderTopWidth: 0,
    },
};

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            showList: false,
            selectedItem: ''
        };
    }

    render() {
        const dataSource = this.ds.cloneWithRows(this.props.list);
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.autoCompleteInput, {backgroundColor: this.props.placeholderBackground}]}
                    onPress={() => {
                        this.setState({showList: !this.state.showList})
                    }}>
                    <View
                        style={[{flexDirection: 'row', marginRight: 10, marginLeft: 10}]}>
                        <Text style={{flex: 1, color: this.props.placeholderColor}}>
                            {this.state.selectedItem.value || this.props.placeholder}
                        </Text>
                        {(!this.state.selectedItem) ?
                            <IconButton
                                name={this.state.showList ? 'angle-up' : 'angle-down'}
                                type='font-awesome'
                                color={this.props.placeholderColor}
                            /> :
                            <IconButton
                                name='close'
                                type='font-awesome'
                                color={this.props.placeholderColor}
                                onPress={() => {
                                    this.setState({selectedItem: ''})
                                }}
                            />
                        }
                    </View>
                </TouchableOpacity>

                {
                    this.state.showList
                    &&
                    <View style={styles.listContainer}>
                        <RecyclerView
                            onItemClicked={this.onItemClicked}
                            style={{maxHeight: this.props.listHeight}}
                            enableEmptySections={true}
                            dataSource={dataSource}
                            renderRow={(rowData) => (
                                <TouchableOpacity
                                    style={[styles.listItem, this.props.itemStyle]}>
                                    <Text style={{marginLeft: 10}}>
                                        {rowData.value}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                }

            </View>
        )
    }

    onItemClicked = (rowData) => {
        this.setState({showList: false, selectedItem: rowData});
        if (this.props.onItemSelected)
            this.props.onItemSelected(rowData);
    }
}

Dropdown.defaultProps = {
    listHeight: 200,
    placeholder: 'Select',
    placeholderColor: 'black'
};

Dropdown.propTypes = {
    /**
     * An array of objects of the format {key:1,value:''}
     */
    list: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
    /**
     * The default text to be shown when nothing is selected.
     */
    placeholder: PropTypes.string,
    /**
     * Callback to be invoked when a dropdown item is selected.
     */
    onItemSelected: PropTypes.func,
    /**
     * Height of the dropdown list(default height = 200)
     */
    listHeight: PropTypes.number,
    /**
     * Background color of dropdown's in collapsed state.
     */
    placeholderBackground: PropTypes.string,
    /**
     * Text and icon color of dropdown in collapsed state.
     */
    placeholderColor: PropTypes.string,
    /**
     * Style of single list item.
     */
    itemStyle: PropTypes.object,
};
