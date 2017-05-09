import React from 'react';
import PropTypes from 'prop-types';
import { ListView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

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

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.list),
            showList: false,
            selectedItem: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(nextProps.list),
        })
    }

    render() {
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
                        <Icon
                            name={this.state.showList ? 'angle-up' : 'angle-down'}
                            type='font-awesome'
                            color={this.props.placeholderColor || 'black'}
                        />
                    </View>
                </TouchableOpacity>

                {
                    this.state.showList
                    &&
                    <View style={styles.listContainer}>
                        <ListView
                            style={{maxHeight: this.props.listHeight}}
                            enableEmptySections={true}
                            dataSource={this.state.dataSource}
                            renderRow={
                                (rowData) => (
                                    <TouchableOpacity
                                        style={[styles.listItem, this.props.itemStyle]}
                                        onPress={() => {
                                            this.setState({showList: false, selectedItem: rowData});
                                            if (this.props.onItemSelected)
                                                this.props.onItemSelected(rowData);
                                        }}>
                                        <Text style={{marginLeft: 10}}>
                                            {rowData.value}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        />
                    </View>
                }

            </View>
        )
    }
}

Dropdown.defaultProps = {
    listHeight: 200
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
