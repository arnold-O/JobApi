const express =require('express')
// require('./connect')
// const path = require('path')
const JobRoutes = require('./route/jobRoute')
const AuthRoutes = require('./route/authRoute')

const notFound = require('./middlewares/notFound')
const globalErrorHandler = require('./utils/errors')
const { authenticatedUser } = require('./middlewares/outhMiddleware')


// security packages
const helmet = require('helmet')
const cors = require('cors')
const xss= require('xss-clean')
const rateLimit = require('express-rate-limit')

const app = express()
app.use(express.json());

// since we pushing to heroku we need the immediate line if we behind a proxy /load balancer
app.set('trust proxy', 1)
app.use(rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(cors())
app.use(helmet())
app.use(xss())

// Routes
app.use('/api/v1/job',authenticatedUser,  JobRoutes)
app.use('/api/v1/auth', AuthRoutes)

app.use(notFound)

app.use(globalErrorHandler);





module.exports = app;