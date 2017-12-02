import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col} from 'antd';

export default class Detail extends Component {

	state = {
		type:this.props.match.params.type,
		id:this.props.match.params.id,
		title: '',
		author: '',
		content: '',
		asker:'',
		askContent:'',
		answerer:'',
	}

	componentWillMount() {
		if(this.state.type === '1'){
			this.getStoryInfo()
		}
		if(this.state.type === '2'){
			this.getSerialInfo()
		}
		if(this.state.type === '3'){
			this.getQuestionInfo()
		}
		if(this.state.type === '4'){
			this.getMusicInfo()
		}
		if(this.state.type === '5'){
			this.getMovieInfo()
		}
	}

	//文章获取详情
	getStoryInfo() {
		axios.get(`http://v3.wufazhuce.com:8000/api/essay/${this.state.id}?channel=wdj&source=channel_reading&source_id=9264&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
			.then(res => {
				let data = res.data.data
				this.setState({
					title: data.hp_title,
					author: data.author[0].user_name,
					content: data.hp_content
				})
			})
	}

	//获取连载详情
	getSerialInfo(){
		axios.get(`http://v3.wufazhuce.com:8000/api/serialcontent/${this.state.id}?channel=wdj&source=channel_reading&source_id=9264&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
			.then(res => {
				let data = res.data.data
				this.setState({
					title: data.title,
					author: data.author.user_name,
					content: data.content
				})
			})
	}

	//获取问答详情
	getQuestionInfo(){
		axios.get(`http://v3.wufazhuce.com:8000/api/question/${this.state.id}?channel=wdj&source=channel_reading&source_id=9254&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
			.then(res => {
				let data = res.data.data
				this.setState({
					title: data.question_title,
					content: data.answer_content,
					asker:data.asker.user_name,
					askContent:data.question_content,
					answerer:data.answerer.user_name
				})
			})
	}

	//获取音乐详情
	getMusicInfo(){
		axios.get(`http://v3.wufazhuce.com:8000/api/music/detail/${this.state.id}?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
			.then(res => {
				let data = res.data.data
				this.setState({
					title: data.story_title,
					author: data.author_list[0].user_name,
					content: data.story
				})
			})
	}

	//获取影视详情
	getMovieInfo(){
		axios.get(`http://v3.wufazhuce.com:8000/api/movie/${this.state.id}/story/1/0?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`)
			.then(res => {
				let data = res.data.data.data[0]
				this.setState({
					title: data.title,
					author: data.author_list[0].user_name,
					content: data.content
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
						{
							this.state.type === '3'
								?
								<div>
									<div className="single-page-author">{this.state.asker}问：</div>
									<div className="single-page-content" style={{marginBottom:'80px'}}>{this.state.askContent}</div>
									<div className="single-page-author">{this.state.answerer}答：</div>
								</div>
								:
								<div className="single-page-author">文/{this.state.author}</div>
						}

						<div className="single-page-content"
						     dangerouslySetInnerHTML={{__html: this.state.content}}></div>
					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
		)
	}
}