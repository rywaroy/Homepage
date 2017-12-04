import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Routers from './router'
import {Layout} from 'antd';
import Menu from './components/Menu/Menu'
import {HashRouter as Router} from 'react-router-dom';
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
						<Header>Header</Header>
						<Content>
							<Routers />
						</Content>
						<Footer>Footer</Footer>
					</Layout>
				</Layout>
			</Router>
		);
	}
}


export default App;
