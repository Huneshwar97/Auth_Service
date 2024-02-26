const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

    async signIn(email,plainPassword){
        try {
            //step 1-> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            console.log(user);
            //step2-> compare the incoming plain password with the stored encrypted password
            console.log(plainPassword);
            console.log(user.password);
            const passwordMatch = this.checkPassword(plainPassword,user.password);

            if(!passwordMatch){
                console.log("Password doesn't match");
                throw {error:'Incorrect password'};
            }
            //step 3->if password match generate the token
            const newJWT = this.createToken({email:user.email,id:user.id});
            return newJWT;
        } catch (error) {
            console.log('Something went wrong at signIn process');
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

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password verification");
            throw error;
            
        }
    }
}

module.exports = UserService;