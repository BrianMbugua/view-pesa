const User = require('../models/user')
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const jwt = require('jsonwebtoken');

module.exports = asyncMiddleware( async(req, res, next) => {
    const {authorization} = req.headers

    if ( authorization  && authorization.startsWith('Bearer') ) {
        const token = authorization.split('')[1]
        const decoded = jwt.verify( token)

        const user = await User.findById(decoded._id ).select('-password')
        if (user) {
            req.user = user
            next()
         }else{
            res.status(401)
            throw new Error("Unauthorized Invalid token")
         }
    }else {
         res.status(401)
         throw new Error("Unauthorized, No token")   
    }


} )