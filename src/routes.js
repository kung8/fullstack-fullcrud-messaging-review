import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './component/Login'
import Dash from './component/Dash'

export default (
    <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/dash' component={Dash}/>
    </Switch>
)