import React, {Component} from 'react';
import {Row, Col} from 'antd';
import utils from '../../utlis'
import moment from 'moment'
export default class Info extends Component{

	constructor(props){
        super(props)
        this.state = {
            title:'',
            content:'',
            comment:[]
        }
    }
    
    componentDidMount(){
        this.getInfo()
        this.getComment()
    }

    //获取详情
    getInfo(){
        utils.axios.get('article/info',{
			params:{
				id:this.props.match.params.id,
			}
		}).then(res => {
            let data = res.data.data
            this.setState({
                title:data.title,
                content:data.content
            })
		})
    }

    //获取留言
    getComment(){
        utils.axios.get('article/comment',{
			params:{
				id:this.props.match.params.id,
			}
		}).then(res => {
            this.setState({
                comment:res.data.data
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
                        <div className="single-page-content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                    </div>
                    <div className="comment-list">
                        {
                            this.state.comment.map((item,index) => (
                                <div className="comment-list-item" key={index}>
                                    <div className="comment-list-top f-cb">
                                        <div className="comment-list-name fl">{item.name}</div>
                                        <div className="comment-list-time fr">{moment(item.time).format('YYYY-MM-DD hh:mm')}</div>
									</div>
                                    <div className="comment-list-content">{item.content}</div>
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

