const postDB=require("../model/post.json");
function createPost(req,res){
    let post=req.body;
    postDB.push(post);
    fs.writeFileSync(path.join(__dirname,"post.json"),JSON.stringify(postDB));
    res.status(201).json({
        sucess:"sucessful",
        post:post
    })
}

function getPost(req,res){
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
}

function updatePost(req,res){
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
}

function deletePost(req,res){
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
}
module.exports.getPost=getPost;
module.exports.updatePost=updatePost;
module.exports.deletePost=deletePost;
module.exports.createPost=createPost;