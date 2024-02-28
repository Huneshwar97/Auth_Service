const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req,res) => {
    try{
        const response = await userService.create({
            email:req.body.email,
            password:req.body.password
        }); 
        return res.status(200).json({
            data:response,
            success:true,
            message:'Successfully created a user',
            err:{}
        })
    }
    catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            data:{},
            success:false,
            message:error.message,
            err:error.explanation
        })

    }
}

const signIn = async (req,res) =>   {
    try {
        const response = await userService.signIn(req.body.email,req.body.password)
        return res.status(200).json({
            data:response,
            success:true,
            message:'Successfully signed In',
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            data:{},
            success:false,
            message:error.message,
            err:error.explanation
        })
    }
}

const isAuthenticated = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data:response,
            success:true,
            message:'user is authenticated and token is verified',
            err:{}
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Not able to signIn',
            err:error
        })
    }
}

const isAdmin = async (req,res) => {
    try {
        const response =  await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data:response,
            success:true,
            message:'Successfully fetched whether user is Admin or not',
            err:{}
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:'Something went wrong',
            err:error
        })
    }
}
module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}