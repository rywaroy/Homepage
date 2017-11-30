import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col} from 'antd';

export default class Detail extends Component {

	state = {
		title: '',
		author: '',
		content: ''
	}

	componentDidMount() {
		console.log(this.props)
		this.getInfo()
	}

	//获取详情
	getInfo() {
		axios.get(`http://v3.wufazhuce.com:8000/api/essay/${this.props.match.params.id}?channel=wdj&source=channel_reading&source_id=9264&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
			.then(res => {
				let data = res.data.data
				this.setState({
					title: data.hp_title,
					author: data.hp_author,
					content: data.hp_content
				})
			})
	}

	render() {
		return (
			<div className="single-page">
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						<div className="single-page-title">{this.state.title}</div>
						<div className="single-page-author">文/{this.state.author}</div>
						<div className="single-page-content"
						     dangerouslySetInnerHTML={{__html: this.state.content}}></div>
					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
		)
	}
}