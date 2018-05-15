import {observable, action, useStrict} from 'mobx'

useStrict(true)
export default class doubanStore {
	@observable list = []
	@observable page = 1;
	@observable limit = 9;
	@observable total = 0;
	@observable city = '杭州'

	@action setList(data) {
		this.list = data
	}

	@action setTotal(data) {
		this.total = data
	}

	@action setPage(data) {
		this.page = data
	}

	@action setCity(data) {
		this.city = data
	}
}