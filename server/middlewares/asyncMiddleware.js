module.exports = (callback) => {
    return async(req, res, next) => {
        try {
        await callback(req, res, next)
        } catch (error) {
            res.status( res.statusCode<400?400: res.statusCode || 500 ).json({ message: error.message })
        }
    }
    
}