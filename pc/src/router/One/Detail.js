import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import utils from '../../utils';

export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: this.props.match.params.type,
			id: this.props.match.params.id,
			content: '',
			// title: '',
			// author: '',
		};
	}


	componentDidMount() {
		let type = '';
		if (this.state.type === '1') {
			type = 'essay';
			// this.getStoryInfo('essay');
		}
		if (this.state.type === '2') {
			type = 'serialcontent';
			// this.getSerialInfo('serialcontent');
		}
		if (this.state.type === '3') {
			type = 'question';
			// this.getQuestionInfo('question');
		}
		if (this.state.type === '4') {
			type = 'music';
			// this.getMusicInfo('music');
		}
		if (this.state.type === '5') {
			type = 'movie';
			// this.getMovieInfo('movie');
		}
		this.getInfo(type);
		this.getComment(type === 'serialcontent' ? 'serial' : type);
	}

	// 获取详情

	getInfo(type) {
		utils.axios.get(`/one/info?id=${this.state.id}&type=${type}`)
			.then(res => {
				const data = res.data.data;
				this.setState({
					content: data.html_content,
				});
			});
	}

	// 文章获取详情
	// getStoryInfo(type) {
	// 	utils.axios.get(`/one/info?id=${this.state.id}&type=${type}`)
	// 		.then(res => {
	// 			const data = res.data.data;
	// 			this.setState({
	// 				title: data.title,
	// 				author: data.author_list[0].user_name,
	// 				content: data.html_content,
	// 			});
	// 		});
	// }

	// 获取连载详情
	// getSerialInfo(type) {
	// 	utils.axios.get(`/one/info?id=${this.state.id}&type=${type}`)
	// 		.then(res => {
	// 			const data = res.data.data;
	// 			this.setState({
	// 				title: data.title,
	// 				author: data.author_list[0].user_name,
	// 				content: data.html_content,
	// 			});
	// 		});
	// }

	// 获取问答详情
	// getQuestionInfo(type) {
	// 	utils.axios.get(`/one/info?id=${this.state.id}&type=${type}`)
	// 		.then(res => {
	// 			const data = res.data.data;
	// 			this.setState({
	// 				title: data.title,
	// 				content: data.html_content,
	// 				// asker: data.asker.user_name,
	// 				// askContent: data.question_content,
	// 				// answerer: data.answerer.user_name,
	// 			});
	// 		});
	// }

	// 获取音乐详情
	// getMusicInfo(type) {
	// 	utils.axios.get(`/one/info?id=${this.state.id}&type=${type}`)
	// 		.then(res => {
	// 			const data = res.data.data;
	// 			this.setState({
	// 				title: data.title,
	// 				author: data.author_list[0].user_name,
	// 				content: data.html_content,
	// 			});
	// 		});
	// }

	// 获取影视详情
	// getMovieInfo(type) {
	// 	utils.axios.get(`/one/info?id=${this.state.id}&type=${type}`)
	// 		.then(res => {
	// 			const data = res.data.data;
	// 			this.setState({
	// 				title: data.title,
	// 				author: data.author_list[0].user_name,
	// 				content: data.html_content,
	// 			});
	// 		});
	// }

	// 获取评论
	getComment(type) {
		utils.axios.get(`/one/comment?id=${this.state.id}&type=${type}`)
			.then(res => {
				this.setState({
					replyList: res.data.data.data,
				});
			});
	}

	render() {
		return (
			<div className="single-page">
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						{/* <div className="single-page-title">{this.state.title}</div>
						{
							this.state.type === '3'
								?
								<div>
									<div className="single-page-author">{this.state.asker}问：</div>
									<div className="single-page-content" style={{marginBottom: '80px'}}>{this.state.askContent}</div>
									<div className="single-page-author">{this.state.answerer}答：</div>
								</div>
								:
								<div className="single-page-author">文/{this.state.author}</div>
						} */}

						<div className="single-page-content" dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
						<div className="comment-list">
							{
								this.state.replyList.map((item, index) => (
									<div className="comment-list-item" key={index}>
										<div className="comment-list-top f-cb">
											<div className="comment-list-avatar fl" style={{backgroundImage: 'url(' + item.user.web_url + ')' }}></div>
											<div className="comment-list-name fl">{item.user.user_name}</div>
											<div className="comment-list-time fr">{item.created_at}</div>
										</div>
										{
											item.quote ?
												<div className="comment-list-reply">{item.touser.user_name}: {item.quote}</div>
												:
												null
										}
										<div className="comment-list-content">{item.content}</div>
										<div className="comment-list-bot f-cb">
											<div className="comment-list-list fr">
												<Icon type="like" style={{ marginRight: '5px' }} />{item.praisenum}
											</div>
										</div>
									</div>
								))
							}

						</div>
					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
		);
	}
}
