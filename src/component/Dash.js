import React, {Component} from 'react'
import axios from 'axios'
import store from '../Ducks/store'
import {SAVE_MESSAGES} from '../Ducks/reducers'

export default class Dash extends Component {
    constructor(){
        super()
        //this is just so that I can diversify the person that sent the message
        // let randomNum = Math.floor(Math.random()*(+29 - +26) + +26 )
        let reduxState = store.getState()
        this.state={
            message:'',
            messages:[],
            user_id:reduxState.user.user_id //randomNum 
        }
    }

    componentDidMount(){
        this.getMessages()
    }

    getMessages=()=>{
        axios.get('/api/getMessages').then(messages=>{
            //messages is an object with status,data,...
            store.dispatch({
                type:SAVE_MESSAGES,
                payload:messages.data
            })
            // store.subscribe(()=>{
                const reduxState = store.getState()
                this.setState({
                    messages:reduxState.messages
                })
            // })
        })
    }

    handleAdd=()=>{
        const {message,user_id} = this.state //destructuring from state
        axios.post('/api/createMessage',{message,user_id})//two arguments: endpoint and body
            .then(messages=>{
            store.dispatch({
                type:SAVE_MESSAGES,
                payload:messages.data
            })
            // store.subscribe(()=>{
                const reduxState = store.getState()
                this.setState({
                    messages:reduxState.messages,
                    message:''
                })
            // })
        })
    }

    handleEdit(msg){
        const {message} = this.state
        //this msg represents the entire message object being passed in when it is invoked below
        axios.put(`/api/updateMessage/${msg.message_id}`,{message}).then(async messages=>{
            console.log(messages.data)
            store.dispatch({
                type:SAVE_MESSAGES,
                payload:messages.data
            })
            // store.subscribe(()=>{
                const reduxState = await store.getState()
                this.setState({
                    messages:reduxState.messages,
                    message:''
                })
            // })
        })
    }

    handleDelete(message){
        axios.delete(`/api/deleteMessage/${message.message_id}`).then(messages=>{
            store.dispatch({
                type:SAVE_MESSAGES,
                payload:messages.data
            })
            // store.subscribe(()=>{
                const reduxState = store.getState()
                this.setState({
                    messages:reduxState.messages
                })
            // })
        })
    }

    render(){
        console.log(this.state.messages)
        const mappedPost = this.state.messages.map(message=>{
            return(
                <div key={message.message_id}>
                    <h1>{message.message}</h1>
                    <h1>{message.username}</h1>
                    <button onClick={()=>this.handleEdit(message)}>Edit</button>
                    <button onClick={()=>this.handleDelete(message)}>Delete</button>
                </div>
            )
        })
        return(
            <div>
                <input value={this.state.message} type="text" onChange={(e)=>this.setState({message:e.target.value})}/>
                {/* <input type="text"/> */}
                <button onClick={this.handleAdd}>Post</button>
                {mappedPost}
            </div>
        )
    }
}
