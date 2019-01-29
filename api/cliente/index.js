const clienteModel = require('./cliente.model');
const clienteResolvers = require('./cliente.resolvers');
const loadGQLFile = require('../../utils/gqlLoader');

module.exports = {
    model: clienteModel,
    resolvers: clienteResolvers,
    typeDefs: loadGQLFile('cliente/cliente.graphql')
}