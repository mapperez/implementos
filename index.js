require('./config/config');

const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require("graphql-tools");
const graphqlConfig = require("./api");
const mongoose = require("mongoose");
const express = require('express');




// Express
const app = express();


//Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



//create a schema
const myschema = makeExecutableSchema({
    typeDefs: graphqlConfig.typeDefs,
    resolvers: graphqlConfig.resolvers
});
//apply middlewares on the schema




// Rutas
app.use(require('./rest/routes'));


const server = new ApolloServer({
    schema: myschema,
    context: graphqlConfig.context
});


server.applyMiddleware({ app });





mongoose.connect(process.env.urlMongo, { useNewUrlParser: true }).then(resp => {

    app.listen({ port: process.env.PORT }, () => {

        console.log("============== NODE SERVER ==================");
        console.log(`🚀 Servidor Mongo      en:  ${process.env.urlMongo}`)
        console.log(`🚀 Servidor GraphQL    en:  http://localhost:${process.env.PORT}${server.graphqlPath}`)
        console.log(`🚀 Servidor REST       en:  http://localhost:${process.env.PORT}/api/`)
        console.log("============== NODE SERVER ==================");
    });

}).catch(err => {
    console.log(err)
});