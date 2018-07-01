import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Icon } from 'antd';
import { observer } from 'mobx-react';
import Masonry from 'masonry-layout';
import store from '../../store';
import './huaban.css';
import utils from '../../utils';

@observer
export default class Huaban extends Component {
	componentDidMount() {
		if (store.huaban.list.length === 0) {
			this.getList();
		} else {
			this.msnryInit();
		}
	}

	getList() {
		store.loading.show();
		store.huaban.setList([]);
		store.huaban.setOpacity(0);
		axios.get('https://api.isoyu.com/index.php/api/Picture/hua_ban')
			.then(res => {
				if (res.data.code === 1) {
					store.huaban.setList(res.data.data);
					setTimeout(() => {
						this.allImgLoad(() => {
							this.msnryInit();
							store.huaban.setOpacity(1);
							store.loading.hide();
						});
					}, 200);
				}
			});
	}

	allImgLoad(callback) {
		document.querySelectorAll('.huaban-img').forEach((item, index) => {
			if (item.height === 0) {
				this.isLoad = false;
				return false;
			}
		});
		if (this.isLoad) {
			clearTimeout(this.t_img); // 清除定时器
			// 回调函数
			callback();
			// 为false，因为找到了没有加载完成的图，将调用定时器递归
		} else {
			this.isLoad = true;
			this.t_img = setTimeout(() => {
				this.allImgLoad(callback); // 递归扫描
			}, 500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
		}
	}

	msnryInit() {
		this.msnry = new Masonry('.grid', {
			columnWidth: 300,
			itemSelector: '.grid-item',
			gutter: 10,
		});
	}

	render() {
		return (
			<Row>
				<Col span={2}/>
				<Col span={20}>
					<div className="huaban-top">
						<div className="huaban-change" onClick={() => this.getList()}>
							<Icon type="sync" />&nbsp;&nbsp;&nbsp;&nbsp;<span>换一组</span>
						</div>
					</div>
					<div className="grid huaban" style={{ opacity: store.huaban.opacity }}>
						{
							store.huaban.list.map((item, index) => (
								<div className="huaban-item grid-item" key={index}>
									<img src={item.img} width="100%" className="huaban-img" alt="" />
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

