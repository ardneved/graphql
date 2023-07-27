require('dotenv').config()

const express = require('express')
const colors = require('colors')
const { graphqlHTTP } = require('express-graphql')

const schema = require('./schema/schema')
const connectDB = require('./config/db')
const port = process.env.PORT || 3000
const environment = process.env.NODE_ENV || 'development'

const app = express()

// connect to database
connectDB();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: environment === 'development'
}))

app.listen(port, console.log(`Server (${environment.toUpperCase()}) running on port ${port}, `))