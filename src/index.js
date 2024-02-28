const express = require('express');
const bodyParser = require('body-parser')

const {PORT} = require('./config/serverConfig');
const db = require('./models/index');
//const {User,Role}=require('./models/index');

const apiRoutes = require('./routes/index');

const app = express();



const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT,async () => {
        console.log(`Server Started at ${PORT}`);

        // const u1 = await User.findByPk(4);
        // const r1 = await Role.findByPk(2);
        //u1.addRole(r1);
        //u1.getRole()//r1.getUser()//u1.hasRole(r1)    

        if(process.env.DB_SYNC){
            db.sequelize.sync ({alter:true});
        }
    })
}

prepareAndStartServer();