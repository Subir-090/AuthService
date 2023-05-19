const AppError = require("./error-handler");
const { StatusCodes } = require('http-status-codes');

class validationErrors extends AppError{
    constructor(error) {
        let explaination = [];
        error.errors.forEach((err) => {
            explaination.push(err.message);
        });

        super(
            error.name,
            'Not able to validate data sent in request',
            explaination,
            StatusCodes.BAD_REQUEST
        )
    }
};

module.exports = validationErrors;