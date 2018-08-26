import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import utils from '../../utils';
import store from '../../store';
import { observer } from 'mobx-react';
import ReactEchartsCore from 'echarts-for-react';
import './plan.css';

@observer
export default class Plan extends Component {

	componentDidMount() {
		store.plan.list.length === 0 && this.getList();
	}

	getList() {
		utils.axios.get('plan/list')
			.then(res => {
				this.getAnalysis(res.data.data.list);
			});
	}

	getAnalysis(list) {
		utils.axios.get('plan/analysis')
			.then(res => {
				const data = res.data.data;
				for (let i = 0; i < data.length; i++) {
					for (let j = 0; j < list.length; j++) {
						if (data[i].tid === list[j].id) {
							data[i].title = list[j].title;
						}
					}
				}
				store.plan.setList(data);
			});
	}

	getOption = (data) => ({
    title: {
      text: data.title,
      x:'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['已打卡', '未打卡'],
    },
    series : [
      {
				name: '打卡记录',
				type: 'pie',
				radius : '55%',
				center: ['50%', '60%'],
				data: [
					{ value: data.success, name:'已打卡' },
					{value: data.fail, name:'未打卡'},
				],
				color: ['#1FB2F1', '#C91130'],
				itemStyle: {
					emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)',
					}
				},
      },
    ]
  });

	render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="plan__content">
						{
							store.plan.list.map(item => (
								<div className="plan__pie" key={item.tid}>
									<ReactEchartsCore 
										option={this.getOption(item)}
										style={{height: 300}}/>
								</div>
							))
						}
					</div>
				</Col>
				<Col span={2} />
			</Row>
		);
	}
}
