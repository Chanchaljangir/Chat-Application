const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt=require('bcryptjs');
var Schema =mongoose.Schema;
const UserSchema =mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        maxlength:25,
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:6,
    },
    isstatus:{
        type:Boolean,
        default:true
    },
    phone:{
        type:Number
    },
    location:{
        type:String
    },
    address:{
        type:String
    },
    profileImg:{
        type:String
    }
});
const User =module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById= function(id,callback){
    User.findById(id,callback); 
}

module.exports.getUserByEmail=function(email,callback){
    const query={email: email};
    User.findOne(query, callback);
}

module.exports.addUser=function(newUser,callback){
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err, hash)=>{
            if(err) throw err;
            newUser.password=hash; 
            newUser.save(callback);
        });
    });
}
module.exports.comparePassword=function(candidatePasword, hash,callback){
    bcrypt.compare(candidatePasword, hash, (err, isMatch)=>{
        if(err)throw err;
        callback(null, isMatch);
    });
} 

module.exports.updateUserProfile=function(adddata, callback){
    console.log("export profile");
    adddata.save(callback);
}
