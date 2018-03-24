import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col} from 'antd';
import utils from '../../utils'

export default class Download extends Component{

	constructor(props){
        super(props)
	}
	
	render(){
		return(
			<Row>
				<Col span={2}/>
				<Col span={20}>
                    <div style={{marginTop:'100px'}}>疯狂赶工中。。。</div>
				</Col>
				<Col span={2}/>
			</Row>
		)
	}
}

