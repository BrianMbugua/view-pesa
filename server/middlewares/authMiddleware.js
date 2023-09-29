const User = require('../models/user')
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const customJwt = require('../utils/jwt');
const Wallet = require('../models/wallet');

module.exports = asyncMiddleware( async(req, res, next) => {
    const {authorization} = req.headers

    if ( authorization  && authorization.startsWith('Bearer') ) {
        const token = authorization.split(' ')[1]
        const decoded = customJwt.verify( token )

        const user = await User.findById(decoded._id ).select('-password')
        if (user) {
            req.user = user
            next()
         }else{
            res.status(401)
            throw new Error("Unauthorized, Invalid token")
         }

    }else {
         res.status(401)
         throw new Error("Unauthorized, No token")   
    }

   


} )