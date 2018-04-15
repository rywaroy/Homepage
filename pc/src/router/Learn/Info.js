import React, {Component} from 'react';
import {Row, Col, message} from 'antd';
import utils from '../../utils'
import moment from 'moment'
import './learn.css'

export default class Info extends Component{

	constructor(props){
        super(props)
        this.state = {
            title:'',
            html:'',
        }
    }
    
    componentDidMount(){
        this.getInfo()
    }

    //获取详情
    getInfo(){
        utils.axios.get('learn/info',{
			params:{
				id:this.props.match.params.id,
			}
		}).then(res => {
            let data = res.data.data
            this.setState({
                title:data.title,
                content:data.html
            })
        })
    }
	
	render(){
		return(
			<Row>
				<Col span={2}/>
				<Col span={20}>
                    <div className="single-page">
                        <div className="single-page-title">{this.state.title}</div>
                        <div className="single-page-content" dangerouslySetInnerHTML={{__html: this.state.html}}></div>
                    </div>
				</Col>
				<Col span={2}/>
			</Row>
		)
	}
}

