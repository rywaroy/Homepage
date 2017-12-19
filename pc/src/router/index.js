import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import One from './One/One'
import OneDetail from './One/Detail'
import Time from './Time/Time'
import TimeInfo from './Time/Info'
import Douban from './Douban/Douban'

export default class Root extends Component{
    render(){
        return(
            <Switch>
                <Route exact path="/magazine/one" component={One}/>
                <Route exact path="/magazine/one/detail/:type/:id" component={OneDetail}></Route>
                <Route exact path="/movie/time" component={Time}/>
                <Route exact path="/movie/time/info/:id" component={TimeInfo}></Route>
                <Route exact path="/movie/douban" component={Douban}></Route>
            </Switch>
        )
    }
}