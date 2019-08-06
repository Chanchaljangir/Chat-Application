const User = require('../models/user');
const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
module.exports ={
    addUser : async(req,res)=>{
        try{
            let newUser = new User(req.body);
            
            
            const password = newUser.password
            const saltRounds = 10;
          newUser.password = await bcrypt.hash(password,10);
            console.log("hashed passs ...........",newUser.password);

            const result= await newUser.save();
            const token=jwt.sign(newUser.toJSON(),config.secret,{
                expiresIn: 604800 //1 week 
            });
            result ? res.status(200).send({
               
                success:true,message:'user registered',res:({token:'JWT '+ token,     
                             user:{
                                 id:newUser._id,
                                 username:newUser.username,
                                 email:newUser.email
                             }})
            }):
            res.status(422).send({success:false,
                message:'fail to register',res:result      
    });
}
catch(err){
            console.log(err);
            res.send(err);
        }
},

// user authentication
// authenticate: async(req,res)=>{
//     try{
//         const email=req.body.email;
//         const password=req.body.password;
//         console.log("login password is: ",password);
//         console.log("passssssss: ",User.password);
//     }
//     catch{

//     }
// }
}

//     User.getUserByEmail(email, (err, user)=>{
//         if(err) throw err;
//         if(!user){
//             return res.json({success: false, msg:'User not found, try again'});
//         }
//         User.comparePassword(password, user.password,(err,isMatch)=>{
//             if(err){
//                throw err; 
//             }  
//             console.log("user pass  ",user.password);
//             console.log(password);
//             console.log("dhgfghjfjgkj  ",isMatch);
//             if(isMatch){
                
//                 const token=jwt.sign(user.toJSON(),config.secret,{
//                     expiresIn: 604800 //1 week 
//                 });
//                 res.json({
//                     success:true,
//                     token:'JWT '+ token,     
//                     user:{
//                         id:user._id,
//                         username:user.username,
//                         email:user.email
//                     }
//                 });
                
//             }
//             else{
//                 return res.json({success:false, msg:'Wrong Password'});
//             }
//         });

//     });
// });




module.exports.getUserByEmail=function(email,callback){
    const query={email: email};
    User.findOne(query, callback);
}
module.exports.comparePassword=function(candidatePasword, hash,callback){
    bcrypt.compare(candidatePasword, hash, (err, isMatch)=>{
        if(err)throw err;
        callback(null, isMatch);
    });
} 

