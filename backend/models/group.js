const mongoose = require('mongoose');
const GroupSchema =mongoose.Schema({
    groupName:{
        type:String,
        required:[true,'Group Name is required'],
        maxlength:25, 
    }
});
const Group =module.exports = mongoose.model('Group',GroupSchema);