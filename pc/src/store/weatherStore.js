import {observable, action, useStrict} from 'mobx'
useStrict(true)
export default class doubanStore {
    @observable future = []
    @observable now = null
    @observable value = 'CHZJ000000'
    @observable citys = [
        {label:'杭州',value:'CHZJ000000'},
        {label:'温州',value:'CHZJ060000'},
        {label:'北京',value:'CHBJ000000'},
        {label:'上海',value:'CHSH000000'},
        {label:'深圳',value:'CHGD050000'},
        {label:'广州',value:'CHGD000000'},
    ]
    @action setFuture (data) {
        this.future = data
    }
    @action setNow (data) {
        this.now = data
    }
    @action setCity (data) {
        this.value = data
    }
}