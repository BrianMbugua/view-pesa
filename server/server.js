const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.routes');
const { getUsers, getUserInfo, addUser, updateUser, deleteUser } = require('./controllers/userController');


const app = express();

//allows the application to receive json data
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}
));
dotenv.config()
const PORT = process.env.PORT || 4000

app.use(cookieParser());

app.use("/api/users", userRouter);


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

app.get('/users', getUsers )

//fetch a single user
app.get('/users/:id', getUserInfo)

//user (single) since we are saving a single user at a time
app.post('/users', addUser) 

//update a user
app.put('/users/:id', updateUser )

//delete a user
app.delete('/users/:id', deleteUser) 

