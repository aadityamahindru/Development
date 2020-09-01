const userDB=require("../model/user.json")
function getUser(req,res){
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
}

function createUser(req,res){
    let user=req.body;
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname,"user.json"),JSON.stringify(userDB));
    res.status(201).json({
        sucess:"sucessful",
        user:user
    })
}

function updateUser(req,res){
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
}

function deleteUser(req,res){
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
}
module.exports.createUser=createUser;
module.exports.getUser=getUser;
module.exports.deleteUser=deleteUser;
module.exports.updateUser=updateUser;