import React, { Component } from 'react';
import { Row, Col, Pagination } from 'antd';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';
import utils from '../../utils';
import store from '../../store';
import './article.css';

@observer
export default class Article extends Component {

	componentDidMount() {
		store.article.list.length === 0 && this.getList();
	}

	// 获取文章列表
	getList() {
		store.loading.show();
		utils.axios.get('article/list', {
			params: {
				page: store.article.page,
				limit: store.article.limit,
			},
		}).then(res => {
			const data = res.data.data;
			store.article.setList(data.list);
			store.article.setTotal(data.total);
			setTimeout(() => {
				store.loading.hide();
			}, 1000);
		});
	}

	// 页面切换
	_onChange(page) {
		store.article.setPage(page);
		document.documentElement.scrollTop = document.body.scrollTop = 0;
		this.getList();
	}

	// 跳转详情
	linkInfo(id) {
		this.props.history.push(`/blog/article/info/` + id);
	}

	render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="article">
						{
							store.article.list.map((item,index) => (
								<div className="article-item" key={index} onClick={() => {this.linkInfo(item.id)}}>
									<div className="article-top f-cb">
										<div className="article-name fl">{item.title}</div>
										<div className="article-time fr">{dayjs(item.time).format('YYYY-MM-DD')}</div>
										<div className="article-tag fr" style={{ backgroundColor: item.color }}>{item.tag_name}</div>
										{
											item.top > 0 ?
												<div className="article-tag fr" style={{ backgroundColor: '#FFD700' }}>置顶</div>
												:
												null
										}
									</div>
									<div className="article-content">{item.intro}</div>
									<div className="article-bot f-cb">
										<div className="article-watch fr">{item.watch}</div>
									</div>
								</div>
							))
						}
						{
							store.article.total / store.article.limit <= 1 ?
								null
								:
								<div className="article-page">
									<Pagination
										current={store.article.page}
										total={store.article.total}
										pageSize={store.article.limit}
										onChange={this._onChange.bind(this)}
									/>
								</div>
						}
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}

