import React, {Component} from 'react';
import {Row, Col, Select} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios'
import moment from 'moment'
import './one.css'
const Option = Select.Option;
export default class One extends Component {

	state = {
		data: [],
		defaultDate: '',
		showDateSelect: false,
		activeId: '', //选中的id
		inbetweening: null, //插画模块
		story: null,//故事模块
		serial: null, //连载模块
		qa: null, //问答模块
		music: null, //音乐模块
		movie: null, //影视模块
		list: []
	}

	componentDidMount() {
		console.log(this.props)
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
				activeId: arr[0].id
			})
			this.getInfo(arr[0].id)
		})
	}

	//筛选日期
	selectDate(value) {
		if (this.state.activeId != value) {
			this.getInfo(value)
		}
	}

	//获取首页列表信息
	getInfo(id) {
		axios.get(`http://v3.wufazhuce.com:8000/api/onelist/${id}/0?cchannel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
			.then(res => {
				console.log(res.data)
				let data = res.data.data.content_list;
				this.setState({
					activeId: id,
					list: data,
					inbetweening: data[0], //插画模块
					story: data[1],//故事模块
					serial: data[2], //连载模块
					qa: data[3], //问答模块
					music: data[4], //音乐模块
					movie: data[5], //影视模块
				})
			})
	}

	//跳转详情
	link(type,id){
		if(type != '0'){
			this.props.history.push(`/magazine/one/detail/${type}/${id}`)
		}

	}


	//渲染日期筛选
	renderDateSelect() {
		if (this.state.showDateSelect) {
			return (
				<div className="fr">
					<Select style={{width: 120}} defaultValue={this.state.defaultDate}
					        onChange={this.selectDate.bind(this)}>
						{this.state.data.map((item, index) => (
							<Option value={item.id} key={index}>{item.date}</Option>
						))}
					</Select>
				</div>
			)
		} else {
			return null
		}
	}

	//渲染列表
	renderList() {
		if (this.state.list.length > 0) {
			return (
				this.state.list.map((item, index) => (
					<Col className="gutter-row" xl={4} lg={6} md={8} sm={12} key={index}>
						<div className="item" onClick={() => this.link(item.category,item.item_id)}>
							{this.renderTag(item.category, item.tag_list)}
							{
								item.category == '0'
									?

									<div>
										<img src={item.img_url} alt="" width={'100%'} className="item-img"/>
										<div className="item-inb-title">{item.title} | {item.pic_info}</div>
										<div className="item-inb-word">{item.forward}</div>
										<div className="item-inb-book">{item.words_info}</div>
									</div>
									:
									<div>
										<div className="item-title">{item.title}</div>
										<div className="item-author">文/{item.author.user_name}</div>
										<img src={item.img_url} alt="" width={'100%'}className="item-img"/>
										<div className="item-forward">{item.forward}</div>
									</div>
							}

							{/*<div className="item-title">{data.title}</div>*/}
							{/*<div className="item-author">文/{data.author.user_name}</div>*/}
							{/*<img src={data.img_url} alt="" width={'100%'}/>*/}
							{/*<div className="item-forward">{data.forward}</div>*/}
						</div>
					</Col>
				))
			)
		} else {
			return null
		}


	}

	//渲染tag
	renderTag(tag, taglist) {
		switch (tag) {
			case '0':
				return null;
				break
			case '1':
				return (<div className="item-tag">{taglist[0] ? taglist[0].title : '阅读'}</div>)
				break
			case '2':
				return (<div className="item-tag">连载</div>)
				break
			case '3':
				return (<div className="item-tag">问答</div>)
				break
			case '4':
				return (<div className="item-tag">音乐</div>)
				break
			case '5':
				return (<div className="item-tag">影视</div>)
				break
		}
	}

	render() {
		return (
			<div className="content">
				<div className="header f-cb">
					<a href="http://www.wandoujia.com/apps/one.hh.oneclient" target="_blank" className="from">来源</a>
					<div className="last fr f-cb">
						<div className="fl">往期内容：</div>
						{this.renderDateSelect()}
					</div>

				</div>
				<div>
					<Row gutter={16} style={{marginBottom: '16px'}}>
						{this.renderList()}
					</Row>
				</div>
			</div>
		)
	}
}