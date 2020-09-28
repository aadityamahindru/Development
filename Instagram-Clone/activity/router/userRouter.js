const express=require("express");
const userRouter = new express.Router();
const multer=require("multer");
let { createUser, updateUser, deleteUser, getUser, handleRequest, acceptRequest, rejectRequest, getAllFollowers}=require("../controller/userController")

//multer for image upload
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+".jpeg");
    }
})
const fileFilter=function(req,file,cb){
    if(file.mimetype.startsWith("image")){
        cb(null,true);
    }else{
        cb(new Error("Not an image"));
    }
}
const upload=multer({
    storage:storage,
    fileFilter:fileFilter
})


userRouter.post("/",createUser);

userRouter.route("/:user_id").get(getUser).patch(upload.single("photo"),updateUser).delete(deleteUser);
userRouter.route("/fr").post(handleRequest);
userRouter.route("/fr/:user_id").get(getAllFollowers)
userRouter.route("/fr/:user_id/:follower_id").patch(acceptRequest).delete(rejectRequest);
module.exports=userRouter