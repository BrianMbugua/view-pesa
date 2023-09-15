const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const User = require('./models/user');
const routes = require('./routes/routes');

const PORT = 4000
const app = express();

//allows the application to receive json data
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}
));

app.use(cookieParser());

app.use("/api", routes);


//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/')
    .then(() => {

        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        })
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.log(err)
    })


app.get('/', (req, res) => {
    res.send('Hello to CLIENT!')
})

//users (plural) since we are fetching a multiple users at a time
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

//fetch a single user
app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//user (single) since we are saving a single user at a time
app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

//update a user
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            return res.status(404).json({ message: `User with ID ${id} not found` })
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: `User with not found` })
        }
        res.status(200).json({ message: `User with ID ${id} deleted`, user});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

