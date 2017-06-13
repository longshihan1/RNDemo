/**
 * Created by haifeng on 17/1/13.
 */
import * as types from '../constant/ActionTypes';

const initialStates = {
    data:{},
    isLoading:true,
    isLoadMore:false,
    type:'',
    page:''
};

let GankInfoReducer = (state = initialStates, action) => {
    switch (action.type) {
        case types.GET_GANK_FAILURE:
            console.info('GankInfo:初始化数据');
            return {
                ...state,
                isLoading: true,
                isLoadMore:false,
            };
        case types.GET_GANK_LOADING_INIT:
            console.info('GankInfo:上拉加载初始化数据');
            return {
                ...state,
                isLoading: false,
                isLoadMore:true,
            };
        case types.GET_GANK_SUCCESS:
            console.info('GankInfo:获取数据');
            return {
                ...state,
                isLoading: false,
                isLoadMore:false,
                data: action.response,
                type:action.type
            };
        case types.GET_GANK_LOADING:
            console.info('GankInfo:上拉加载数据');
            return {
                ...state,
                isLoading: false,
                isLoadMore:false,
                data: action.response,
                type:action.type
            };
        default:
            return state
    }
}

export default GankInfoReducer;