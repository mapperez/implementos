/**
 * Ambiente de Ejecucion
 */

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Puertos
 */

process.env.PORT = process.env.PORT || 4200





/**
 * Host
 */
let urlMongo;
let dbName = 'Implenet'
let hosdev = 'localhost'
let hospro = '192.168.211.77'

if (process.env.NODE_ENV === 'dev') {
    console.log("NODE DEVELOPER");
    urlMongo = `mongodb://${hosdev}:27017/SmartMetering`
} else {
    console.log("NODE PRODUCCTION");
    urlMongo = `mongodb://${hospro}:27017/SmartMetering`

}

process.env.urlMongo = urlMongo;