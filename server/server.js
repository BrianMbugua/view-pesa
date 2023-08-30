const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./models/userModel');

const PORT = 3000
const api = require('./routes/api')
const app = express()

//allows the application to receive json data
app.use(bodyParser.json())


app.use('/api', api)
app.get('/', (req, res) => {
    res.send('Hello from the only server!')
})

//users (plural) since we are fetching a multiple users at a time
app.get('/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

//fetch a single user
app.get('/users/:id', async(req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//user (single) since we are saving a single user at a time
app.post('/users', async(req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//update a user
app.put('/users/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user) {
            return res.status(404).json({message: `User with ID ${id} not found`})
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.connect('mongodb+srv://morian:x9zory5ZpLtFbAP3@moriandb.wqca4nl.mongodb.net/MorianDB?retryWrites=true&w=majority')
.then(() => {

    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })

    console.log('Connected to MongoDB')
}).catch((err) =>{
    console.log(err)
})