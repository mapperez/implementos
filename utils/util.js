const Joi = require("joi");
const { MongooseQueryParser } = require('mongoose-query-parser')
const parser = new MongooseQueryParser();

function validateUser(user) {
    const schema = Joi.object().keys({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .max(10)
            .required()
    });
    const { error, value } = Joi.validate(user, schema);
    if (error && error.details) {
        return { error };
    }
    return { value };
}

function getDateInNumbers() {
    const date = new Date();
    return Date.parse(date);
}

function parseDate(dateInNumbers) {
    const date = new Date();
    date.setTime(dateInNumbers);
    return date;
}

function formattError(error) {
    let objErrors = [];
    let errors = [];

    // Consulta por objeto error
    errors = error.errors;

    if (!errors) {
        if (!error.code) {
            console.log(error);

            if (!error.parent) {
                objErrors = [{
                    path: "Error",
                    message: "Error code parent null"
                }];
            } else {
                switch (error.parent.code) {
                    case "23503":
                        let msg = error.parent.detail.replace("Key", "Clave");
                        msg = msg.replace("is not present in table", "no existe en tabla");
                        objErrors = [{
                            path: "Error",
                            message: msg
                        }];
                        break;

                    default:
                        objErrors = [{
                            path: "Error",
                            message: error.parent.detail
                        }];
                        break;
                }
            }
        } else {
            console.log("Error con code y message");

            switch (error.code) {
                case 11000: //Error de mongo
                    objErrors.push({
                        path: error.code,
                        message: "Registro duplicado"
                    });
                    break;
            }
        }
    } else {
        console.log("Existe error con arreglo de errores");

        Object.entries(errors).map(error => {
            const { path, message } = error[1];
            objErrors.push({ path, message });
        });
    }

    return objErrors;
}

module.exports = {
    validateUser,
    getDateInNumbers,
    parseDate,
    formattError
}