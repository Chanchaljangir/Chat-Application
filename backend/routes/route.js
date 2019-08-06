const express =require('express');
const router = express();
const config=require('../config/database');
const passport=require('passport');
const jwt=require('jsonwebtoken');
// const User= require('../models/user');
// const Quiz=require('../models/class');
const bcrypt=require('bcryptjs');
// var quiz=require('../controllers/quiz');
const User= require('../controllers/user');
const Group= require('../controllers/group');

// Register User
router.route('/signup').post(User.addUser);
router.route('/getusers').get(User.getUsers);

//create new group
router.route('/addgroup').post(Group.addGroup);
router.route('/getgroup').get(Group.getGroup);

//User Login
// router.route('/authenticate').post(User.Authenticate);

//Autheticate login user
router.post('/authenticate', (req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    console.log("login password is: ",password);
    console.log("passssssss: ",User.password);
    User.getUserByEmail(email, (err, user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg:'User not found, try again'});
        }
        User.comparePassword(password, user.password,(err,isMatch)=>{
            if(err){
               throw err; 
            }  
            console.log("user pass  ",user.password);
            console.log(password);
            console.log("dhgfghjfjgkj  ",isMatch);
            if(isMatch){
                
                const token=jwt.sign(user.toJSON(),config.secret,{
                    expiresIn: 604800 //1 week 
                });
                res.json({
                    success:true,
                    token:'JWT '+ token,     
                    user:{
                        id:user._id,
                        username:user.username,
                        email:user.email
                    }
                });
                
            }
            else{
                return res.json({success:false, msg:'Wrong Password'});
            }
        });

    });
});


module.exports = router; 