const express=require("express");
const app=express();
const httpServer=require("http").createServer(app);
const socketServer=require("socket.io")(httpServer);
app.use(express.static("public"));
socketServer.on("connection",function(socket){
    console.log("New Connection");
    console.log(socket.id);
    socket.on("changeColor", function (color) {
        socket.broadcast.emit("colorChange",color);
    })
    socket.on("md", function (point) {
        console.log(point);
        socket.broadcast.emit('onmd', point);
    })
    socket.on("mm", function (point) {
        console.log(point);
        socket.broadcast.emit('onmm', point);
    })

})
// app.get("/home",function(req,res){
//     res.sendFile(path.join(__dirname,"public/index.html"));
// })
httpServer.listen(3000,function(){
    console.log("Sever is listening to request");
})