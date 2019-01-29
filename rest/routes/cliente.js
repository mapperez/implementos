const express = require('express')
const _ = require('underscore')
const cliente = require('../../api/cliente/cliente.model')




//Declaracion de express
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())


// cliente
app.get('/api/cliente/:id', async(req, res) => {
    let id = req.params.id;

    try {
        let data = await cliente.findById(id)

        return res.json(data)

    } catch (error) {
        return res.status(400).json({
            success: false,
            error
        })
    }

})
app.get('/api/cliente', async(req, res) => {

    try {
        let data = await cliente
            .find({})
            .select("_id sistema llave_negocio usuario fecha latitud longitud")
            .sort("-fecha")
        return res.json(data)

    } catch (error) {
        return res.status(400).json({
            success: false,
            error
        })
    }
})
app.post('/api/cliente', (req, res) => {

    // Parametros que vienen por  post
    let body = req.body;
    let item = {
        fecha: body.fecha,
        sistema: body.sistema,
        llave_negocio: body.llave_negocio,
        usuario: body.usuario,
        latitud: body.latitud,
        longitud: body.longitud
    }

    // Guarda cliente con moongoose
    cliente.create(item).then((resp, err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        res.json({
            success: true,
            data: resp
        })
    })

})
app.put('/api/cliente/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['sistema', 'llave_negocio', 'usuario', 'fecha', 'latitud', 'longitud']);


    cliente.findOneAndUpdate(id, body, { new: true, runValidators: true }, (err, item) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        res.json({
            success: true,
            data: item
        })


    })

})
app.delete('/api/cliente/:id', (req, res) => {
    let id = req.params.id;

    cliente.findOneAndUpdate(id, { estado: false }, (err, item) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        res.json({
            success: true,
            data: item
        })
    })
})

// ==================================================


module.exports = app;