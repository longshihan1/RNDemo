import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    ScrollView,
    RefreshControl,
    InteractionManager,
    StyleSheet,
    ListView,
    FlatList,
    Animated
} from 'react-native'
import {fetchList} from '../../actions/fetchListAction';
import WebViewContainer from '../Detail/WebViewContainer';
var {height, width} = Dimensions.get('window');

export default class InfoListView extends Component {
    constructor(props) {
        super(props)
        this.onPressItem = this.onPressItem.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onScrollDown = this.onScrollDown.bind(this);
        this.fetchInfoTransition = this.fetchInfoTransition.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            selectedItem: 'Collection',
            digAnim: new Animated.Value(0),
            changeOpen: React.PropTypes.func.isRequired,
            listViewHide: true
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUpdate(nextProps, nextState) {
        Animated.timing(
            this.state.digAnim, {
                toValue: 130,
                duration: 200
            },
        ).start();
    }


    onPressItem(listContent) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: WebViewContainer,
                name: 'WebViewContainer',
                listContent
            });
        });
    }

    onScrollDown(channel) {
        const {dispatch} = this.props;
        dispatch(fetchList(channel))
    }

    fetchInfoTransition(channel) {
        const {dispatch} = this.props;
        this.props.changeOpen();
        Animated.timing(
            this.state.digAnim, {
                toValue: 0,
                duration: 200
            },
        ).start();
        setTimeout(() => {
            dispatch(fetchList(channel))
        }, 300)
    }


    renderContent(dataSource) {
        return (
            <ListView
                initialListSize={1}
                dataSource={dataSource}
                renderRow={this.renderItem}
                style={{backgroundColor: '#f5f5f5', flex: 1}}
                onEndReachedThreshold={10}
                enableEmptySections={true}
            />
        );
    }

    renderItem(listContent) {
        let postTime = Math.floor((Date.parse(new Date()) / 1000 - listContent.last_modified) / 60);
        return (
            <View style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={() => {
                    this.onPressItem(listContent)
                }}>
                    <View style={styles.listItemContainer}>
                        <View style={styles.listItemHeader}>
                            <Text style={styles.contentTitle}>{listContent.title}</Text>
                            <View style={styles.avatarContainer}>
                                <Image style={styles.userAvatar}
                                       source={{uri: 'https:' + listContent.member.avatar_normal}}></Image>
                            </View>
                        </View>
                        <View style={styles.listItemBottom}>
                            <Text style={styles.postTime}>{postTime}分钟前</Text>
                            <View style={styles.listItemBottomRight}>
                                <Text style={styles.userName}>{listContent.member.username}</Text>
                                <Text style={styles.contentClass}>{listContent.node.title}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }


    render() {
        const {ListInfo} = this.props;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.listContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={ListInfo.isLoading}
                            onRefresh={() => this.onScrollDown(ListInfo.channel) }
                            title="正在加载中……"
                            color="#ccc"/>
                    }>
                    {this.renderContent(this.state.dataSource.cloneWithRows(ListInfo.data))}

                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    listContainer: {
        flex: 1,
    },
    listItemContainer: {
        paddingTop: 13,
        padding: 10,
        backgroundColor: '#ffffff',
        borderColor: '#dddddd',
        borderBottomWidth: .5
    },
    listItemHeader: {
        flexDirection: 'row'
    },
    listItemBottom: {
        marginTop: 8,
        flexDirection: 'row'
    },
    listItemBottomRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    contentTitle: {
        flex: 1,
        fontSize: 16
    },
    avatarContainer: {
        width: 60,
        alignItems: 'flex-end'
    },
    postTime: {
        color: '#9f9f9f',
        fontSize: 12
    },
    userAvatar: {
        width: 30,
        height: 30,
        borderRadius: 5
    },
    userName: {
        color: '#75787c',
        fontSize: 12,
        marginRight: 8
    },
    contentClass: {
        color: '#75787c',
        backgroundColor: '#f9f9f9',
        fontSize: 13
    },
    rightSliderOptionsContainer: {
        height: 36,
        justifyContent: 'center'
    },
    rightSliderOptions: {
        color: '#8d8d8d',
        fontSize: 18
    },
    rightSliderOptionsOn: {
        color: '#55b8ec',
        fontSize: 18
    },
});
module.exports = InfoListView