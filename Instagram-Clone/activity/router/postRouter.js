const express=require("express");
const postRouter=new express.Router();

let { createPost, updatePost, deletePost, getPost }=require("../controller/postController");

postRouter.post("/",createPost);

postRouter.route("/:postId").get(getPost).patch(updatePost).delete(deletePost);

module.exports=postRouter;