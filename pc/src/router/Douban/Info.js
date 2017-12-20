import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col} from 'antd';
import utils from '../../utlis'
import './douban.css'

export default class Info extends Component{

	constructor(props){
		super(props)
		this.state = {
			isLoad:false,
			intro:{}
		}
	}

	componentDidMount() {
		this.getInfo()
	}

	getInfo(){
		axios.get(utils.path + '/api/douban/info',{
			params:{
				id:this.props.match.params.id
			}
		}).then(res => {
			this.setState({
				isLoad:true,
				intro:res.data.intro
			})
		})
	}

	//渲染
	renderItem(arr){
		return(
			arr.map((item,index) => (
				<span key={index} className="info-intro-item">{item}</span>
			))
		)
	}

	//渲染人物
	renderPeople(arr){
		return(
			arr.map((item,index) => {
				let a = item.avatars.large.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=')

				return(
					<div className="info-p-item" key={index}>
						<img src={'https://images.weserv.nl/?url=img7.doubanio.com/view/celebrity/s_ratio_celebrity/public/p1403053084.22.jpg'} alt="" width={200} height={283} className="info-p-img"/>
						<div>{item.name}</div>
						<div>{item.name_en}</div>
					</div>
					)

			})
		)
	}

	render(){
		return(
			<Row>
				<Col span={2}/>
					<Col span={20}>
						{this.state.isLoad ?
							<div>
								<div className="title">{this.state.intro.title}</div>
								<div className="en-title">{this.state.intro.aka[1]}</div>
								<div>{this.state.intro.summary}</div>
								<div className="intro">
									<div className="cell">语言：{this.renderItem(this.state.intro.languages)}</div>
									<div className="cell">类型：{this.renderItem(this.state.intro.genres)}</div>
									<div className="cell">时长：{this.renderItem(this.state.intro.durations)}</div>
								</div>
								<div className="subtitle">演员</div>
								<div className="f-cb">
									{this.renderPeople(this.state.intro.casts)}
								</div>
							</div>
							:
							null
						}


					</Col>
				<Col span={2}/>
			</Row>
		)
	}
}
