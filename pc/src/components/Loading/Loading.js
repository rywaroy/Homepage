import React, {Component} from 'react';
import {observer} from 'mobx-react'
import store from '../../store'
import './loading.css'

@observer
export default class Loading extends Component {
	render() {
		return (
			<div className="loading" style={{display: store.loading.active ? 'block' : 'none'}}>
				<div className="dog"></div>
			</div>
		)
	}
}
