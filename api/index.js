const { PubSub } = require('graphql-yoga');
const { merge } = require('lodash');

//Modelos
const localizacion = require('./localizacion')



//Declaraciones
const pubSub = new PubSub();


module.exports = {
    resolvers: merge({}, localizacion.resolvers),
    typeDefs: [localizacion.typeDefs].join(' '),
    context: req => ({
        ...req,
        models: {
            localizacion: localizacion.model
        },
        pubSub
    })
};