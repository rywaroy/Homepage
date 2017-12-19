import {observable, action, useStrict} from 'mobx'
useStrict(true)
export default class doubanStore {
	@observable list = []
	@observable page = 0;
	@observable limit = 10;
	@action setList(data) {
		this.list = data
	}
}