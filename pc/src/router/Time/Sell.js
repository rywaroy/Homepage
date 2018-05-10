import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card } from 'antd';
import utils from '../../utils';
import store from '../../store';
import './time.css';

@observer
export default class Sell extends Component {
	componentDidMount() {
		store.time.sell.length === 0 && this.getList()
	}

	// 获取列表
	getList() {
		store.loading.show();
		utils.axios.get('time/sell')
			.then(res => {
				store.time.setSell(res.data.data.movies);
				setTimeout(() => {
					store.loading.hide();
				}, 1000);
			});
	}

	// 链接到详细
	linkMovieInfo(id) {
		this.props.history.push(`/movie/time/info/${id}`);
	}

	render() {
		return (
			<div className="tab f-cb">
				{
					store.time.sell.map((item, index) => (
						<Card title={item.titleCn} style={{ width: '250px' }} key={index} className="fl movie-item" onClick={() => this.linkMovieInfo(item.movieId)}>
							<img src={item.img} alt="" width={200} height={300} />
							<div className="movie-title">{item.commonSpecial}</div>
							<div className="movie-intro">主演：{item.actorName1} {item.actorName2}</div>
							<div className="movie-intro">导演：{item.directorName}</div>
							<div className="movie-intro">上映时间：{item.rYear}-{item.rMonth}-{item.rDay}</div>
							<div className="movie-intro">类型：{item.type}</div>
						</Card>
					))
				}

			</div>
		);
	}
}
