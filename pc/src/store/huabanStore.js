import {observable , action , useStrict} from 'mobx'
useStrict(true)
export default class AlbumStore {
    @observable list = []
    @observable opacity = 0
    @action setList (array){
        this.list = array
    }
    @action setOpacity (number){
        this.opacity = number
    }
}