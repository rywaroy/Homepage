import React, {Component} from 'react';
import {Row, Col , Card , Pagination , Input} from 'antd';
import {observer} from 'mobx-react'
import store from '../../store'
import utils from '../../utils'
import './douban.css'

const Search = Input.Search;

@observer
export default class Douban extends Component{

	componentDidMount() {
		store.douban.list.length === 0 &&this.getList()
	}

	getList(){
		store.loading.show()
		utils.axios.get('douban/list',{
			params:{
				city:store.douban.city,
				page:store.douban.page,
				limit:store.douban.limit
			}
		}).then(res => {
			document.documentElement.scrollTop = document.body.scrollTop = 64
			setTimeout(() => {
				store.loading.hide()
				store.douban.setList(res.data.data.subjects)
				store.douban.setTotal(res.data.data.total)
			},1000)
		})
	}

	//页面切换
	_onChange(page){
		store.douban.setPage(page)
		this.getList()
	}

	//搜索
	search(value){
		store.douban.setCity(value)
		this.getList()
	}

	link(id){
		this.props.history.push(`/movie/douban/info/${id}`)
	}

	//渲染列表
	renderList(){
		return (
			store.douban.list.map((item,index) => (
				<Card title={item.title} style={{ width: 290 }} className="fl list-item" key={index} onClick={() => this.link(item.id)}>
					<img src={item.images.large} width="240" height="336" alt="" style={{display:'block'}}/>
					<div className="list-content">
						<div className="cast">演员表：{this.renderCast(item.casts)}</div>
						<div className="cast">导演：{this.renderCast(item.directors)}</div>
						<div className="cast">类型：{this.renderGenres(item.genres)}</div>
						<div className="cast">评分：{item.rating.average}</div>
						<div className="cast">时长：{item.durations[0]}</div>
						<div className="cast">上映时间：{item.mainland_pubdate}</div>
					</div>
					
				</Card>
			))
		)
	}

	//渲染演员
	renderCast(array){
		return(
			array.map((item,index) => (
				<a href={item.alt} className="cast-item" target="_blank" key={index}>{item.name}</a>
			))
		)

	}

	//渲染类型
	renderGenres(array){
		return(
			array.map((item,index) => (
				<span className="cast-item" key={index}>{item}</span>
			))
		)
	}

	render(){
		return(
			<Row>
				<Col span={1}/>
				<Col span={22}>
					<div className="top f-cb">
						<Search
							placeholder="输入城市名字"
							onSearch={this.search.bind(this)}
							style={{ width: 200 }}
						    className='fl'
							defaultValue={store.douban.city}
						/>
						<a href="http://www.wandoujia.com/apps/com.douban.movie" target="_blank" className="fr">来源</a>
					</div>
					<div className="content f-cb">
						<div className="list">
							{this.renderList()}
						</div>
					</div>
					<Pagination
						defaultCurrent={1}
						current={store.douban.page}
						total={store.douban.total}
						pageSize={store.douban.limit}
						onChange={this._onChange.bind(this)}
					/>

				</Col>
				<Col span={1}/>

			</Row>
		)
	}
}