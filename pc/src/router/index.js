import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import One from './One/One'
export default class Root extends Component{
    render(){
        return(
            <Route exact path="/magazine/one" component={One} />
        )
    }
}