module.exports = (err, req, res, next) => {
    res
    .status( res.statusCode<400?400: res.statusCode || 500 )   
    .json( {
        message : err.message,
        stack: process.env.NODE_ENV === 'development' ? undefined : err.stack
     })
     // json.({ message: err.message })
}