const express = require('express')
require('dotenv').config()

const { graphqlHTTP } = require('express-graphql')

const schema = require('./schema/schema')

const port = process.env.PORT || 3000
const environment = process.env.NODE_ENV || 'development'

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: environment === 'development'
}))

app.listen(port, console.log(`Server (${environment.toUpperCase()}) running on port ${port}, `))