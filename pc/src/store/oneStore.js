import {observable , action , useStrict} from 'mobx'
useStrict(true)
export default class OneStore {
    @observable list = [];
    @observable activeId = null;
    @observable defaultDate = null;
    @observable showDateSelect = false;
    @observable data = []
    @action setList (array){
        this.list = array
    }
    @action setActiveId (id){
        this.activeId = id
    }
    @action setdefaultDate (date){
        this.defaultDate = date
    }
    @action setShowDateSelect (bool){
        this.showDateSelect = bool
    }
    @action setSata (array){
        this.data = array
    }
}