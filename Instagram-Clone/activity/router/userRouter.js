const express=require("express");
const userRouter = new express.Router();
let { createUser, updateUser, deleteUser, getUser, handleRequest, acceptRequest, rejectRequest, getAllFollowers}=require("../controller/userController")

userRouter.post("/",createUser);

userRouter.route("/:user_id").get(getUser).patch(updateUser).delete(deleteUser);
userRouter.route("/fr").post(handleRequest);
userRouter.route("/fr/:user_id").get(getAllFollowers)
userRouter.route("/fr/:user_id/:follower_id").patch(acceptRequest).delete(rejectRequest);
module.exports=userRouter