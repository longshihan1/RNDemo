/**
 * Created by dell on 2017/6/5.
 */

import Util from '../component/utils'
import * as types from '../constant/ActionTypes'
import * as Config from "../component/Config";

export function fetchList(type, page) {
    let URL;
    URL = `${Config.api.getGankData}` + "/" + `${type}` + "/20" + "/" + `${page}`;
    console.info(URL);
    return dispatch => {
        if (page==1){
            console.info('等于1');
            dispatch(fetchListInit1());
        }else {
            console.info('大于1');
            dispatch(fetchListInitLoadingMore());
        }

        Util.fetchGankWeb(URL, 'get', (response) => {
            dispatch(fetchListInfo1(response));
        }, (error) => {
            alert(error);
            dispatch(fetchListInfo1(error))
        })
    }
}

let fetchListInit1 = (response) => {
    console.info('fetch:初始化获取数据');
    return {
        type: types.GET_GANK_FAILURE,
        response
    }
};

let fetchListInitLoadingMore = (response) => {
    console.info('fetch:上拉加载初始化获取数据');
    return {
        type: types.GET_GANK_LOADING_INIT,
        response
    }
};

let fetchListInfo1 = (response) => {
    console.info('fetch:正确获取数据');
    return {
        type: types.GET_GANK_SUCCESS,
        response,
    }
};