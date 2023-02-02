//Importing third-party modules
const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')
const morgan = require('morgan')

//Database connection
const MONGODB_CONNECTION = require('./database/database')

//Routes
const authRouter = require('./routes/auth.route')

//Middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())


app.use('/api/v1/auth', authRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 4000
const start = async () => {
    try {
        // MongoDB connection
        await MONGODB_CONNECTION(process.env.MONGODB_URI)
        //Starting server
        app.listen(PORT, () => {
            console.log(`Listening to server on http://localhost:${PORT}`)
        })
    }catch (error) {
        console.log(error)
    }

}
start().then(r => () => {
    console.log(r)
} )