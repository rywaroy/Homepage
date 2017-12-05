import {observable , action , useStrict} from 'mobx'
useStrict(true)
export default class timeStore{
	@observable sell = [];
	@observable hot = [];
	@observable soon = [];
	@action setSell (array) {
		this.sell = array
	}
	@action setHot (array) {
		this.hot = array
	}
	@action setSoon (array) {
		this.soon = array
	}
}