const Group = require('../models/group');
module.exports ={
    addGroup : async(req,res)=>{
        try{
            let newGroup = new Group(req.body);
            const result = await newGroup.save();
            result ? res.status(200).send({success:true,message:'Group is created sussefully',res:result
            }):
            res.status(422).send({success:false,
                message:'group fail to create',res:result
            });
        }catch(err){
            console.log("catch err is.....",err);
            res.send(err);
        }
    },
    getGroup: async(req,res)=>{
        try{
            const result =await Group.find();
            console.log('result',result);
            result ? res.status(200).send({
                success:true,message:"all Groups",res:result
            }):
            res.status(422).send({
                success:false,message:'not getting any group'
            });
        }catch(err){
            console.log(err);
            res.send(err);
        }
    }
}
