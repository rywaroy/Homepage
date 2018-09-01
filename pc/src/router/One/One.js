import React, { Component } from 'react';
import { Row, Col, Select } from 'antd';
import utils from '../../utils';
import time from 'js-time.js';
import { observer } from 'mobx-react';
import store from '../../store';
import './one.css';

const Option = Select.Option;

@observer
export default class One extends Component {
	componentDidMount() {
		store.one.list.length === 0 && this.getInfo();
	}

	// 获取one一个今日和往期的id
	// getData() {
	// 	axios.get('http://v3.wufazhuce.com:8000/api/onelist/idlist/?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android').then(res => {
	// 		const data = res.data.data;
	// 		const arr = [];
	// 		const now = new Date().getTime();
	// 		for (let i = 0; i < data.length; i++) {
	// 			arr.push({
	// 				id: data[i],
	// 				date: time(new Date(now - i * 1000 * 60 * 60 * 24)).format('YYYY-MM-DD'),
	// 			});
	// 		}
	// 		store.one.setActiveId(arr[0].id);
	// 		store.one.setdefaultDate(arr[0].date);
	// 		store.one.setShowDateSelect(true);
	// 		store.one.setSata(arr);
	// 		this.getInfo(arr[0].id);
	// 	});
	// }

	// 获取首页列表信息
	// getInfo(id) {
	// 	axios.get(`http://v3.wufazhuce.com:8000/api/onelist/${id}/0?cchannel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
	// 		.then(res => {
	// 			const data = res.data.data.content_list;
	// 			store.one.setActiveId(id);
	// 			store.one.setList(data);
	// 		});
	// }

	getInfo(date) {
		utils.axios.get(`/one/list?date=2018-09-01`)
			.then(res => {
				const data = res.data.data.content_list;
				store.one.setList(data);
			});
	}

	// 筛选日期
	selectDate(value, a) {
		if (store.one.activeId !== value) {
			store.one.setActiveId(value);
			for (const item of store.one.data) {
				if (item.id === value) {
					store.one.setdefaultDate(item.date);
				}
			}
			this.getInfo(value);
		}
	}

	// 跳转详情
	link(type, id) {
		if (type !== '0') {
			this.props.history.push(`/magazine/one/detail/${type}/${id}`);
		}
	}


	// 渲染日期筛选
	renderDateSelect() {
		if (store.one.showDateSelect) {
			return (
				<div className="fr">
					<Select style={{ width: 120 }} defaultValue={store.one.defaultDate} onChange={this.selectDate.bind(this)}>
						{store.one.data.map((item, index) => (
							<Option value={item.id} key={index}>{item.date}</Option>
						))}
					</Select>
				</div>
			);
		} else {
			return null;
		}
	}

	// 渲染列表
	renderList() {
		if (store.one.list.length > 0) {
			return (
				store.one.list.map((item, index) => {
					if (Number(item.category) < 6) {
						return (
							<Col className="gutter-row" xl={4} lg={6} md={6} sm={6} key={index}>
								<div className="item" onClick={() => this.link(item.category, item.item_id)}>
									{this.renderTag(item.category, item.tag_list)}
									{
										item.category === '0'
											?
											<div>
												<img src={item.img_url} alt="" width={'100%'} className="item-img" />
												<div className="item-inb-title">{item.title} | {item.pic_info}</div>
												<div className="item-inb-word">{item.forward}</div>
												<div className="item-inb-book">{item.words_info}</div>
											</div>
											:
											<div>
												<div className="item-title">{item.title}</div>
												<div className="item-author">文/{item.author.user_name}</div>
												<img src={item.img_url} alt="" width={'100%'} className="item-img" />
												<div className="item-forward">{item.forward}</div>
											</div>
									}
								</div>
							</Col>
						);
					} else {
						return null;
					}
				})
			);
		} else {
			return null;
		}


	}

	// 渲染tag
	renderTag(tag, taglist) {
		switch (tag) {
		case '0':
			return null;
			break;
		case '1':
			return (<div className="item-tag">{taglist[0] ? taglist[0].title : '阅读'}</div>);
			break;
		case '2':
			return (<div className="item-tag">连载</div>);
			break;
		case '3':
			return (<div className="item-tag">问答</div>);
			break;
		case '4':
			return (<div className="item-tag">音乐</div>);
			break;
		case '5':
			return (<div className="item-tag">影视</div>);
			break;
		default:
			return null;
		}
	}

	render() {
		return (
			<Row>
				<Col span={2}/>
				<Col span={20}>
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
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}
