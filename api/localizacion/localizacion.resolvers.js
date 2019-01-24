const { parseDate, formattError } = require('../../utils/util')



module.exports = {
    Query: {
        async allLocalizacion(_, { first = 10, skip = 0, filter, orderBy }, ctx) {

            const query = {};


            return await ctx.models.localizacion
                .find(query)
                .select("_id sistema llave_negocio usuario fecha latitud longitud")
                .limit(first)
                .sort(orderBy);


        },
        async getLocalizacion(_, { _id }, ctx) {
            try {
                const datax = await ctx.models.localizacion.findById(_id);
                return datax;
            } catch (error) {

                return null;
            }
        }

    },
    Mutation: {
        async createLocalizacion(_, { input }, ctx) {
            const rsul = await ctx.models.localizacion.create(input);
            return rsul;
        },
    }


};