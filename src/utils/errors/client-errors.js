const AppError = require("./error-handler");

class clientErrors extends AppError {
    constructor(error) {
        super(
            'client-error',
            error.message,
            error.explaination,
            error.statusCode
        )
    }
}

module.exports = clientErrors;