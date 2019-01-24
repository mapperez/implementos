const express = require('express')

const app = express();

app.use(require('./localizacion'))



module.exports = app;