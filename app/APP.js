import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import React from 'react';

import {
    Image,
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native';

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import V2ex from './pages/v2ex/V2ex';
import Gank from './pages/Gank/Gank';
import Jike from './pages/Jike/Jike';
import Person from './pages/Person/Person';
import V2Detail from './pages/Detail/V2Detail';
import JikeDetail from './pages/Detail/JikeDetail';
import PersonImage from './pages/Detail/PersonImage';
import GankDetail from './pages/Detail/GankDetail';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './pages/Login/Login';

import  colors  from './component/Colors';

const ShiTuIcon = require('./resources/ShiTu.png');
const GankIcon = require('./resources/Gank.png');
const MainIcon = require('./resources/Main.png');
const backicon = require('./resources/login_back.png');


const MyTab = TabNavigator({
        Home: {
            screen: V2ex,
            navigationOptions: () => TabOptions('V2EX', ShiTuIcon, ShiTuIcon, 'V2EX'),
        },
        Fresh: {
            screen: Gank,
            navigationOptions: () => TabOptions('Gank', GankIcon, GankIcon, 'Gank'),
        },
        ShopCar: {
            screen: Jike,
            navigationOptions: () => TabOptions('极客', GankIcon, GankIcon, '极客'),
        },
        Person: {
            screen: Person,
            navigationOptions: () => TabOptions('我的', MainIcon, MainIcon, '我的'),
        },

    },
    {
        tabBarPosition: 'bottom',
        // tabBarComponent:TabBarBottom,
        swipeEnabled: false,
        animationEnabled: false,
        backBehavior: 'none',
        lazy: true,
        tabBarOptions: {
            showIcon: true,
            // tabbar上label的style
            labelStyle: {
                color: colors.text_color_gray_dark,
                fontSize: 15,

            },
            // tabbar的style
            style: {
                backgroundColor: colors.bg_color,
                height: 70,
            },
            showLabel: true,
            pressOpacity: 0.3,
            indicatorStyle: {
                height: 0, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
            }
        }
    });

const APP = StackNavigator({
    MyTab: {
        screen: MyTab,
        navigationOptions: {
            header: null
        }
    },
    V2Detail: {
        screen: V2Detail,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    JikeDetail: {
        screen: JikeDetail,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    PersonImage: {
        screen: PersonImage,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
    GankDetail: {
        screen: GankDetail,
        navigationOptions: ({navigation}) => StackOptions({navigation})
    },
}, {
    headerMode: 'screen',
});

export const TabOptions = (tabBarTitle, normalImage, selectedImage, navTitle) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor, focused}) => {
        return (
            focused
                ?
                <Image
                    source={selectedImage}
                    style={[styles.TabBarIcon]}
                />
                :
                <Image
                    source={normalImage}
                    style={[styles.TabBarIcon]}
                />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize: 1, color: 'blue'};
    // header的style
    const headerStyle = {backgroundColor: 'blue'};
    return {tabBarLabel, tabBarIcon, headerTitle, headerTitleStyle, headerStyle};
};

const StackOptions = ({navigation}) => {
    // console.log(navigation);
    let {state, goBack} = navigation;
    const visible = state.params.isVisible;
    let header;
    if (visible === true) {
        header = null;
    }
    const headerStyle = {backgroundColor: 'blue'};
    const headerTitle = state.params.title;
    const headerTitleStyle = {fontSize: 20, color: 'blue', fontWeight: '500'}
    const headerBackTitle = false;
    const headerLeft = (
        <Image
            source={backicon}
            onPress={() => {
                goBack()
            }}
        />
    );
    let headerRight;
    if (state.params.headerRight) {
        headerRight = state.params.headerRight;
    }
    return {headerStyle, headerTitle, headerTitleStyle, headerBackTitle, headerLeft, header, headerRight}
};
const styles = StyleSheet.create({
    TabBarIcon: {
        backgroundColor: '#fff',
        width: 26,
        height: 26
    }
});

module.exports = APP