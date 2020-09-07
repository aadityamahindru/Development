const express=require("express");
const userRouter = new express.Router();
let { createUser, updateUser, deleteUser, getUser, handleRequest}=require("../controller/userController")

userRouter.post("/",createUser);

userRouter.route("/:user_id").get(getUser).patch(updateUser).delete(deleteUser);
userRouter.route("/fr").post(handleRequest);
module.exports=userRouter