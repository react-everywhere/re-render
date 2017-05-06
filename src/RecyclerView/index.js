/**
 * Why was this component created ?
 *
 * Implementing something like `onItemClick` is a tedious task
 * & a repetitive one. More APIs will be coming soon.
 */
import PropTypes from 'prop-types';
import React from 'react';
import { ListView, TouchableOpacity } from 'react-native';

class RecyclerViewItem extends React.Component {
    render() {
        // eslint-disable-next-line
        const {rowData, sectionId, rowId, highlightRow, ...props} = this.props;
        return (
            <TouchableOpacity {...props} onPress={this.onPress}/>
        )
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
 *
 * If the API is not used, the RecyclerView
 * mirrors ListView from 'react-native'.
 *
 */
class RecyclerView extends React.Component {
    render() {
        const {renderRow, onItemClicked} = this.props;
        return (
            <ListView enableEmptySections={true} {...this.props}
                      renderRow={(rowData, sectionId, rowId, highlightRow) => {
                          if (onItemClicked === undefined) {
                              return renderRow(rowData, sectionId, rowId, highlightRow);
                          }

                          return (
                              <RecyclerViewItem onClick={this.onItemClick}
                                                rowData={rowData}
                                                sectionId={sectionId}
                                                rowId={rowId}
                                                highlightRow={highlightRow}>
                                  {renderRow(rowData, sectionId, rowId, highlightRow)}
                              </RecyclerViewItem>
                          )
                      }}/>
        )
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

RecyclerView.propTypes = {
    ...ListView.propTypes,
    onItemClicked: PropTypes.func
};


export default RecyclerView;
