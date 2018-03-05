import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col} from 'antd';
import utils from '../../utlis'
import {observer} from 'mobx-react'
import store from '../../store'
import './album.css'

@observer
export default class Album extends Component{

	constructor(props){
        super(props)
	}
    
    componentDidMount(){
        store.album.list.length === 0 && this.getList()
    }

    //获取相册列表
    getList(){
        utils.axios.get('album/album')
            .then(res => {
                store.album.setList(res.data.data)
            })
    }

    //跳转到相册详情页
    linkInfo(id){
        // this.props.history.push(`/blog/album/info/${id}`)
    }
    
	render(){
		return(
			<Row>
				<Col span={2}/>
				<Col span={20}>
                    <div className="album f-cb">
                        {
                            store.album.list.map((item,index) => (
                                <div className="album-item" key={index} onClick={() => this.linkInfo(item.id)}>
                                    <div className="album-item-img bg-cover" style={{backgroundImage:'url('+item.img+')'}}></div>
                                    <div className="album-item-title">{item.title}</div>
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



