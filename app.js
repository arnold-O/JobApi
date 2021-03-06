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


// swagger

const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const app = express()
app.use(express.json());

// since we pushing to heroku we need the immediate line if we behind a proxy /load balancer
app.set('trust proxy', 1)
app.use(rateLimit({
	windowMs:  60 * 1000,
	max: 60, 
}))
app.use(cors())
app.use(helmet())
app.use(xss())



app.get('/', (req, res)=>{
	res.send('<h1>jobs-api</h1><a href="/api-docs">Documentation</a>')
})
// docs routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Routes
app.use('/api/v1/job',authenticatedUser,  JobRoutes)
app.use('/api/v1/auth', AuthRoutes)

app.use(notFound)

app.use(globalErrorHandler);





module.exports = app;