import React, { Component } from 'react';
import { Row, Col, Input, Button, message } from 'antd';
import moment from 'moment';
import utils from '../../utils';
import './article.css';

const { TextArea } = Input;

export default class Info extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: '',
			comment: [], // 评论列表
			name: '', // 评论的昵称
			commentContent: '', // 评论的内容
		};
	}

	componentDidMount() {
		this.getInfo();
		this.getComment();
	}

	// 获取详情
	getInfo() {
		utils.axios.get('article/info', {
			params: {
				id: this.props.match.params.id,
			},
		}).then(res => {
			const data = res.data.data;
			this.setState({
				title: data.title,
				content: data.content,
			});
		});
	}

	// 获取评论
	getComment() {
		utils.axios.get('article/comment', {
			params: {
				id: this.props.match.params.id,
			},
		}).then(res => {
			this.setState({
				comment: res.data.data,
			});
		});
	}

	// 提交评论
	sendComment() {
		if (!this.state.commentContent) {
			message.error('请输入评论内容');
			return;
		}
		utils.axios.post('article/comment', {
			id: this.props.match.params.id,
			name: this.state.name,
			content: this.state.commentContent,
		}).then(res => {
			message.success('提交成功');
			this.getComment();
			this.setState({
				name: '',
				commentContent: '',
			});
		});
	}

	render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="single-page">
						<div className="single-page-title">{this.state.title}</div>
						<div className="single-page-content" dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
					</div>
					<div className="comment-list">
						{
							this.state.comment.map((item,index) => (
								<div className="comment-list-item" key={index}>
									<div className="comment-list-top f-cb">
										<div className="comment-list-name fl">{item.name}</div>
										<div className="comment-list-time fr">{moment(item.time).format('YYYY-MM-DD HH:mm')}</div>
									</div>
									<div className="comment-list-content">{item.content}</div>
								</div>
							))
						}
					</div>
					<div className="comment-form">
						<div className="comment-form-title">发表评论</div>
						<div className="comment-form-name">
							<Input placeholder="昵称，非必填" size="large" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
						</div>
						<div className="comment-form-content">
							<TextArea placeholder="评论内容" autosize={{ minRows: 2, maxRows: 10 }} value={this.state.commentContent}  onChange={e => this.setState({ commentContent: e.target.value })} />
						</div>
						<Button type="primary" onClick={() => this.sendComment()}>提交</Button>
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}

