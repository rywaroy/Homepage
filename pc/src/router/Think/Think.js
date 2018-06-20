import React, { Component } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import { Row, Col, Pagination } from 'antd';
import dayjs from 'dayjs';
import Masonry from 'masonry-layout';
import utils from '../../utils';
import store from '../../store';
import './think.css';

@observer
export default class Think extends Component {
	componentDidMount() {
		store.think.list.length === 0 && this.getList();
	}

	getList() {
		utils.axios('/think/list', {
			params: {
				page: store.think.page,
				limit: store.think.limit,
			},
		}).then(res => {
			store.think.setList(res.data.data.list);
			store.think.setTotal(res.data.data.count);
			setTimeout(() => {
				this.msnryInit()
			}, 0);
		});
	}

	//页面切换
	_onChange(page) {
		store.think.setPage(page);
		document.documentElement.scrollTop = document.body.scrollTop = 0;
		this.getList();
	}

	msnryInit() {
		const msnry = new Masonry('.grid', {
			// columnWidth: 300,
			itemSelector: '.grid-item',
			gutter: 20,
		});
	}

	render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
          <div className="think-box grid">
						{
							store.think.list.map((item, index) => (
								<div className="think-item grid-item" key={index}>
									<div className="think-item-top f-cb">
										<div className="think-item-avatar fl bg-cover" style={{backgroundImage: `url(${item.avatar})`}}></div>
										<div className="think-item-name fl">{item.name}</div>
									</div>
									<div className="think-item-content">{item.content}</div>
									{
										item.photos.length > 0 ?
											<div className="think-item-photos f-cb">
												{
													item.photos.map((photo, i) => (
														<div className="think-item-photo bg-cover" key={i} style={{backgroundImage: `url(${photo}?imageView2/1/w/210/h/210/q/75)`}}></div>
													))
												}
											</div>
											:
											null
									}
									<div className="think-item-time">{dayjs(item.time).format('YYYY-MM-DD hh:mm')}</div>
								</div>
							))
						}
					</div>
					{
						store.think.total / store.think.limit <= 1 ?
							null
							:
							<div className="think-page">
								<Pagination
									current={store.think.page}
									total={store.think.total}
									pageSize={store.think.limit}
									onChange={this._onChange.bind(this)}
								/>
							</div>
					}
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}

