const express=require("express");
const app=express();
const userDB=require("./user.json");
const fs=require("fs");
const path=require("path");
// create ==> post
app.use(express.json());
app.post("/api/users",function(req,res){
    let user=req.body;
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname,"user.json"),JSON.stringify(userDB));
    res.status(201).json({
        sucess:"sucessful",
        user:user
    })
})
//read
app.get("/api/users/:user_id",function(req,res){
    let{user_id}=req.params;
    let user;
    for(let i=0;i<userDB.length;i++){
        if(userDB[i].user_id==user_id){
            user=userDB[i];
            break;
        }
    }
    res.status(200).json({
        status:"success recieved get request from client",
        user:user!=undefined?user:"not found"
    })
})
// update => patch
app.use(express.json());
app.patch("/api/users/:user_id",function(req,res){
    let{user_id}=req.params;
    let update=req.body;
    let user;
    for(let i=0;i<userDB.length;i++){
        if(userDB[i].user_id==user_id){
            user=userDB[i];
            break;
        }
    }
    
})
app.listen(3000, function () {
    console.log("Server is listening at port 3000");
})