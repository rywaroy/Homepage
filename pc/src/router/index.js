import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import One from './One/One'
import OneDetail from './One/Detail'
import Time from './Time/Time'
export default class Root extends Component{
    render(){
        return(
            <Switch>
                <Route exact path="/magazine/one" component={One}/>
                <Route path="/magazine/one/detail/:type/:id" component={OneDetail}></Route>
                <Route exact path="/movie/time" component={Time}/>
            </Switch>
        )
    }
}