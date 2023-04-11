import initMongoose from "@/Mongoose/MongoDb";
import UserModel from "@/models/user";


export default async function handler(req,res){
    initMongoose();
    const {id , newUsername} = req.body;
    
    if(req.method === "GET" ){
        const {id} = req.query;
        if(id){
            const userDoc = await UserModel.findById(id)
            res.json({userDoc});
            res.end();
        }
    }

    if(req.method === 'PUT'){
        if(id && newUsername){
            await UserModel.findByIdAndUpdate(id,{
                username:newUsername
            })
            res.json({success:true,id:id,user:newUsername});
            res.end();
        }
    }
}