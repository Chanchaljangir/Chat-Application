const Chat = require('../models/chat');
module.exports ={
    startChat : async(req,res)=>{ 
        try{   
            let newMsg = new Chat(req.body);
            const result = await newMsg.save();
            result ? res.status(200).send({success:true,message:'chat start sussefully',res:result
            }):
            res.status(422).send({success:false,
                message:'chat not start',res:result
            });
        }catch(err){
            console.log("catch err is.....",err);
            res.send(err);
        }
    },
    getChat: async(req,res)=>{
        try{
            const result =await Chat.find();
            console.log('result',result);
            result ? res.status(200).send({
                success:true,message:"all perivious chats",res:result
            }):
            res.status(422).send({
                success:false,message:'not getting any chat'
            });
        }catch(err){
            console.log(err);
            res.send(err);
        }
    }
}
