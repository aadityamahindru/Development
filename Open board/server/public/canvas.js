
let isPenDown = false;
let undoArr = [];
let redoArr = [];
board.addEventListener("mousedown", function (e) {
    ctx.beginPath();
    let x = e.clientX;
    let y = e.clientY;
    let top = getLocation();
    y = Number(y) - top
    ctx.moveTo(x, y);
    isPenDown = true;
    let mdp = {
        x,
        y,
        id: "md",
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    }
    socket.emit("md", mdp);
    undoArr.push(mdp)
})
board.addEventListener("mousemove", function (e) {
    if (isPenDown && !isShapeClick) {
        //emptyRedo();
        let x = e.clientX;
        let y = e.clientY;
        let top = getLocation();
        y = Number(y) - top
        ctx.lineTo(x, y);
        ctx.stroke();
        let mmp = {
            x,
            y,
            id: "mm",
            shape:false,
            color: ctx.strokeStyle,
            width: ctx.lineWidth
        }
        undoArr.push(mmp)
        socket.emit("mm", mmp);
    }

})

// function emptyRedo(){
//     while(redoArr.length>0){
//         undoArr.push(redoArr.pop());
//     }
// }
board.addEventListener("mouseup", function (e) {
    isPenDown = false;

})
board.addEventListener("mouseleave", function (e) {
    isPenDown = false;
})
function getLocation() {
    let { top } = board.getBoundingClientRect();
    return top;
}
// let oldX=0,oldY=0;
// document.body.addEventListener("click",function(me){
//         document.body.addEventListener("keydown",function(e){
//             if(((e.keyCode>=65&&e.keyCode<=90)||(e.keyCode>=48&&e.keyCode<=57))&&(oldX!=me.pageX&&oldY!=me.pageY)){
//                 console.log(e);
//                 createSticky();
//                 if(oldX!=me.pageX&&oldY!=me.pageY){
//                     oldX=me.pageX;
//                     oldY=me.pageY;
//                 }
//                 console.log(oldX+" "+me.pageX+"   "+oldY+"  "+me.pageY)
//             }
//         })
// })


//draw shape

function drawShape() {
    let initialX, initialY;
    isShapeClick = true;
    board.addEventListener("mousedown", function (e) {
        if(isShapeClick)
        document.querySelector("canvas").classList.add("cursor")
        initialX = e.clientX;
        initialY = e.clientY;
        let top = getLocation();
        initialY = Number(initialY) - top
    })
    board.addEventListener("mouseup", function (e) {
        if (isShapeClick) {
            let finalX = e.clientX;
            let finalY = e.clientY;
            let top = getLocation();
            finalY = Number(finalY) - top
            ctx.beginPath();
            ctx.rect(initialX, initialY, finalX - initialX, finalY - initialY);
            ctx.stroke();
            document.querySelector("canvas").classList.remove("cursor");
        }
    })
}

// function drawLine(){
//     let initialX, initialY;
//     isShapeClick = true;
//     board.addEventListener("mousedown", function (e) {
//         initialX = e.clientX;
//         initialY = e.clientY;
//         let top = getLocation();
//         initialY = Number(initialY) - top
//     })
//     board.addEventListener("mouseup", function (e) {
//         if (isShapeClick) {
//             let finalX = e.clientX;
//             let finalY = e.clientY;
//             let top = getLocation();
//             finalY = Number(finalY) - top
//             ctx.beginPath();
//             ctx.moveTo(initialX,initialY);
//             console.log(initialX+" "+finalX+"  "+initialY+" "+finalY)
//             ctx.lineTo(initialX, finalY - initialY);
//             ctx.stroke();
//             isShapeClick = false;
//         }
//     })

// }
