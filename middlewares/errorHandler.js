class AppError extends Error{
    constructor(message, statusCode){
        super(message)
        this.status =`${statusCode}`.startsWith('4') ? "fail" :"error"
        this.statusCode = statusCode
       

        Error.captureStackTrace(this, this.constructor)
    }
    
}

module.exports = AppError