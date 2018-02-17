import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col} from 'antd';
import {observer} from 'mobx-react'
import store from '../../store'
import utils from '../../utlis'

@observer
export default class DyttInfo extends Component{
	render(){
		return(
			<Row>
				<Col span={2}/>
				<Col span={20}>
                    <div className="single-page-content" dangerouslySetInnerHTML={{__html: store.dytt.info}}></div>
				</Col>
				<Col span={2}/>
			</Row>
		)
	}
}

