function validateData(req,res,next) {

    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: "Email or password can't be empty"
        });
    }

    next();
}

function adminRoleDataVerification(req,res,next) {
    if(!req.body.id) {
        return res.status(400).json({
            success: false,
            data: {},
            message: "User Id not provided"
        });
    }
    next();
}

module.exports = {
    validateData,
    adminRoleDataVerification
};