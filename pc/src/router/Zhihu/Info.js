import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Icon } from 'antd';
import dayjs from 'dayjs';
import utils from '../../utils';
import './news-at.css';

export default class Info extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			image: '',
			title: '',
			comment: [],
		};
	}

	componentDidMount() {
		this.getInfo();
		this.getComment();
	}

	getInfo() {
		axios.get(`https://api.isoyu.com/index.php/api/Zhihu/news?id=${this.props.match.params.id}`)
			.then(res => {
				if (res.data.code === 1) {
					const body = res.data.data.body;
					const content = body.replace(/http\w{0,1}:\/\/pic/g, 'https://images.weserv.nl/?url=pic');
					this.setState({
						content,
						image: res.data.data.image,
						title: res.data.data.title,
					});
				}
			});
	}

	getComment() {
		axios.get(`https://api.isoyu.com/index.php/api/Zhihu/new_comment?id=${this.props.match.params.id}`)
			.then(res => {
				if (res.data.code === 1) {
					this.setState({
						comment: res.data.data.comments,
					});
				}
			});
	}

	render() {
		return (
			<div className="single-page">
				<Row>
					<Col span={2} />
					<Col span={20}>
						<div className="single-page-title">{this.state.title}</div>
						<img src={this.state.image} alt="" style={{ marginTop: '20px' }} />
						<div className="single-page-content" dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
						<div className="comment-list">
							{
								this.state.comment.map((item, index) => (
									<div className="comment-list-item" key={index}>
										<div className="comment-list-top f-cb">
											<div className="comment-list-avatar fl" style={{ backgroundImage: 'url(' + item.avatar + ')' }}></div>
											<div className="comment-list-name fl">{item.author}</div>
											<div className="comment-list-time fr">{dayjs(item.time * 1000).format('YYYY-MM-DD hh:mm:ss')}</div>
										</div>
										<div className="comment-list-content">{item.content}</div>
										<div className="comment-list-bot f-cb">
											<div className="comment-list-list fr">
												<Icon type="like" style={{ marginRight: '5px' }} />{item.likes}
											</div>
										</div>
									</div>
								))
							}
						</div>
					</Col>
					<Col span={2} />
				</Row>
			</div>
		);
	}
}

