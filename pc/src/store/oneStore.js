import {observable, action, useStrict} from 'mobx';
import time from 'js-time.js';

useStrict(true)
export default class OneStore {
	@observable list = [];
	@observable date = time().format('YYYY-MM-DD');
	@observable data = [];

	@action setList(array) {
		this.list = array;
	}

	@action setDate(date) {
		this.date = date;
	}
}