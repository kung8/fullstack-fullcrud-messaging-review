const initialState = {
    messages:[],
    user:{}
}

export const SAVE_MESSAGES = 'SAVE_MESSAGES'
export const SAVE_USER = 'SAVE_USER'

export default function(state=initialState,action){
    const {type,payload} = action
    switch(type){
        case SAVE_USER:
            return {...state,user:payload}
        case SAVE_MESSAGES:
            console.log('hit save messages',payload)
            return {...state,messages:payload}
        default: 
            return {...state}
    }
}