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
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Unable to add this user',
            err: error
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

module.exports = {
    create,
    get
};