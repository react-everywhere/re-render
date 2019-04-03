import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
// import './index.css';
import {
    TouchableHighlight,
    ScrollView,
    Keyboard,
    VirtualizedList,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const inbuiltStyles = {
    container: {
        width: '100%',

    }
};

export default class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursor: 0,
            counter: 0,
            allData: props.list,
            fullData: props.list,
            data: props.list,
            query: '',
            showList: false,
        };
    }


    ////////////////////////////////////////////////////
    handleSearch = (text) => {

        const data = _.filter(this.state.fullData, user => {
            return this.containsQuery(user, text);
        });
        this.setState({query: text, value: text, data, showList: true})
    };

    containsQuery = ({name}, query) => {
        if (name.toLowerCase().includes(query.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    };
    /////////////////////////////////////////////////////


    // arrow up/down button should select next/previous list element and enter key press should simulate item selection
    handleKeyDown(e) {
        e.persist();
        const {cursor, data} = this.state
        if (e.keyCode === 38 && cursor > 0) {
            let counter = this.state.counter
            --counter;
            let c = this.state.cursor;
            --c;
            this.setState({cursor: c, counter}, () => this.handleScroll('up'))
        } else if (e.keyCode === 40 && cursor <= data.length - 1) {
            let counter = this.state.counter
            ++counter;
            let c = this.state.cursor;
            ++c;
            this.setState({cursor: c, counter}, () => this.handleScroll('down'))
        } else {
            if (e.key === 'Enter')
            {

                if (this.state.cursor !== 0) {
                    console.log('VTlist',this.VTListRef)
                    console.log('he')
                    /*const eventItemName = e.target.nextElementSibling.children[0].children[0].getElementsByClassName('active')[0].children[0].innerText
                    this.setState({
                        showList: false,
                    }, () => {
                        this.props.list.map(item => {
                            if (item[this.props.searchQuery] === eventItemName) {
                                if (this.props.onItemSelected) {
                                    this.props.onItemSelected(item);
                                    this.setState({value: item[this.props.searchQuery]})
                                }
                            }
                        })
                    });*/
                }
            }
        }
    }

    handleScroll = (scrollType) => {
        if (scrollType === 'down') {
            if (this.state.counter % Math.floor(this.state.listContainerHeight / this.props.listItemStyle.height) === 0 && this.state.cursor > 0)
                this.VTListRef.scrollToIndex({index: this.state.cursor - 1})
        } else if (this.state.cursor > 0)
            this.VTListRef.scrollToIndex({index: this.state.cursor - 1})
    }


    render() {
        let index = 0;
        const {cursor} = this.state
        const propStyles = this.props;
        return (
            <View style={inbuiltStyles.container}>
                <View style={{width: '100%'}}>
                    <TextInput style={propStyles.autoCompleteInputStyle}
                               placeholder={this.props.placeholder}
                               value={this.state.value}
                               onBlur={() => {
                                   this.setState({
                                       showList: false,
                                       cursor: 0,
                                       counter: 0
                                   })
                               }}
                               onChangeText={value => this.handleSearch(value)}
                               onKeyPress={(e) => this.handleKeyDown(e)}
                    />
                </View>
                {this.state.showList ?
                    <View onLayout={(event) => {
                        let {height} = event.nativeEvent.layout
                        this.setState({listContainerHeight: height})
                    }}
                          style={propStyles.listContainerStyle}>
                        <VirtualizedList
                            data={this.state.data}
                            getItemCount={data => data.length}
                            ref={(ref) => {
                                this.VTListRef = ref;
                            }}
                            keyboardShouldPersistTaps='always'
                            getItem={(data, index) => data[index]}
                            keyExtractor={(item, index) => item.name}
                            renderItem={
                                (rowData, key) => (
                                    <View key={index++} onLayout={(event) => {
                                        let {height} = event.nativeEvent.layout
                                        this.setState({listItemHeight: height})
                                    }}
                                    style={{backgroundColor:cursor===index?'rgba(1, 140, 207, 0.46)':null}}
                                    >
                                        <TouchableOpacity
                                            style={propStyles.listItemStyle}
                                            onPress={() => {
                                                this.setState({
                                                    showList: false,
                                                    query: rowData.item,
                                                    value: rowData.item[this.props.searchQuery]
                                                }, () => {
                                                    Keyboard.dismiss()
                                                    if (this.props.onItemSelected)
                                                        this.props.onItemSelected(this.state.query);
                                                });
                                            }}>
                                            <Text style={{marginLeft: 10}}>
                                                {rowData.item[this.props.searchQuery]}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        />

                    </View> : null
                }
            </View>
        )
    }

}

AutoComplete.defaultProps = {
    ignoreCase: false,
    listContainerStyle: {
        zIndex: 1,
        height:300,
        position: 'absolute',
        marginTop: 40,
        backgroundColor: 'transparent',
        width: 200
    },
    autoCompleteInputStyle: {
        width: 200,
        height: 40,
    },
    listItemStyle: {
        height: 40,
        justifyContent: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#e0e0e0',
        borderTopWidth: 0
    },
    searchQuery: 'name',
    list: [{
        name: 'React',
        email: 'react@gmail.com'
    },
        {
            name: 'Redux',
            email: 'Redux@gmail.com'
        },
        {
            name: 'CSS',
            email: 'css3@gmail.com'
        },
        {
            name: "React Native",
            email: 'RN@gmail.com'
        },
        {
            name: 'GraphQL',
            email: 'GraphQL@gmail.com'
        },
        {
            name: 'python',
            email: 'python@gmail.com'
        },
        {
            name: 'django',
            email: 'django@gmail.com'
        },
        {
            name: 'JavaScript',
            email: 'javascript@gmail.com'
        },
        {
            name: 'Java',
            email: 'oracle@gmail.com'
        }
    ]
};

AutoComplete.propTypes = {
    placeholder: PropTypes.string,
    searchQuery: PropTypes.string,
    listContainerStyle: PropTypes.object,
    listItemStyle: PropTypes.object,
    autoCompleteInputStyle: PropTypes.object,
    list: PropTypes.array.isRequired,
    ignoreCase: PropTypes.bool,
    onItemSelected: PropTypes.func,
};
