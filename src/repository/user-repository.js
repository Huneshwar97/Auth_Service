const ValidationError = require('../utils/validation-error');
const {User,Role} = require('../models/index');

const ClientsError = require('../utils/client-error');
const {StatusCodes} = require('http-status-codes')


class UserRepository {
    async create(data){
        try{
            const user = await User.create(data);
            return user;
        }
        catch (error){
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            console.log('Something went wrong at repository level');
            throw error;
        }
    }

    async destroy(userId){
        try{
            const user =await User.destroy({
                where:{
                    id:userId
                }
            });
            return user;
        }
        catch (error){
            console.log('Something went wrong at repository level');
            throw error;
        }
    }

    async getById(userId){
        try{
            const user =await User.findByPk(userId,{
                attributes:['email','id']
            });
            return user;
        }
        catch (error){
            console.log('Something went wrong at repository level');
            throw error;
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({where:{
                email:userEmail
            }})
            if(!user){
                throw new ClientsError(
                    'AttributesNotFound',
                    'Invalid Email sent in the request',
                    'please check the email,as there is no record of the email',
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
        } catch (error) {
            console.log('Something went wrong at repository level');
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where:{
                    name:'ADMIN'
                }
            });
            return await user.hasRole(adminRole);
        } catch (error) {
            console.log('Something went wrong at repository level');
            throw error;
        }
    }
}

module.exports = UserRepository;