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
        store.dytt.data.length === 0 && this.getInfo()
    }
    
    //获取数据
    getInfo(){
		store.loading.show()
        axios.get(utils.path + '/api/dytt/all',{
			params:{
				page:1,
			}
		}).then(res => {
			store.dytt.setData(res.data.data)
			store.loading.hide()
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
								<div className="dytt-item" key={index} onClick={() => {this.linkInfo(item.content)}}>
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

