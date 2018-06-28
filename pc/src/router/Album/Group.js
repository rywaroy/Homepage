import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Masonry from 'masonry-layout';
import utils from '../../utils';
import './album.css';

export default class Group extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			opacity: 0,
		};
		this.t_img = null;
		this.isLoad = true;
	}

	componentDidMount() {
		this.getAlbums();
	}

	getAlbums() {
		utils.axios.get('album/group', {
			params: {
				id: this.props.match.params.id,
			},
		}).then(res => {
			this.setState({
				list: res.data.data,
			}, () => {
				this.allImgLoad(() => {
					this.msnryInit();
					this.setState({ opacity: 1 });
				});
			});
		});
	}

	allImgLoad(callback) {
		document.querySelectorAll('.album-img').forEach((item) => {
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
					<div className="grid album" style={{ opacity: this.state.opacity }}>
						{
							this.state.list.map((item, index) => (
								<div className="group-item grid-item" key={index}>
									<img src={`${item.url}?imageView2/2/w/300/q/75|imageslim`} width="100%" className="album-img" alt="" />
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

