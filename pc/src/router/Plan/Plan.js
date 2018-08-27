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

	getOptionPie = (data) => ({
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
	
	getOptionLine = (data) => ({
		xAxis: {
				type: 'category',
				data: ['sdfsjkdfjskdjfk', '1Tue', '1Wed', '1Thu', '1Fri', '1Sat', '1Sun','2Mon', '2Tue', '2Wed', '2Thu', '2Fri', '2Sat', '2Sun','3Mon', '3Tue', '3Wed', '3Thu', '3Fri', '3Sat', '3Sun','4Mon', '4Tue', '4Wed', '4Thu', '4Fri', '4Sat', '4Sun']
		},
		yAxis: {
				type: 'value'
		},
		tooltip: {
      trigger: 'item',
      formatter: "{b} : {c}",
    },
		series: [{
				data: [820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320],
				type: 'line'
		}]
	})

	render() {
		return (
			<Row>
				<Col span={2} />
				<Col span={20}>
					<div className="plan__content">
						{
							store.plan.list.map(item => (
								<div className="plan__chart f-cb" key={item.tid}>
									<div className="plan__pie">
										<ReactEchartsCore 
											option={this.getOptionPie(item)}
											style={{height: 300, width: 400}}/>
									</div>
									<div className="plan__line">
										<ReactEchartsCore 
											option={this.getOptionLine(item)}
											style={{height: 300, width: 1000}}/>
									</div>
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
