import React, { Component } from 'react';
import { Row, Col } from 'antd';
import utils from '../../utils';
import './learn.css';
import './markdown.css';

export default class Info extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
		};
	}

	componentDidMount() {
		this.getInfo();
	}

	// 获取详情
	getInfo() {
		utils.axios.get('learn/info', {
			params: {
				id: this.props.match.params.id,
			},
		}).then(res => {
			const data = res.data.data;
			this.setState({
				content: data.html,
			});
		});
	}

	render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="single-page">
						<div className="single-page-content markdown-body" dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}

