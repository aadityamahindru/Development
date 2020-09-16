const postDB=require("../model/userFollowerModel");
const postModel=require("../model/postModel");
const { create } = require("../model/userModel");
async function createPost(req,res){
    try{
        let nPost=await postModel.create(req.body);
        res.status(201).json({
            success: "successfull",
            post: nPost
        })
    }catch(err){
        res.status(500).json({
            success: "failure",
            "message": err.message
        })
    }
}

 async function getPost(req,res){
    try {
        let { postId } = req.params;
        let post = await postModel.getById(postId);
        if(post==undefined){
            res.status(404).json({
                status: "failure",
                message:"Post not found"
            })
        }
        res.status(200).json({
            status: "post Found",
            post: post
        })

    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}

async function updatePost(req,res){
    let { postId } = req.params;
    let updateObj = req.body;
     //sq=>update
    try{
        const response=await postModel.updateById(postId,updateObj);
        //get
        const post=await postModel.getById(postId);
        // send respone
        res.status(200).json({
            sucess: "sucessful",
            post: post
        })
    }catch(err){
        res.status(500).json({
            sucess: "failure",
            post: err.message
        })
    }
}

async function deletePost(req,res){
    let { postId } = req.params;
    try{
        const dPost=await postModel.deleteById(postId);
        res.status(200).json({
            sucess: "sucessful",
            post: dPost
        })
    }catch(err){
        res.status(500).json({
            sucess: "failure",
            post: err.message
        })
    }
}
module.exports.getPost=getPost;
module.exports.updatePost=updatePost;
module.exports.deletePost=deletePost;
module.exports.createPost=createPost;