import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import One from './One/One'
import OneDetail from './One/Detail'
export default class Root extends Component{
    render(){
        return(
            <Switch>
            <Route exact path="/magazine/one" component={One}/>
            <Route path="/magazine/one/detail/:type/:id" component={OneDetail}></Route>
            </Switch>
        )
    }
}