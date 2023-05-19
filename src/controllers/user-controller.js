const UserService = require('../services/user-service');

const userService = new UserService();

async function create(req,res) {
    try {
        const user = await userService.create({
            email: req.body.email,
            password: req.body.password
        });

        return res.status(201).json({
            data: user,
            success: true,
            message: 'Successfully added this user',
            err: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explaination
        });
    }
}

async function get(req,res) {
    try {
        const user = await userService.get(req.params.id);

        return res.status(200).json({
            data: user,
            success: true,
            message: 'Successfully fetched this user',
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to get this user',
            err: error
        });
    }
}

async function login(req,res) {
    try {
        const response = await userService.login(req.body);

        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully logged-in',
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to login',
            err: error
        });
    }
}

async function isAuthenticated(req,res) {
    try {   
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'User is authenticated',
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to authenticate',
            err: error
        });
    }
}

async function isAdmin(req,res) {
    try {   
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully fetched whether user is admin or not',
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to authorise',
            err: error
        });
    }
}

module.exports = {
    create,
    get,
    login,
    isAuthenticated,
    isAdmin
};