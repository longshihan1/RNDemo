import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import GankTab from '../Detail/GankTab'
import { connect } from 'react-redux';
import { fetchList } from '../../actions/fetchGankList';
let {height, width} = Dimensions.get('window');


 class Gank extends Component {
    constructor(props) {
        super(props);
        const {navigate} = this.props.navigation;
        this.state = {
            typeArr: [
                {'title': 'iOS', 'type': 'iOS', 'navigate': navigate},
                {'title': 'Android', 'type': 'Android', 'navigate': navigate},
                {'title': '前端', 'type': '前端', 'navigate': navigate},
                {'title': '休息视频 ', 'type': '休息视频', 'navigate': navigate},
                {'title': '拓展资源', 'type': '拓展资源', 'navigate': navigate}
            ],
        }
    }

    _onChangeTab = (obj) => {
        const { dispatch } = this.props;
        dispatch(fetchList(this.state.typeArr[obj.i].type,'1'));
    };

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchList('iOS','1'));
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar />}
                tabBarActiveTextColor='#4ECBFC'
                tabBarInactiveTextColor='black'
                tabBarBackgroundColor='white'
                tabBarUnderlineStyle={{backgroundColor: '#4ECBFC', height: 2}}
                onChangeTab={(i) => this._onChangeTab(i)}
                tabBarTextStyle={{fontSize: 15}}>
                {
                    this.state.typeArr.map((item, i) => {
                        return (
                            <GankTab key={i}
                                     tabLabel={item.title}
                                     type={item.type}
                                     style={{backgroundColor: 'white', flex: 1}}
                                     navigate={item.navigate}
                                     {...this.props}
                            />
                        )

                    })
                }
            </ScrollableTabView>
        );
    }
}

export default connect(state => {
    const {GankInfo} = state;
    return {
        GankInfo
    }
})(Gank);
