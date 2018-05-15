import {observable, action, useStrict} from 'mobx'

useStrict(true)
export default class dyttStore {
	@observable data = []
	@observable info = {}

	@action setData(data) {
		this.data = data
	}

	@action setInfo(data) {
		this.info = data
	}
}

