import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Routers from './router'
import {Layout} from 'antd';
import Menu from './components/Menu/Menu'
import {BrowserRouter as Router} from 'react-router-dom';
import Loading from './components/Loading/Loading'

const {Header, Footer, Sider, Content} = Layout;

class App extends Component {
	render() {
		return (
			<Router>
				<Layout style={{minHeight: '100vh'}}>
					<Loading />
					<Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0 , zIndex:5}}>
						<Menu/>
					</Sider>
					<Layout style={{marginLeft: 200}}>
						<Header>
							<div className="header">这里该写点什么？</div>
						</Header>
						<Content>
							<Routers />
						</Content>
						<Footer>
							<div className="footer">网站大部分 API 均由产品公司自身提供，本人皆从网络获取。获取与共享之行为或有侵犯产品权益的嫌疑。若被告知需停止共享与使用，本人会及时删除此页面与整个项目。请您暸解相关情况，并遵守产品协议。</div>
						</Footer>
					</Layout>
				</Layout>
			</Router>
		);
	}
}


export default App;
