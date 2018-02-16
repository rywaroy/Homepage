import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col} from 'antd';
import utils from '../../utlis'
import './dytt.css'

export default class Dytt extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.getInfo()
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

	render(){
		return(
			<Row>
				<Col span={2}/>
				<Col span={20}>

				</Col>
				<Col span={2}/>
			</Row>
		)
	}
}

