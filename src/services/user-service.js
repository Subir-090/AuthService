const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');

const UserRepository = require('../repository/user-repository');

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async #createToken(data) {
        try {
            const token = await jwt.sign(data,JWT_KEY, { expiresIn: "2 days"});
            return token;
        } catch (error) {
            console.log("Something went wrong in token creation in service layer");
            throw { error };
        }
    }

    async #verifyToken(token) {
        try {
            const decodedData = jwt.verify(token,JWT_KEY);
            return decodedData;
        } catch (error) {
            console.log("Something went wrong in token verification in service layer");
            throw { error };
        }
    }

    async isAuthenticated(token) {
        try {
            const isVerified = await this.#verifyToken(token);
            if(!isVerified) {
                throw {error: 'Invalid token'};
            }
            const user = await this.userRepository.get(isVerified.id);
            if(!user) {
                throw {error: "user doesn't exists anymore in this platform"};
            }
            return true;
        } catch (error) {
            console.log("Something went wrong in token verification in service layer");
            throw { error };
        }
    }

    async login(userData) {
        try {
            const response = await this.userRepository.login(userData.email,userData.password);
            if(response) {
                const user = await this.userRepository.getByEmail(userData.email);
                return this.#createToken({ id: user.id, email: userData.email});
            }
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw { error };
        }
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw error;
            }
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async get(userId) {
        try {
            const user = await this.userRepository.get(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw { error };
        }
    }

    async isAdmin(userId) {
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw { error };
        }
    }

};  

module.exports = UserService;
