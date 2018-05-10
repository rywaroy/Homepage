import React, { Component } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import utils from '../../utils';
import './time.css';

export default class MovieInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			load: false,
			info: null,
			performer: null,
			comment: null,
			tidbits: null,
		};
	}

	componentDidMount() {
		this.getInfo();
	}

	// 获取影片详情
	getInfo() {
		utils.axios.get('time/info', {
			params: {
				id: this.props.match.params.id,
			},
		}).then(res => {
			const data = res.data.data;
			this.setState({
				load: true,
				info: data.info,
				performer: data.performer,
				comment: data.comment,
				tidbits: data.tidbits,
			});
		});
	}

	// 跳转预告片外链
	videoLink(url) {
		const win = window.open('');
		win.location.href = url;
	}

	// 渲染演员信息
	renderPerformer() {
		return (
			this.state.performer.map((type, indexType) => (
				<div key={indexType}>
					<div className="info-sub-title">{type.typeName}&nbsp;&nbsp;&nbsp;&nbsp;{type.typeNameEn}</div>
					<div className="info-performer-list f-cb">
						{type.persons.map((person, personType) => (
							<div className="info-performer-item fl" key={personType}>
								<div className="info-performer-avatar" style={{backgroundImage: 'url(' + person.image + ')'}}></div>
								<div className="info-performer-name">
									{person.name} <br />
									{person.nameEn}
								</div>
							</div>
						))}

					</div>
				</div>
			))
		);
	}

	// 渲染预告
	renderTidbits() {
		return (
			<Row gutter={16}>
				{this.state.tidbits.map((item, index) => (

					<Col span={6} xl={6} md={8} xs={12} key={index}>
						<div className="info-video-box" key={index}>
							<div className="info-video-link" target="_blank" onClick={() => this.videoLink(item.url)}>
								<img src={item.image} width={'100%'} alt="" />
								<div className="info-video-btn"></div>
							</div>

							<div className="info-video-title">{item.title}</div>
						</div>
					</Col>

				))}
			</Row>
		)
	}

	// 渲染评论
	renderComment() {
		return (
			<div>
				<div className="info-sub-title info-comment-title">精选影评</div>
				{this.state.comment.plus.list.map((item, index) => (
					<div className="comment-list-item" key={index}>
						<div className="comment-list-top f-cb">
							<div className="comment-list-avatar fl" style={{ backgroundImage: 'url(' + item.headImg + ')' }}></div>
							<div className="comment-list-name fl">{item.nickname}</div>
							<div className="comment-list-time fr">{moment(new Date(item.commentDate * 1000)).format('YYYY-MM-DD hh:mm:ss')}</div>
						</div>
						<div className="comment-list-content">{item.content}</div>
					</div>
				))}
				<div className="info-sub-title info-comment-title">短评</div>
				{this.state.comment.mini.list.map((item, index) => (
					<div className="comment-list-item" key={index}>
						<div className="comment-list-top f-cb">
							<div className="comment-list-avatar fl" style={{ backgroundImage: 'url(' + item.headImg + ')' }}></div>
							<div className="comment-list-name fl">{item.nickname}</div>
							<div lassName="comment-list-time fr">{moment(new Date(item.commentDate * 1000)).format('YYYY-MM-DD hh:mm:ss')}</div>
						</div>
						<div className="comment-list-content">{item.content}</div>
					</div>
				))}
			</div>
		)
	}

	render() {
		return (
			<div>
				<Row>
					<Col span={2} />
					<Col span={20}>
						{this.state.load
							?
							<div className="info-content">
								<div className="info-title">{this.state.info.basic.name} {this.state.info.basic.nameEn}</div>
								<div className="info-sub-title">剧情简介</div>
								<div className="info-sub-text">{this.state.info.basic.story}</div>

								{/* 渲染演员信息 */}
								<div className="info-title">演员列表</div>
								{this.renderPerformer()}

								{/* 渲染预告 */}
								<div className="info-title">预告片&拍摄花絮</div>
								<div className="info-video-list f-cb">
									{this.renderTidbits()}
								</div>

								{/* 渲染评论 */}
								<div className="info-title">评论</div>
								{this.renderComment()}
							</div>
							:
							null
						}
					</Col>
					<Col span={2} />
				</Row>
			</div>
		);
	}
}
