import React, {Component} from 'react';
import {Row, Col , Tabs} from 'antd';
import Sell from './Sell'
import Hot from './Hot'
import Soon from './Soon'
const TabPane = Tabs.TabPane;

export default class Time extends Component {

	render() {
		return (
			<div className="content">
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						<div className="card-container">
							<Tabs type="card">
								<TabPane tab="正在售票" key="1">
									<Sell {...this.props}/>
								</TabPane>
								<TabPane tab="正在热映" key="2">
									<Hot {...this.props}/>
								</TabPane>
								<TabPane tab="即将上映" key="3">
									<Soon {...this.props}/>
								</TabPane>
							</Tabs>
						</div>
					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
		)
	}
}