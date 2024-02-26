const jwt = require('jsonwebtoken');

const {JWT_KEY} = require('../config/serverConfig');

const UserRepository = require('../repository/user-repository');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try{
            const user = await this.userRepository.create(data);
            return user;
        }
        catch(error){
            console.log('Something went wrong at service layer');
            throw error;
        }
    }

    createToken(user){
        try {
            const response = jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
            return response;
            
        } catch (error) {
            console.log('Something went wrong at token creation');
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log('Something went wrong at token validation');
            throw error;
        }
    }
}

module.exports = UserService;