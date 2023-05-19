const { StatusCodes } = require('http-status-codes');

class AppError extends Error {
    constructor(name,message,explaination,statusCode) {
        super();
        this.name = name ?? 'appErrors';
        this.message = message ?? 'Something went wrong';
        this.explaination = explaination ?? 'Something went wrong';
        this.statusCode = statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    }
};

module.exports = AppError;