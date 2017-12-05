import React, {Component} from 'react';
import {observer} from 'mobx-react'
import { Card } from 'antd';
import axios from 'axios'
import utlis from '../../utlis'
import store from '../../store'
import './time.css'

@observer
export default class Sell extends Component{
	state = {
		list:[]
	}

	componentDidMount() {
		store.time.hot.length == 0 && this.getList()
	}

	//获取列表
	getList(){
		store.loading.show()
		axios.get(utlis.path + '/api/time/hot')
			.then(res => {
				store.time.setHot(res.data.ms)
				setTimeout(() => {
					store.loading.hide()
				},1000)
			})
	}

	render(){
		return(
			<div className="tab f-cb">
				{
					store.time.hot.map((item,index) => (
						<Card title={item.tCn} style={{ width: '250px' }} key={index} className="fl movie-item">
							<img src={item.img} alt="" width={200} height={300}/>
							<div className="movie-title">{item.commonSpecial}</div>
							<div className="movie-intro">主演：{item.aN1} {item.aN2}</div>
							<div className="movie-intro">导演：{item.dN}</div>
							<div className="movie-intro">上映时间：{item.rd}</div>
							<div className="movie-intro">类型：{item.movieType}</div>
						</Card>
					))
				}

			</div>
		)
	}
}