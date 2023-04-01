const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../config/serverConfig');

class UserRepository {
    async #getMeHashedPassword(plainPassword) {
        const hashedPassword = await bcrypt.hashSync(plainPassword, saltRounds);
        return hashedPassword;
    }

    async create(data) {
        try {
            const email = data.email;
            const hashedPassword = await this.#getMeHashedPassword(data.password);
            
            const user = await User.create({ email, password: hashedPassword});
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
        
    }

    async get(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['id','email']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw { error };
        }
    }

};

module.exports = UserRepository;