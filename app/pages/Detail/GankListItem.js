/**
 * Created by Rabbit on 2017/5/4.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Button from '../../component/Button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class GankListItem extends Component {

    static defaultProps = {
        navigate: React.PropTypes.object,
        itemData: React.PropTypes.object,
        itemPress:React.PropTypes.object,
    };

    constructor(props){
        super(props);
        this.state = {
            isFullImage:false,
        }
    };

    _onLayout(event){
        // console.log(event.nativeEvent.layout);
    };

    _onProgress(loaded,total){
        // console.log(loaded);
        // console.log(total);
    };


    render() {
        let imageHeight,imageWidth;
        let {itemData} = this.props;
        let imageFullHeight = this.state.isFullImage ?
            {height:SCREEN_HEIGHT - 64-49-44,resizeMode:'contain'} :
            {height:imageHeight,resizeMode:'contain'};

        let timestamp2 = Date.parse(new Date(itemData.publishedAt));
        timestamp2 = timestamp2 / 1000;
        let newDate = new Date();
        newDate.setTime(timestamp2 * 1000);

        return (
            <TouchableOpacity style={{marginTop:5,backgroundColor:'white'}} onPress={this.props.itemPress} activeOpacity={0.9}>
                <Text style={styles.itemTitleStyle}>{itemData.desc}</Text>
                {
                    itemData.isImage > 0
                        ?
                        <Button
                            isCustom={true}
                            customView={
                                <Image source={{uri:itemData.images[0]}}
                                     style={[{width:imageWidth},imageFullHeight]}
                                     onLayout={this._onLayout}
                                     indicator={Progress.CircleSnail}
                                     onProgress={(e)=>this._onProgress(e.nativeEvent.loaded,e.nativeEvent.total)}
                                />
                            }
                            onPress={()=>{
                                this.setState({
                                    isFullImage: !this.state.isFullImage,
                                })
                            }}
                        />
                        : null
                }
                <View style={{flexDirection:'row',marginTop:5}}>
                    <Icon name="md-ribbon" style={styles.itemIconStyle}  />
                    <Text style={[styles.itemTitleStyle,{fontSize:14}]}>
                        {itemData.who}
                    </Text>
                    <Icon name="md-time" style={{marginLeft:5}} size={25}/>
                    <Text style={[styles.itemTitleStyle,{fontSize:14}]}>
                        {newDate.toLocaleDateString()}
                    </Text>
                </View>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    itemTitleStyle:{
        fontSize:16,
        padding:5
    },
    itemIconStyle:{
        fontSize: 25,
        marginLeft:5
    }
});

