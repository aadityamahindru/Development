const userModel = require("../model/userModel");
const userFollowerModel=require("../model/userFollowerModel");
async function getUser(req, res) {
    try {
        let { user_id } = req.params;
        let user = await userModel.getById(user_id);
        if(user==undefined){
            res.status(404).json({
                status: "failure",
                message:"User not found"
            })
        }
        res.status(200).json({
            status: "User Found",
            user: user
        })

    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}

async function createUser(req, res) {
    try {
        let newUser = await userModel.create(req.body);
        res.status(201).json({
            sucess: "sucessful",
            user: newUser
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
 async function updateUser(req, res) {
    let { user_id } = req.params;
    let updateObj = req.body;
    if (req.file) {
        img = req.file.filename;
        updateObj.p_img_url = img;
    }
     //sq=>update
    try{
        const response=await userModel.updateById(user_id,updateObj);
        //get
        const user=await userModel.getById(user_id);
        // send respone
        res.status(200).json({
            sucess: "sucessful",
            user: user
        })
    }catch(err){
        res.status(500).json({
            sucess: "failure",
            user: err.message
        })
    }
    
}

async function deleteUser(req, res) {
    let { user_id } = req.params;
    try{
        const dUser=await userModel.deleteById(user_id);
        res.status(200).json({
            sucess: "sucessful",
            user: dUser
        })
    }catch(err){
        res.status(500).json({
            sucess: "failure",
            user: err.message
        })
    }
}
//   ===========Request====================
async function handleRequest(req,res){
    try{
        let reqObj=req.body;
        let{is_public}=await userModel.getById(reqObj.user_id);
        if(is_public==true){
            reqObj.is_pending=false;
            let mappingObj=await userFollowerModel.createRequest(reqObj);
            return res.status(200).json({
                status: "accepted",
                request: mappingObj,
                message:"Your request has been accepted"
            })
        }
        let mappingObj=await userFollowerModel.createRequest(reqObj);
        res.status(200).json({
            status: "pending",
            request: mappingObj,
            "message":"Your request is pending"
        })
    }catch(err){
        res.status(500).json({
            sucess: "failure",
            "message": err.message
        })
    }
}
async function acceptRequest(req,res){
    try{
        let{user_id,follower_id}=req.params;
        let{handle}=await userModel.getById(follower_id);
        await userFollowerModel.acceptRequestQ(user_id,follower_id);
        res.status(200).json({
            status: "sucessfull",
            message:`${handle} started following you.`
        })
    }catch(err){
        res.status(500).json({
            sucess: "failure",
            "message": err.message
        })
    }
}
async function rejectRequest(req,res){
    try{
        let{user_id,follower_id}=req.params;
        let{handle}=await userModel.getById(follower_id);
        await userFollowerModel.rejectRequestQ(user_id,follower_id);
        res.status(200).json({
            status: "sucessfull",
            message:`${handle} rejected`
        })
    }catch(err){
        res.status(500).json({
            sucess: "failure",
            "message": err.message
        })
    }
}

async function getAllFollowers(req,res){
    try{
        let{user_id}=req.params;
        let uFollowerObj=await userFollowerModel.getAllFollId(user_id);
        if(uFollowerObj.length!=0){
            async function helper(userFollowerObj){
                let{follower_id,is_pending}=userFollowerObj;
                let{handle,p_img_url}=await userModel.getById(follower_id);
                return {handle,p_img_url,is_pending};
            }
            let follImgHandArr=[];
            for(let i=0;i<uFollowerObj.length;i++){
                let ans= await helper(uFollowerObj[i]);
                follImgHandArr.push(ans);
            }
            res.status(201).json({
                status: "sucessfull",
                message:follImgHandArr
            })
        }else{
            res.status(201).json({
                status: "sucessfull",
                message:"No user found"
            })
        }
    }catch(err){
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
module.exports.handleRequest=handleRequest;
module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.acceptRequest=acceptRequest;
module.exports.rejectRequest=rejectRequest
module.exports.getAllFollowers=getAllFollowers;