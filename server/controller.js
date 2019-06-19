const bcrypt = require('bcryptjs')

module.exports={
    login:async(req,res)=>{
        let db = req.app.get('db') //accessing db
        const {username,password} = req.body
        const foundUser = await db.login({username,password})
        console.log(foundUser)

        if(!foundUser[0]){
            return res.sendStatus(401)
        }
        // let authenticated = bcrypt.compareSync(foundUser[0].password,password)
        // console.log(authenticated)
        // if(!authenticated){
        //     return res.sendStatus(401)
        // }
        delete foundUser[0].password
        res.send(foundUser[0])
    },

    get:async(req,res)=>{
        let db = req.app.get('db') //accessing db
        const messages = await db.get_messages() //return all of the messages (array)
        res.send(messages)
    },

    post:async(req,res)=>{
        let db = req.app.get('db') //accessing db
        // const message = req.body
        const {message,user_id} = req.body

        // const messages = await db.post_messages(req.body)
        const messages = await db.post_message({message,user_id}) //for ${property}
        // const messages = await db.post_messages([message,user_id]) //for $1
        // const messages = await db.post_messages(message,user_id) //can't work
        // const messages = await db.post_messages(message) //this works for one item being sent back
        res.send(messages)
    },

    update:async(req,res)=>{
        let db = req.app.get('db') //accessing db
        const {message} = req.body;
        const {message_id} = req.params
        const messages = await db.update_message({message,message_id})
        res.send(messages)
    },

    delete: async(req,res)=>{
        let db = req.app.get('db')
        const {message_id} = req.params
        const messages = await db.delete_message({message_id})
        res.send(messages)
    },
}