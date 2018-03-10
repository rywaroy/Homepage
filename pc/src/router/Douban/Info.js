import React, {Component} from 'react';
import {Row, Col , Pagination , Icon} from 'antd';
import utils from '../../utils'
import './douban.css'

export default class Info extends Component{

	constructor(props){
		super(props)
		this.state = {
			isLoad:false,
			intro:{},
			imageList:[], //图片列表
			imagePage:1,  //图片页码
			imageLimit:9, //每页图片数量
			imageTotal:0, //图片总数
			commentList:[], //图片列表
			commentPage:1,  //图片页码
			commentLimit:9, //每页图片数量
			commentTotal:0, //图片总数
		}
	}

	componentDidMount() {
		this.getInfo()
		this.getImage()
		this.getComment()
	}

	//获取详情
	getInfo(){
		utils.axios.get('douban/info',{
			params:{
				id:this.props.match.params.id,
			}
		}).then(res => {
			this.setState({
				isLoad:true,
				intro:res.data.data
			})
		})
	}

	//获取图片
	getImage(){
		utils.axios.get('douban/image',{
			params:{
				id:this.props.match.params.id,
				page:this.state.imagePage,
				limit:this.state.imageLimit
			}
		}).then(res => {
			let data = res.data.data
			this.setState({
				imageList:data.photos,
				imageTotal:data.total
			})
		})
	}

	//图片页码切换
	imageChange(page){
		this.setState({imagePage:page},() => {
			this.getImage()
		})
	}

	//获取评论
	getComment(){
		utils.axios.get('douban/comment',{
			params:{
				id:this.props.match.params.id,
				page:this.state.commentPage,
				limit:this.state.commentLimit
			}
		}).then(res => {
			let data = res.data.data
			this.setState({
				commentList:data.comments,
				commentTotal:data.total
			})
		})
	}

	//影评页码切换
	commentChange(page){
		this.setState({commentPage:page},() => {
			this.getComment()
		})
	}

	//渲染
	renderItem(arr){
		return(
			arr.map((item,index) => (
				<span key={index} className="info-intro-item">{item}</span>
			))
		)
	}

	//渲染人物
	renderPeople(arr){
		return(
			arr.map((item,index) => {
				let url = utils.getImgUrl(item.avatars.large)
				return(
					<div className="info-p-item" key={index}>
						<img src={url} alt="" width={200} height={283} className="info-p-img"/>
						<div>{item.name}</div>
						<div>{item.name_en}</div>
					</div>
					)

			})
		)
	}

	//渲染影评
	renderComment(){
		return(
			<div className="comment-list">
				{
					this.state.commentList.map((item,index) => (
						<div className="comment-list-item" key={index}>
							<div className="comment-list-top f-cb">
								<div className="comment-list-avatar fl" style={{backgroundImage:'url('+item.author.avatar+')'}}></div>
								<div className="comment-list-name fl">{item.author.name}</div>
								<div className="fl" style={{lineHeight:'30px',marginLeft:'5px'}}><Icon type="star"/>{item.rating.value}</div>
								
								<div className="comment-list-time fr">{item.created_at}</div>
							</div>
							<div className="comment-list-content">{item.content}</div>
							<div className="comment-list-bot f-cb">
								<div className="comment-list-list fr">
									<Icon type="like" style={{marginRight:'5px'}}/>{item.useful_count}
								</div>
							</div>
						</div>
					))
				}
			</div>
		)
	}

	render(){
		return(
			<Row>
				<Col span={2}/>
					<Col span={20}>
						{this.state.isLoad ?
							<div className="info">
								<div className="title">{this.state.intro.title}</div>
								<div className="en-title">{this.state.intro.aka[1]}</div>
								<div className="info-summary">{this.state.intro.summary}</div>
								<div className="intro">
									<div className="cell">语言：{this.renderItem(this.state.intro.languages)}</div>
									<div className="cell">类型：{this.renderItem(this.state.intro.genres)}</div>
									<div className="cell">时长：{this.renderItem(this.state.intro.durations)}</div>
								</div>
								<div className="subtitle">演员</div>
								<div className="f-cb">
									{this.renderPeople(this.state.intro.casts)}
								</div>
								<div className="subtitle">图片</div>
								<div className="info-images f-cb">
									{
										this.state.imageList.map((item , index) => (
											<div className="info-image fl bg-cover" key={index} style={{backgroundImage:'url(' + utils.getImgUrl(item.image) + ')'}}></div>
										))
									}
								</div>
								<div className="info-page">
									<Pagination 
										current={this.state.imagePage}
										pageSize={this.state.imageLimit}
										total={this.state.imageTotal}
										onChange={this.imageChange.bind(this)}/>
								</div>
								
								<div className="subtitle">影评</div>
								{this.renderComment()}
								<div className="info-page">
									<Pagination 
										current={this.state.commentPage}
										pageSize={this.state.commentLimit}
										total={this.state.commentTotal}
										onChange={this.commentChange.bind(this)}/>
								</div>
							</div>
							:
							null
						}


					</Col>
				<Col span={2}/>
			</Row>
		)
	}
}
