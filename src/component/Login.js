import React, {Component} from 'react'
import axios from 'axios'
import {SAVE_USER} from '../Ducks/reducers'
import store from '../Ducks/store'

export default class Login extends Component {
    constructor(){
        super()
        this.state={
            username:'',
            password:''
        }
    }
    
    login=()=>{
        const {username,password} = this.state
        axios.post('/api/login',{username,password}).then(res=>{
            console.log(res.data)
            store.dispatch({
                type:SAVE_USER,
                payload:res.data
            })
            this.props.history.push('/dash')
        })
    }

    render(){
        return(
            <div>
                <input value={this.state.username} type="text" onChange={(e)=>this.setState({username:e.target.value})}/>
                <input value={this.state.password} type="password" onChange={(e)=>this.setState({password:e.target.value})}/>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}
