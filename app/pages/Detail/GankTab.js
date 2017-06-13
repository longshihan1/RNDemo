import React, {Component} from 'react'
import {
    ActivityIndicator,
    FlatList,
    ListView,
    StyleSheet,
    View, Alert, Text
} from 'react-native'

import GankListItem from "./GankListItem";
import {fetchList} from '../../actions/fetchGankList';

export default class GankTab extends Component {
    page = 1;

    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            defaultData: [],
            dataSource: [],
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    fetchData = () => {
        let type = encodeURIComponent(this.props.type);
        this.page = 1;
        console.log(this.page + '' + type);
        const {dispatch} = this.props;
        dispatch(fetchList(type, this.page));
    };

    fetchMoreData = () => {
        let type = encodeURIComponent(this.props.type);
        this.page = this.page + 1;
        console.log(this.page);
        const {dispatch} = this.props;
        dispatch(fetchList(type, this.page));
    };

    renderItem = (item) => {
        const {navigate} = this.props;
        return (
            <GankListItem navigate={navigate} itemData={item} itemPress={() => this.itemPress(item)}/>
        )
    };

    render() {
        const {GankInfo} = this.props;
        console.info('isLoading:' + GankInfo.isLoading + ',isLoadMore:' + GankInfo.isLoadMore);
        return (
            <FlatList
                data={GankInfo.data.results}
                keyExtractor={item => item._id}
                renderItem={({item}) => this.renderItem(item)}
                onRefresh={() => this.fetchData()}
                refreshing={GankInfo.isLoading}
                onEndReached={() => this.fetchMoreData()}
                onEndReachedThreshold={0.8}
                ListFooterComponent={() => {
                    return ( !GankInfo.isLoadMore &&
                        <ActivityIndicator/>
                    )
                }}
            />
        );
    }
}

const styles = StyleSheet.create({

    itemTitleStyle: {
        fontSize: 16,
        padding: 5
    }
});
