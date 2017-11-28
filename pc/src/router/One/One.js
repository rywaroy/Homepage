import React, {Component} from 'react';
import {Row, Col, Select} from 'antd';
import axios from 'axios'
import moment from 'moment'
import './one.css'
const Option = Select.Option;
export default class One extends Component {

	state = {
		data: [],
		defaultDate: '',
		showDateSelect: false,
		activeId:'', //选中的id
		inbetweening:null, //插画模块
		story:null ,//故事模块
		serial:null, //连载模块
		qa:null, //问答模块
		music:null, //音乐模块
		movie:null, //影视模块
	}

	componentDidMount() {
		this.getData()
	}

	//获取one一个今日和往期的id
	getData() {
		axios.get('http://v3.wufazhuce.com:8000/api/onelist/idlist/?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android').then(res => {
			let data = res.data.data;
			let arr = [];
			let now = new Date().getTime();
			for (let i = 0; i < data.length; i++) {
				arr.push({
					id: data[i],
					date: moment(new Date(now - i * 1000 * 60 * 60 * 24)).format('YYYY-MM-DD')
				})
			}
			this.setState({
				data: arr,
				defaultDate: arr[0].date,
				showDateSelect: true,
				activeId:arr[0].id
			})
			this.getInfo(arr[0].id)
		})
	}

	//筛选日期
	selectDate(value){
		if(this.state.activeId != value){
			this.getInfo(value)
		}
	}

	//获取首页列表信息
	getInfo(id){
		axios.get(`http://v3.wufazhuce.com:8000/api/onelist/${id}/0?cchannel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
			.then(res => {
				console.log(res.data)
				let data = res.data.data.content_list;
				this.setState({
					activeId:id,
					inbetweening:data[0], //插画模块
					story:data[1] ,//故事模块
					serial:data[2], //连载模块
					qa:data[3], //问答模块
					music:data[4], //音乐模块
					movie:data[5], //影视模块
				})
			})
	}


	//渲染日期筛选
	renderDateSelect(){
		if(this.state.showDateSelect){
			return(
				<div className="fr">
					<Select style={{width: 120}} defaultValue={this.state.defaultDate} onChange={this.selectDate.bind(this)}>
						{this.state.data.map((item, index) => (
							<Option value={item.id} key={index}>{item.date}</Option>
						))}
					</Select>
				</div>
			)
		}else{
			return null
		}
	}

	//渲染故事
	renderStory(){
		if(this.state.story){
			let data = this.state.story
			return(
				<div className="item">
					<div className="item-tag">ONE STORY</div>
					<div className="item-title">{data.title}</div>
					<div className="item-author">文/{data.author.user_name}</div>
					<img src={data.img_url} alt="" width={'100%'}/>
					<div className="item-forward">{data.forward}</div>
				</div>
			)
		}
	}

	//渲染连载
	renderSerial(){
		if(this.state.serial){
			let data = this.state.serial
			return(
				<div className="item">
					<div className="item-tag">连载</div>
					<div className="item-title">{data.title}</div>
					<div className="item-author">文/{data.author.user_name}</div>
					<img src={data.img_url} alt="" width={'100%'}/>
					<div className="item-forward">{data.forward}</div>
				</div>
			)
		}
	}

	//渲染问答
	renderQa(){
		if(this.state.qa){
			let data = this.state.qa
			return(
				<div className="item">
					<div className="item-tag">问答</div>
					<div className="item-title">{data.title}</div>
					<div className="item-author">{data.author.user_name}</div>
					<img src={data.img_url} alt="" width={'100%'}/>
					<div className="item-forward">{data.forward}</div>
				</div>
			)
		}else{
			return null
		}
	}

	//渲染音乐
	renderMusic(){
		if(this.state.music){
			let data = this.state.music
			return(
				<div className="item">
					<div className="item-tag">音乐</div>
					<div className="item-title">{data.title}</div>
					<div className="item-author">文/{data.author.user_name}</div>
					<div className="item-music-box" style={{backgroundImage:'url('+ data.img_url +')'}}></div>
					<div className="item-forward">{data.forward}</div>
				</div>
			)
		}else{
			return null
		}
	}

	//渲染影视
	renderMovie(){
		if(this.state.qa){
			let data = this.state.movie
			return(
				<div className="item">
					<div className="item-tag">影视</div>
					<div className="item-title">{data.title}</div>
					<div className="item-author">文/{data.author.user_name}</div>
					<img src={data.img_url} alt="" width={'100%'}/>
					<div className="item-forward">{data.forward}</div>
				</div>
			)
		}else{
			return null
		}
	}

	//渲染插画
	renderInbetweening(){
		if(this.state.inbetweening){
			let data = this.state.inbetweening
			return(
				<div className="item">
					<img src={data.img_url} alt="" width={'100%'}/>
					<div className="item-inb-title">{data.title} | {data.pic_info}</div>
					<div className="item-inb-word">{data.forward}</div>
					<div className="item-inb-book">{data.words_info}</div>
				</div>
			)
		}else{
			return null
		}
	}

	render() {
		return (
			<div className="content">
				<div className="header f-cb">
					<a href="http://www.wandoujia.com/apps/one.hh.oneclient" target="_blank" className="from">来源</a>
					<div className="last fr f-cb">
						<div className="fl">往期内容： </div>
						{this.renderDateSelect()}
					</div>

				</div>
				<div>
					<Row gutter={16} style={{marginBottom: '16px'}}>
						<Col className="gutter-row" xl={4} lg={6} md={8} sm={12}>
							{this.renderStory()}
						</Col>
						<Col className="gutter-row" xl={4} lg={6} md={8} sm={12}>
							{this.renderSerial()}
						</Col>
						<Col className="gutter-row" xl={4} lg={6} md={8} sm={12}>
							{this.renderQa()}
						</Col>
						<Col className="gutter-row" xl={4} lg={6} md={8} sm={12}>
							{this.renderMusic()}
						</Col>
						<Col className="gutter-row" xl={4} lg={6} md={8} sm={12}>
							{this.renderMovie()}
						</Col>
						<Col className="gutter-row" xl={4} lg={6} md={8} sm={12}>
							{this.renderInbetweening()}
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}