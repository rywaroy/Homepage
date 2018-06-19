import React, { Component } from 'react';
import { Row, Col, Pagination } from 'antd';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';
import utils from '../../utils';
import store from '../../store';
import './learn.css';

@observer
export default class Learn extends Component {
	componentDidMount() {
		store.learn.list.length === 0 && this.getList();
	}

	// 获取文章列表
	getList() {
		utils.axios.get('learn/list', {
			params: {
				page: store.learn.page,
				limit: store.learn.limit,
			},
		}).then(res => {
			const data = res.data.data;
			store.learn.setList(data.list);
			store.learn.setTotal(data.total);
		});
	}

	// 页面切换
	_onChange(page) {
		store.learn.setPage(page)
		document.documentElement.scrollTop = document.body.scrollTop = 0;
		this.getList()
	}

	// 跳转详情
	linkInfo(id) {
		this.props.history.push(`/blog/learn/info/` + id);
	}

	render() {
		return (
			<Row>
				<Col span={2}/>
				<Col span={20}>
					<div className="learn">
						{
							store.learn.list.map((item, index) => (
								<div className="learn-item" key={index} onClick={() => { this.linkInfo(item.id); }}>
									<div className="learn-top f-cb">
										<div className="learn-name fl">{item.title}</div>
										<div className="learn-time fr">{dayjs(item.time).format('YYYY-MM-DD')}</div>
										<div className="learn-tag fr">{item.tag}</div>
									</div>
									<div className="learn-content">{item.intro}</div>
								</div>
							))
						}
						{
							store.learn.total / store.learn.limit <= 1 ?
								null
								:
								<div className="learn-page">
									<Pagination
										current={store.learn.page}
										total={store.learn.total}
										pageSize={store.learn.limit}
										onChange={this._onChange.bind(this)} />
								</div>
						}
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}

