const jwt = require('jsonwebtoken');

module.exports = {
    generate: (_id) => jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '6h' }),
    verify: (token) => jwt.verify(token, process.env.JWT_SECRET)
}