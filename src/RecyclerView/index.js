/**
 * Why was this component created ?
 *
 * Implementing something like `onItemClick` is a tedious task
 * & a repetitive one. More APIs will be coming soon.
 */
import PropTypes from 'prop-types';
import React from 'react';
import { ListView, TouchableOpacity, View } from 'react-native';

class RecyclerViewItem extends React.Component {
    render() {
        // eslint-disable-next-line
        const {
            rowData,
            sectionId,
            rowId,
            highlightRow,
            overlay,
            ...props
        } = this.props;

        if (overlay) {
            return (
                <View>
                    {props.children}
                    <TouchableOpacity
                        style={{position: 'absolute', width: '100%', height: '100%'}}
                        onPress={this.onPress}/>
                </View>
            );
        }

        return <TouchableOpacity {...props} onPress={this.onPress}/>
    }

    onPress = () => {
        const {rowData, sectionId, rowId, highlightRow} = this.props;
        this.props.onClick(rowData, sectionId, rowId, highlightRow);
    }
}

/**
 * RecyclerView is just a fancy name taken from
 * the components provided by Android.
 *
 * It creates a wrapper around the ListView provided by ListView,
 * & exposes an additional API:
 *  - onItemClicked
 *  - isChildrenFocusable
 *
 * If the API is not used, the RecyclerView
 * mirrors ListView from 'react-native'.
 *
 */
class RecyclerView extends React.Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => {
                return row1 !== row2;
            }
        });
    }

    render() {
        const {
            renderRow,
            onItemClicked,
            isChildrenFocusable,
            dataSource
        } = this.props;

        // we currently handle both the cases for easier transition
        // use RecyclerView as the drop in replacement of ListView
        // & later remove the dataSource whenever convenient :)
        const clonedDataSource = dataSource instanceof Array ?
            this.ds.cloneWithRows(dataSource) : dataSource;

        return (
            <ListView
                enableEmptySections={true}
                {...this.props}
                dataSource={clonedDataSource}
                renderRow={(rowData, sectionId, rowId, highlightRow) => {
                    if (onItemClicked === undefined) {
                        return renderRow(rowData, sectionId, rowId, highlightRow);
                    }

                    return (
                        <RecyclerViewItem
                            onClick={this.onItemClick}
                            rowData={rowData}
                            sectionId={sectionId}
                            rowId={rowId}
                            highlightRow={highlightRow}
                            overlay={!isChildrenFocusable}>
                            {renderRow(rowData, sectionId, rowId, highlightRow)}
                        </RecyclerViewItem>
                    )
                }}/>
        );
    }

    onItemClick = (rowData, sectionId, rowId, highlightRow) => {
        // FIXME:
        // a dirty hack to prevent multiple event fires on web
        // TODO: find the root cause
        // currently the item click gets called twice (on web, non touch devices)
        // the first event fires the way it should be
        // the second event is a Proxy event object SyntheticMouseEvent
        // quick fix: check if highlightRow is present
        // and prevent event propagation if not
        if (!highlightRow) return;

        this.props.onItemClicked(rowData, sectionId, rowId, highlightRow);
    }
}

RecyclerView.defaultProps = {
    isChildrenFocusable: false
};

RecyclerView.propTypes = {
    ...ListView.propTypes,

    // override the dataSource
    // recycler view handles both gracefully :)
    dataSource: PropTypes.oneOf([
        PropTypes.instanceOf(Array),
        PropTypes.instanceOf(ListView.DataSource)
    ]),

    onItemClicked: PropTypes.func,
    isChildrenFocusable: PropTypes.boolean
};


export default RecyclerView;
