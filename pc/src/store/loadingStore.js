import {observable, action, useStrict} from 'mobx'

useStrict(true)
export default class LoadingStore {
	@observable active = false;

	@action show() {
		this.active = true
	}

	@action hide() {
		this.active = false
	}
}
