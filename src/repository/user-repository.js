const { User, Roles } = require('../models/index');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../config/serverConfig');
const validationErrors = require('../utils/errors/validation-errors');

class UserRepository {
    async #getMeHashedPassword(plainPassword) {
        const hashedPassword = await bcrypt.hashSync(plainPassword, saltRounds);
        return hashedPassword;
    }

    async #checkPassword(plainPassword, hashedPassword) {
        const result = bcrypt.compareSync(plainPassword, hashedPassword);
        return result;
    }

    async login(userEmail, userPassword) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            
            const userHashedPassword = user.password;
            const matched = await this.#checkPassword(userPassword, userHashedPassword);
            
            if(matched) {
                return true;
            }
            
            throw { message : "Invalid Password" };
        } catch (error) {
            console.log("Not able to login");
            throw { error };
        }
    }

    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw new validationErrors(error);
            }
            console.log("Something went wrong in the repository layer");
            throw error;
        }
        
    }

    async get(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['id','email']
            });
            if(!user) {
                throw {error: 'User not available'};
            }
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }

    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const role = await Roles.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return user.hasRole(role);
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }

};

module.exports = UserRepository;