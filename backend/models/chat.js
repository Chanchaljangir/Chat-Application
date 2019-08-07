const mongoose = require('mongoose');
const ChatSchema =mongoose.Schema({
    user:{
        type:String
    },
    msg:{
        type:String
    },
    Date:{
        type: Date, 
        default: Date.now
    },
    Group_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }
});
const Chat =module.exports = mongoose.model('Chat',ChatSchema);