import {observable, action, useStrict} from 'mobx'

useStrict(true)
export default class ZhihuStore {
	@observable list = [];

	@action setList(array) {
		this.list = array;
	}
}