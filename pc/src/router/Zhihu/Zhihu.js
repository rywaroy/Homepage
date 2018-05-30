import React, { Component } from 'react';
import axios from 'axios';
import Masonry from 'masonry-layout';
import { observer } from 'mobx-react';
import { Row, Col } from 'antd';
import utils from '../../utils';
import store from '../../store';
import './zhihu.css';

@observer
export default class Zhihu extends Component {
	constructor(props) {
		super(props);
		this.t_img = null;
		this.isLoad = true;
	}

	componentDidMount() {
		if ( store.zhihu.list.length === 0 ) {
			this.getList();
		} else {
			this.msnryInit()
		}
	}

	getList() {
		store.loading.show()
		axios.get('https://api.isoyu.com/index.php/api/Zhihu/zhihu_daily')
			.then(res => {
				const list = res.data.data.stories;
				store.zhihu.setList(list);
				this.allImgLoad(() => {
					this.msnryInit();
					store.loading.hide()
				});
			});
	}

	allImgLoad(callback) {
		document.querySelectorAll('.zhihu-img').forEach((item) => {
			if (item.height === 0) {
				this.isLoad = false;
				return false;
			}
		});
		if (this.isLoad) {
			clearTimeout(this.t_img);
			callback();
		} else {
			this.isLoad = true;
			this.t_img = setTimeout(() => {
				this.allImgLoad(callback);
			}, 500);
		}
	}

	msnryInit() {
		const msnry = new Masonry('.grid', {
			columnWidth: 300,
			itemSelector: '.grid-item',
			gutter: 10,
		});
	}

	render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="grid zhihu">
						{
							store.zhihu.list.map((item, index) => (
								<div className="zhihu-item grid-item" key={index}>
									<img src={utils.getImgUrl(item.images[0])} width="100%" className="zhihu-img" alt="" />
									<p className="zhihu-info">{item.title}</p>
								</div>
							))
						}
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}

