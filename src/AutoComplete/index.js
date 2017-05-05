import React from 'react';
import PropTypes from 'prop-types';
import { ListView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const styles = {
    container: {
        width: 200,
    },
    autoCompleteInput: {
        width: 200,
        height: 40,
    },
    listContainer: {
        zIndex: 1,
        position: 'absolute',
        marginTop: 40,
        backgroundColor: '#FFF',
        width: 'inherit'
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

export default class AutoComplete extends React.Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            allData: props.list,
            dataSource: ds.cloneWithRows([]),
            query: '',
            showList: false,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.autoCompleteInput}
                           placeholder={this.props.placeholder}
                           value={this.state.query}
                           onBlur={() => this.setState({showList: false})}
                           onChangeText={this.onQueryChange}/>
                {this.state.showList
                &&
                <View style={styles.listContainer}>
                    <ListView
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={
                            (rowData) => (
                                <TouchableOpacity
                                    style={styles.listItem}
                                    onPress={
                                        () => {
                                            this.setState({
                                                showList: false, query: rowData
                                            }, () => {
                                                if (this.props.onItemSelected)
                                                    this.props.onItemSelected(this.state.query);
                                            });
                                        }}>
                                    <Text style={{marginLeft: 10}}>
                                        {rowData}
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

    onQueryChange = (value) => {
        this.setState({query: value});
        this.filter(value);
    };

    filter = (query) => {
        query = query.trim();
        let filteredData = this.state.allData.filter((item) => {
            if (this.props.ignoreCase)
                return item.toLowerCase().includes(query.toLowerCase());

            return item.includes(query);
        });

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
                dataSource: ds.cloneWithRows(filteredData),
                showList: true
            }
        );
    };
}

AutoComplete.defaultProps = {
    ignoreCase: false,
};

AutoComplete.propTypes = {
    placeholder: PropTypes.string,
    list: PropTypes.array.isRequired,
    ignoreCase: PropTypes.bool,
    onItemSelected: PropTypes.func,
};
