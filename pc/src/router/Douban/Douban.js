import React, {Component} from 'react';
import {Row, Col , Card} from 'antd';
import axios from 'axios'
import {observer} from 'mobx-react'
import store from '../../store'
import utils from '../../utlis'
import './douban.css'

@observer
export default class Douban extends Component{

	componentDidMount() {
		store.douban.list.length == 0 &&this.getList()
	}

	getList(){
		axios.get(utils.path + '/api/douban/list',{
			params:{
				city:'温州',
				page:store.douban.page,
				limit:store.douban.limit
			}
		}).then(res => {
			store.douban.setList(res.data.subjects)
		})
	}

	//渲染列表
	renderList(){
		return (
			store.douban.list.map((item,index) => (
				<Card title={item.title} style={{ width: 240 }} className="fl list-item" key={index}>
					<img src={item.images.large} width="190" height="266" alt=""/>
					<div className="cast">演员表：{this.renderCast(item.casts)}</div>
					<div className="cast">导演：{this.renderCast(item.directors)}</div>
				</Card>
			))
		)
	}

	//渲染演员
	renderCast(array){
		return(
			array.map((item,index) => (
				<span className="cast-item">{item.name}</span>
			))
		)

	}

	render(){
		return(
			<Row>
				<Col span={2}/>
				<Col span={20}>
					<div className="list">
						{this.renderList()}
					</div>
				</Col>
				<Col span={2}/>

			</Row>
		)
	}
}