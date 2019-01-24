const localizacionModel = require('./localizacion.model');
const localizacionResolvers = require('./localizacion.resolvers');
const loadGQLFile = require('../../utils/gqlLoader');

module.exports = {
    model: localizacionModel,
    resolvers: localizacionResolvers,
    typeDefs: loadGQLFile('localizacion/localizacion.graphql')
}