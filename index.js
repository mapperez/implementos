const { makeExecutableSchema } = require("graphql-tools");
const { ApolloServer } = require("apollo-server");
const graphqlConfig = require("./api");
const mongoose = require("mongoose");
const express = require('express');

const PORT = 4000;


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

const GRAPHQL_PLAYGROUND_CONFIG = {
    folderName: 'Foo',
    settings: {
        'editor.cursorShape': 'line',
        'editor.fontSize': 14,
        'editor.reuseHeaders': true,
        'editor.theme': 'dark'
    }
};




let hosdev = 'localhost'
let hospro = '192.168.211.77'
let urlmongo = `mongodb://${hospro}:27017/Implenet`


//Model Moogoose
const localizacion = require('./api/localizacion/localizacion.model')

// Rutas
app.use(require('./rest/routes'));



const server = new ApolloServer({
    schema: myschema,
    context: graphqlConfig.context
});



mongoose.connect(urlmongo).then(resp => {
    console.log('Conectado a mongo')
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);

        app.listen(port, (err) => {
            if (err) throw new Error(err);
            console.log(`🚀   Api Rest ready at  http://localhost:${ port }/api`);
        });
    });
}).catch(err => {
    console.log(err)
});