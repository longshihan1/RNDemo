import {AppRegistry, View, Text,PermissionsAndroid} from 'react-native';
import React, {Component} from 'react';
import {Provider}from 'react-redux';
import configureStore from './store/ConfigureStore';
const store = configureStore();
import './component/Global'
import App from './APP';
import PermissionDemo from './component/PermissionDemo'


/*
if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        },
    };
}
*/

export default class Root extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
            permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            hasPermission: 'Not Checked',
        }
    }

    render() {
        return (
            !this.state.isLogin ?
                <Provider store={store}>
                    <App />
                </Provider>
                :
                <View style={{marginTop: 30}}>
                    <Text onPress={() => {
                        this.setState({
                            isLogin: true
                        })
                    }}>
                        点我登录
                    </Text>
                </View>
        );
    }

}

console.ignoredYellowBox = ['Warning: BackAndroid is deprecated.  Please use BackHandler instead.',
    'source.uri should not be an empty string'
];
AppRegistry.registerComponent('Fang', () => Root);