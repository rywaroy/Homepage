import {observable, action, useStrict} from 'mobx'

useStrict(true)
export default class AlbumStore {
	@observable content = {}

	@action setContent(data) {
		this.content = data
	}
}