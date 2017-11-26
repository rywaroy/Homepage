import React, { Component } from 'react';
import {HashRouter as Router , Route ,Switch} from 'react-router-dom';
import One from './One/One'
import Two from './One/Two'
export default class Root extends Component{
    render(){
        return(
            
                <Switch>
                    <Route exact path="/" component={One} />
                    <Route path="/two/two" component={Two} />
                </Switch>
            
        )
    }
}