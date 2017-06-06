/**
 * Created by longshihan on 2017/6/3.
 */
import {combineReducers} from 'redux';
import ShiTuReducer from './ShiTuReducer';
import ListInfo from './listInfoReducer';
import GankReducer from './GankReducer';
import GankInfo from './GankInfoReducer';
//取决于这里你加入了多少 reducer
const RootReducer = combineReducers({
    ShiTuReducer,
    ListInfo,
    GankInfo,
    GankReducer,

});

export default RootReducer;