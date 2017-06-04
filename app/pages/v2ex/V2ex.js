import React, {Component} from 'react'
import {
    StyleSheet, Text,
    View,Animated
} from 'react-native'
import { connect } from 'react-redux';
import { fetchList } from '../../actions/fetchListAction';
import InfoListView from './InfoListView'

class V2ex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            maskShow: false,
            rightIsOpen: false,
            selectedItem: 'Latest',
            fadeAnim: new Animated.Value(0)
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchList('最新'));
    }

    render() {
        const { ListInfo } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <InfoListView {...this.props} style={{ flex: 1 }} />
            </View>
        );
    }
}
export default connect(state =>{
    const {ListInfo} = state;
    return {
        ListInfo
    }
})(V2ex);