import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col} from 'antd';
import utils from '../../utlis'
import './time.css'

export default class MovieInfo extends Component{

	state = {
		load:false,
		info:null,
		performer:null,
		comment:null,
		tidbits:null,
		photo:null
	}

	componentDidMount() {
		this.getInfo()
	}

	//获取影片详情
	getInfo(){
		axios.get(utils.path + '/api/time/info',{
			params:{
				id:this.props.match.params.id
			}
		}).then(res => {
			this.setState({
				load:true,
				info:res.data.info,
				performer:res.data.performer,
				comment:res.data.comment,
				tidbits:res.data.tidbits,
				photo:res.data.photo
			})
		})
	}

	render(){
		return(
			<div>
				<Row>
					<Col span={2}/>
					<Col span={20}>
						{this.state.load
							?
							<div>
								<div className="info-title">{this.state.info.basic.name} {this.state.info.basic.nameEn}</div>
								<div className="info-sub-title">剧情简介</div>
								<div className="info-sub-text">{this.state.info.basic.story}</div>
								<div className="info-sub-title">演员信息</div>
								<div className="info-performer-list f-cb">
									{this.state.info.basic.actors.map((item,index) => (
										<div className="info-performer-item fl" key={index}>
											<div className="info-performer-avatar" style={{backgroundImage:'url('+item.img+')'}}></div>
											<div className="info-performer-name">
												{item.name} <br/>
												{item.nameEn}
												</div>
										</div>
									))}
								</div>
								<div className="info-sub-title">导演信息</div>
								<div className="info-performer-list f-cb">
									<div className="info-performer-item fl">
										<div className="info-performer-avatar" style={{backgroundImage:'url('+this.state.info.basic.director.img+')'}}></div>
										<div className="info-performer-name">
											{this.state.info.basic.director.name} <br/>
											{this.state.info.basic.director.nameEn}
										</div>
									</div>
								</div>
							</div>
							:
							null
						}

					</Col>
					<Col span={2}/>
				</Row>
			</div>
		)
	}
}