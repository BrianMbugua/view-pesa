//define all api endpoints

const express = require('express');
const router = express.Router()


router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) => {
    let userData = req.body;
})

module.exports = router