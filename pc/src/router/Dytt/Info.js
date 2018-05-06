import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { observer } from 'mobx-react';
import store from '../../store';

@observer
export default class DyttInfo extends Component {
	render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="single-page-content" dangerouslySetInnerHTML={{ __html: store.dytt.info }}></div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}

