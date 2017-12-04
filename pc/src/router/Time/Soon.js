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
		axios.get(utlis.path + '/api/time/soon')
			.then(res => {
				setTimeout(() => {
					store.loading.hide()
				},1000)
				this.setState({
					list:res.data.attention
				})
			})
	}

	render(){
		return(
			<div className="tab f-cb">
				{
					this.state.list.map((item,index) => (
						<Card title={item.title} style={{ width: '250px' }} key={index} className="fl movie-item">
							<img src={item.image} alt="" width={200} height={300}/>
							<div className="movie-title">{item.releaseDate}</div>
							<div className="movie-intro">主演：{item.actor1} {item.actor2}</div>
							<div className="movie-intro">导演：{item.director}</div>
							<div className="movie-intro">上映时间：{item.rYear}-{item.rMonth}-{item.rDay}</div>
							<div className="movie-intro">类型：{item.type}</div>
						</Card>
					))
				}

			</div>
		)
	}
}
