const asyncMiddleware = require('../middlewares/asyncMiddleware')
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const customJwt = require('../utils/jwt')

const addUser = asyncMiddleware(async (req, res) => {

    const user = await User.create(req.body)
    res.status(201).json(user)

})

const registerUser = asyncMiddleware(async (req, res) => {
    
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //find if user exists using the email entered during registration
    const record = await User.findOne({ email: email })
    if (record) {
        return res.status(400).json({ message: "Email already registered" })
    } else {
        const new_user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        //save to DB
        const result = await new_user.save()

        res.status(201).send({
            _id: new_user._id,
            username: new_user.username,
            token: customJwt.generate(new_user._id)

        })

        // res.cookie("jwt", token, {
        //     httpOnly: true,
        //     maxAge: 6 * 60 * 60 * 1000
        // })

        res.send({
            message: "User " + result.username + " has been registered" 
        })

    }


});

const loginUser = asyncMiddleware(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).send({
            message: "Email is incorrect",
        })
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
        res.status(200).send({
        _id: user._id,
        username: user.username,
        token: customJwt.generate( user._id)
        })
    }else throw new Error("Password is Incorrect")
    res.send({
        message: "Success",
    })

})

const getUserInfo = asyncMiddleware(async (req, res) => {

    const user = req.user
    const id = req.params.id
    console.log("Backend get user info ",id)

    if( user?._id.toString() !== id ){
        res.status(401)
        throw new Error("Not authorizeddd, Invalid user")
    }

    const userInfo = await User.findById(user._id).select('-password')
    res.status( 200 ).send(userInfo)
})

const getUsers = asyncMiddleware(async (req, res) => {

    const users = await User.find({});
    res.status(200).json(users)
    
} ) 

const updateUser = asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
        throw new Error({ message: `Not found` })
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
}) 

const deleteUser = asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new Error("User not found")
    }
    res.status(204).json({ message: "Success"});
}) 

module.exports =  {
   addUser, getUserInfo, getUsers, updateUser, deleteUser, registerUser, loginUser
}