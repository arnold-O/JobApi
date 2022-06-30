const asyncWrapper = require("./asyncWrapper")
const AppError = require("./errorHandler")

const Jwt = require('jsonwebtoken')


exports.authenticatedUser = asyncWrapper(  async(req, res, next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ') ){
        
        return next(new AppError('authentication invalid', 401))

    }
    const retrievToken = authHeader.split(' ')[1]

    const payload = Jwt.verify(retrievToken, process.env.JWT_SECRET)

    req.user = {userId:payload.userId, name:payload.userId}


    next()



})