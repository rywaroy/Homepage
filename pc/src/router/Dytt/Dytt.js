import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col} from 'antd';
import {observer} from 'mobx-react'
import store from '../../store'
import utils from '../../utlis'
import './dytt.css'

@observer
export default class Dytt extends Component{

    constructor(props){
		super(props)
		this.state = {
			
		  }
    }

    componentDidMount(){
        // this.getInfo()
    }
    
    //获取数据
    getInfo(){
        axios.get(utils.path + '/api/dytt/all',{
			params:{
				page:1,
			}
		}).then(res => {
			// let data = res.data
			// this.setState({
			// 	commentList:data.comments,
			// 	commentTotal:data.total
			// })
		})
	}
	
	//
	linkInfo(data){
		store.dytt.setInfo(data)
		this.props.history.push(`/movie/dytt/info`)
	}

	render(){
		return(
			<Row>
				<Col span={2}/>
				<Col span={20}>
					<div className="dytt">
						{
							store.dytt.data.map((item,index) => (
								<div className="dytt-item" key={index} onClick={() => {this.linkInfo(item.info)}}>
									<div className="dytt-top f-cb">
										<div className="dytt-name fl">{item.title}</div>
										<div className="dytt-time fr">{item.time}</div>
									</div>
									<div className="dytt-content">{item.intro}</div>
								</div>
							))
						}
					</div>
				</Col>
				<Col span={2}/>
			</Row>
		)
	}
}

