const AppError = require('./error-handler');
const {StatusCodes} = require('http-status-codes')

class ClientsError extends AppError {
    constructor(name,message,explanation,statusCodes){
        super(
            name,
            message,
            explanation,
            statusCodes
        );
    }
}

module.exports = ClientsError;