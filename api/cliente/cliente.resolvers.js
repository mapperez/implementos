const { queryparcer, parseDate, formattError } = require('../../utils/util')


async function agrcli(filter, ctx) {

    let dataz = []


    for (var i = 0, len = filter.length; i < len; i++) {
        let item = await ctx.models.cliente.aggregate([{
            $group: {
                _id: filter[i], //$region is the column name in collection
                count: { $sum: 1 },

            }
        }])
        dataz.push({
            agr: filter[i],
            data: item
        })
    }







    return dataz


}

module.exports = {
    Query: {
        async allCliente(_, { first = 10, skip = 0, filter = "", orderBy }, ctx) {
            const query = queryparcer(filter)

            try {
                const datax = await ctx.models.cliente
                    .find(query)
                    .skip(skip)
                    .limit(first)
                    .sort(orderBy);
                return datax;
            } catch (error) {

                return [];
            }
        },
        async getCliente(_, { _id }, ctx) {
            try {
                const datax = await ctx.models.cliente.findById(_id);

                return datax;
            } catch (error) {

                return [];
            }
        },
        async agrCliente(_, { first = 10, skip = 0, filter = [], orderBy }, ctx) {

            try {


                let datax = await agrcli(filter, ctx)


                return {
                    success: true,
                    error: [],
                    data: datax
                };



            } catch (error) {
                console.log(error);
                return {
                    success: false,
                    error: formattError(error, []),
                    data: []
                };

            }



        }

    },
    Mutation: {
        async createCliente(_, { input }, ctx) {
            try {
                const datax = await ctx.models.cliente.create(input);

                return {
                    success: true,
                    error: [],
                    data: datax
                };


            } catch (error) {
                return {
                    success: false,
                    error: formattError(error, []),
                    data: []
                };


            }
        },
        async updateCliente(_, { _id, input }, ctx) {
            try {
                const datax = await ctx.models.cliente.findOneAndUpdate({ _id }, input, {
                    new: true
                });

                return {
                    success: true,
                    error: [],
                    data: datax
                };


            } catch (error) {
                return {
                    success: false,
                    error: formattError(error, []),
                    data: []
                };


            }
        },
        async deleteCliente(_, { _id }, ctx) {
            try {
                const datax = await ctx.models.cliente.findByIdAndRemove(_id);
                return {
                    success: true,
                    error: [],
                    data: datax
                };
            } catch (error) {
                return {
                    success: false,
                    error: formattError(error, []),
                    data: []
                };


            }
        }
    }
};