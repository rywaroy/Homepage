import React, {Component} from 'react';
import { Card } from 'antd';
import axios from 'axios'
import utlis from '../../utlis'
import store from '../../store'
import './time.css'
export default class Sell extends Component{
	state = {
		list:[]
	}

	componentDidMount() {
		store.loading.show()
		this.getList()
	}

	//获取列表
	getList(){
		axios.get(utlis.path + '/api/time/sell')
			.then(res => {

				this.setState({
					list:res.data.movies
				})
				setTimeout(() => {
					store.loading.hide()
				},1000)
			})
	}

	render(){
		return(
			<div className="tab f-cb">
				{
					this.state.list.map((item,index) => (
						<Card title={item.titleCn} style={{ width: '250px' }} key={index} className="fl movie-item">
							<img src={item.img} alt="" width={200} height={300}/>
							<div className="movie-title">{item.commonSpecial}</div>
							<div className="movie-intro">主演：{item.actorName1} {item.actorName2}</div>
							<div className="movie-intro">导演：{item.directorName}</div>
							<div className="movie-intro">上映时间：{item.rYear}-{item.rMonth}-{item.rDay}</div>
							<div className="movie-intro">类型：{item.type}</div>
						</Card>
					))
				}

			</div>
		)
	}
}