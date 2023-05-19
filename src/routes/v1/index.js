const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user-controller');
const { AuthRequest } = require('../../middlewares/index');

router.get('/users/isAuthenticated/',userController.isAuthenticated);
router.post('/users/signup',AuthRequest.validateData,userController.create);
router.get('/users/user/:id',userController.get);
router.post('/users/login',AuthRequest.validateData,userController.login);
router.get(
    '/users/isAdmin',
    AuthRequest.adminRoleDataVerification,
    userController.isAdmin
);

module.exports = router;
