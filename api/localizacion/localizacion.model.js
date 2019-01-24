const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocalizacionSchema = new Schema({


    sistema: {
        type: Number,
        required: true
    },
    llave_negocio: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    latitud: {
        type: String,
        required: true
    },
    longitud: {
        type: String,
        required: true
    }

}, { timestamps: true });
module.exports = mongoose.model('localizacion', LocalizacionSchema);