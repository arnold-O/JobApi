const express =require('express')
// require('./connect')
// const path = require('path')
const JobRoutes = require('./route/jobRoute')
const AuthRoutes = require('./route/authRoute')

const notFound = require('./middlewares/notFound')
const globalErrorHandler = require('./utils/errors')
const { authenticatedUser } = require('./middlewares/outhMiddleware')

const app = express()
app.use(express.json());





// app.use('/api/product', AuthRoutes)
// app.use('/api/tasks', JobRoutes)
app.use('/api/v1/job', JobRoutes)
app.use('/api/v1/auth', authenticatedUser, AuthRoutes)

app.use(notFound)

app.use(globalErrorHandler);





module.exports = app;