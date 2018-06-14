import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import './menu.css'
import {Link} from 'react-router-dom';

const SubMenu = Menu.SubMenu;
let open = 'magazine';
let active;
let hashArray = window.location.pathname.split('/');
if (hashArray.length >= 3) {
	open = hashArray[1]
	active = hashArray[2]
}
if (hashArray.length === 2) {
	open = 'blog'
	active = 'learn'
}
export default class Sider extends Component {

	constructor(props) {
		super(props)
		this.state = {
			collapsed: false,
			openKeys: [open],
			active: active,
		}
	}

	toggleCollapsed = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}

	_onSelect(item) {
		this.setState({
			active: item.key
		})
	}

	_onOpenChange(openKeys) {
		const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
		this.setState({
			openKeys: latestOpenKey ? [latestOpenKey] : [],
		});
	}

	render() {
		return (
			<div style={{width: 200}}>
				<div className="logo">
					<img src={require('../../assets/logo.jpg')} width="100%" height="100%" alt="" />
				</div>
				<div className="menu-link">
					<a href="https://weibo.com/u/5872048859?refer_flag=1001030101_" className="menu-link-item weibo" target="_blank"></a>
					<a href="https://github.com/rywaroy" className="menu-link-item github" target="_blank"></a>
				</div>
				<Menu
					mode="inline"
					theme="dark"
					openKeys={this.state.openKeys}
					selectedKeys={[this.state.active]}
					onSelect={this._onSelect.bind(this)}
					onOpenChange={this._onOpenChange.bind(this)}
				>
					<SubMenu key="magazine" title={<span><Icon type="pie-chart"/><span>杂志</span></span>}>
						<Menu.Item key="one"><Link to='/magazine/one'>ONE · 一个</Link></Menu.Item>
						<Menu.Item key="huaban"><Link to='/magazine/huaban'>花瓣相册</Link></Menu.Item>
						<Menu.Item key="zhihu"><Link to='/magazine/zhihu'>知乎日报</Link></Menu.Item>
					</SubMenu>
					<SubMenu key="movie" title={<span><Icon type="hdd"/><span>电影</span></span>}>
						<Menu.Item key="time"><Link to='/movie/time'>Time时光</Link></Menu.Item>
						<Menu.Item key="douban"><Link to='/movie/douban'>豆瓣电影</Link></Menu.Item>
						<Menu.Item key="dytt"><Link to='/movie/dytt'>电影天堂</Link></Menu.Item>
					</SubMenu>
					<SubMenu key="tool" title={<span><Icon type="appstore-o"/><span>工具</span></span>}>
						<Menu.Item key="weather"><Link to='/tool/weather'>中央天气预报</Link></Menu.Item>
					</SubMenu>
					<SubMenu key="blog" title={<span><Icon type="book"/><span>博客</span></span>}>
						<Menu.Item key="learn"><Link to='/blog/learn'>学习</Link></Menu.Item>
						<Menu.Item key="article"><Link to='/blog/article'>日志</Link></Menu.Item>
						<Menu.Item key="album"><Link to='/blog/album'>相册</Link></Menu.Item>
						<Menu.Item key="think"><Link to='/blog/think'>说说</Link></Menu.Item>
						{/* <Menu.Item key="app"><Link to='/blog/app'>APP下载</Link></Menu.Item> */}
					</SubMenu>
				</Menu>
			</div>
		);
	}
}