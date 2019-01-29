const { PubSub } = require('graphql-yoga');
const { merge } = require('lodash');

//Modelos
const auxiliares = require('./auxiliares')
const localizacion = require('./localizacion')
const cliente = require('./cliente')



//Declaraciones
const pubSub = new PubSub();


module.exports = {
    resolvers: merge({}, localizacion.resolvers, cliente.resolvers),
    typeDefs: [auxiliares.typeDefs, localizacion.typeDefs, cliente.typeDefs].join(' '),
    context: req => ({
        ...req,
        models: {
            localizacion: localizacion.model,
            cliente: cliente.model
        },
        pubSub
    })
};