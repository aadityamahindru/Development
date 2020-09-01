const express=require("express");
const app=express();
const userDB=require("./user.json");
const postDB=require("./post.json")
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
// app.use(express.json());
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
    if(user==undefined){
        return res.status(404).json({
            sucess:"failure",
            message:"user not found"
        })
    }
    for(let key in update){
        user[key]=update[key];
    }
    fs.writeFileSync(path.join(__dirname,"user.json"),JSON.stringify(userDB));
    res.status(200).json({
        sucess:"sucessful",
        user:user!=undefined?user:"not found"
    })
})
app.delete("/api/users/:user_id",function(req,res){
    let{user_id}=req.params;
    let i;
    let user;
    for(i=0;i<userDB.length;i++){
        if(userDB[i].user_id==user_id){
            user=userDB[i];
            break;
        }
    }
    userDB.splice(i,1);
    fs.writeFileSync(path.join(__dirname,"user.json"),JSON.stringify(userDB));
    res.status(200).json({
        sucess:"sucessful",
        user:user!=undefined?user:"not found"
    })
})

//posts
app.post("/api/posts",function(req,res){
    let post=req.body;
    postDB.push(post);
    fs.writeFileSync(path.join(__dirname,"post.json"),JSON.stringify(postDB));
    res.status(201).json({
        sucess:"sucessful",
        post:post
    })
})


app.get("/api/posts/:postId",function(req,res){
    let{postId}=req.params;
    let post;
    for(let i=0;i<postDB.length;i++){
        if(postDB[i].postId==postId){
            post=postDB[i];
            break;
        }
    }
    res.status(200).json({
        status:"success recieved get request from client",
        post:post!=undefined?post:"not found"
    })
})

app.patch("/api/posts/:postId",function(req,res){
    let{postId}=req.params;
    let update=req.body;
    let post;
    for(let i=0;i<postDB.length;i++){
        if(postDB[i].postId==postId){
            post=postDB[i];
            break;
        }
    }
    if(post==undefined){
        return res.status(404).json({
            sucess:"failure",
            message:"post not found"
        })
    }
    for(let key in update){
        post[key]=update[key];
    }
    fs.writeFileSync(path.join(__dirname,"post.json"),JSON.stringify(postDB));
    res.status(200).json({
        sucess:"sucessful",
        post:post!=undefined?post:"not found"
    })
})

app.delete("/api/posts/:postId",function(req,res){
    let{postId}=req.params;
    let i;
    let post;
    for(i=0;i<postDB.length;i++){
        if(postDB[i].postId==postId){
            post=postDB[i];
            break;
        }
    }
    postDB.splice(i,1);
    fs.writeFileSync(path.join(__dirname,"post.json"),JSON.stringify(postDB));
    res.status(200).json({
        sucess:"sucessful",
        post:post!=undefined?post:"not found"
    })
})

app.listen(3000, function () {
    console.log("Server is listening at port 3000");
})