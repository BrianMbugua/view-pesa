const express = require('express');
const {Router} = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = Router();


router.get('/', (req, res) => {
    res.send('Server root OK')
})

router.post('/register', async(req, res) => {
   let username = req.body.username
   let email = req.body.email
   let password = req.body.password

   const user = new User({
    username: username,
    email: email,
    password: password
   })

   const result = await user.save()

   res.json({
    user:result
   })

})

router.post('/login', async(req, res) => {
    res.send("Login endpoint OK")
})

router.get('/user', async(req, res) => {
    res.send("User endpoint OK")
})

module.exports = router