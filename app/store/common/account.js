/**
 * Created by longshihan on 2017/6/3.
 */
import {observable} from 'mobx'

class Account{
    @observable name=''
}

export default new Account()