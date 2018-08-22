import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import One from './One/One';
import OneDetail from './One/Detail';
import Time from './Time/Time';
import TimeInfo from './Time/Info';
import Douban from './Douban/Douban';
import DoubanInfo from './Douban/Info';
import Dytt from './Dytt/Dytt';
import DyttInfo from './Dytt/Info';
import Weather from './Weather/Weather';
import Article from './Article/Article';
import ArticleInfo from './Article/Info';
import Learn from './Learn/Learn';
import LearnInfo from './Learn/Info';
import Album from './Album/Album';
import Group from './Album/Group';
import Huaban from './Huaban/Huaban';
import Zhihu from './Zhihu/Zhihu';
import ZhihuInfo from './Zhihu/Info';
import Think from './Think/Think';
import Plan from './Plan/Plan';

export default class Root extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/magazine/one" component={One} />
				<Route exact path="/magazine/one/detail/:type/:id" component={OneDetail}></Route>
				<Route exact path="/magazine/huaban" component={Huaban} />
				<Route exact path="/magazine/zhihu" component={Zhihu}></Route>
				<Route exact path="/magazine/zhihu/info/:id" component={ZhihuInfo}></Route>
				<Route exact path="/movie/time" component={Time} />
				<Route exact path="/movie/time/info/:id" component={TimeInfo}></Route>
				<Route exact path="/movie/douban" component={Douban}></Route>
				<Route exact path="/movie/douban/info/:id" component={DoubanInfo}></Route>
				<Route exact path="/movie/dytt" component={Dytt}></Route>
				<Route exact path="/movie/dytt/info" component={DyttInfo}></Route>
				<Route exact path="/tool/weather" component={Weather}></Route>
				<Route exact path="/blog/article" component={Article}></Route>
				<Route exact path="/blog/article/info/:id" component={ArticleInfo}></Route>
				<Route exact path="/blog/learn" component={Learn}></Route>
				<Route exact path="/blog/learn/info/:id" component={LearnInfo}></Route>
				<Route exact path="/blog/album" component={Album}></Route>
				<Route exact path="/blog/album/group/:id" component={Group}></Route>
				<Route exact path="/blog/think" component={Think}></Route>
				<Route exact path="/blog/plan" component={Plan}></Route>
				{/* <Route exact path="/blog/app" component={App}></Route> */}
				<Route component={Learn} />
			</Switch>
		);
	}
}
