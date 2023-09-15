const express = require('express');
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = Router();


router.get('/', (req, res) => {
    res.send('Server root OK')
})

router.post('/register', async (req, res) => {
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
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        //save to DB
        const result = await user.save()

        //JWT token
        const { _id } = await result.toJSON()
        const token = jwt.sign({ _id: _id }, "secretXLR")

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 6 * 60 * 60 * 1000
        })

        res.send({
            message: "User " + result.username + " has been registered" 
        })

    }



})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).send({
            message: "Email is incorrect",
        })
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).send({
            message: "Password is Incorrect",
        })
    }
 
    const token = jwt.sign({ _id: user._id }, "secretXLR");

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 6 * 60 * 60 * 1000  // 24 hours in milliseconds
    })

    res.send({
        message: "success"
    })
})

router.get('/transactions', (req, res) => {
    res.send('Server root OK')
})

router.get('/user', async (req, res) => {
    try {
        const cookies = req.cookies['jwt']

        const claims = jwt.verify(cookies, "secretXLR")

        if (!claims) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const user = await User.findOne({ _id: claims._id })

        //excludes value in curly braces from data json
        const { password, username, ...data } = await user.toJSON()

        res.send(data);

    } catch (err) {
        return res.status(401).send({ message: "Unauthenticated" })
    }
})

router.post('/logout', (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 })

    res.send({
        message: "success"
    })
})

module.exports = router