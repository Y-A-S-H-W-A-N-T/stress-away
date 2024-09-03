const express = require('express');
const router = express.Router()
const { User } = require('../Schema/user')

router.post('/login', async(req,res) => {
    const { name } = req.body
    try{
        const user = await User.findOne({name: name}, '_id')
        res.status(200).send(user._id)
    }catch(err) {
        console.log("Error in Login")
        res.status(400).json({error: 'Login Error'})
    }
})


router.post('/get-sessions', async(req,res) =>{
    const { id } = req.body
    try{
        const user = await User.findOne({ _id: id }, 'sessions')
        res.status(200).send(user.sessions)
    }
    catch(err){
        console.log(err)
        res.status(404).json({error: "Error in fetching session"})
    }
})

router.post('/add-session',async(req,res)=>{
    const { id } = req.body

    try{
        const user = await User.findOne({ _id: id })
        user.sessions.push(req.body)
        await user.save()
        res.status(200).json({msg: 'Session created'})
    }
    catch(err){
        console.log(err)
        res.status(404).json({error: "Error in adding session"})
    }
})



// DEV APIs

router.post('/dummy',async(req,res)=>{
    const user = new User({
        name: 'Abish',
        sessions: []
    })
    res.send(await user.save())
})

module.exports = router;