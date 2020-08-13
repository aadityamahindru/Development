function undoWork(){
    if(undoArr.length==0){
        return;
    }
    for(let i=undoArr.length-1;i>=0;i--){
        let {id}=undoArr[i];
        if(id=="md"){
            redoArr.push(undoArr.pop());
            break;
        }else{
            redoArr.push(undoArr.pop());
        }
    }
    ctx.clearRect(0,0,board.width,board.height);
    redraw();
}
function redoWork(){
    if(redoArr.length==0){
        return;
    }
    undoArr.push(redoArr.pop());
    for(let i=redoArr.length-1;i>=0;i--){
        let {id}=redoArr[i];
        if(id=="md"){
            break;
        }else{
            undoArr.push(redoArr.pop());
        }
    }
    ctx.clearRect(0,0,board.width,board.height);
    redraw();
}
function redraw(){
    for(let i=0;i<undoArr.length;i++){
        let{x,y,id,color,width}=undoArr[i];
        ctx.strokeStyle=color;
        ctx.lineWidth=width;
        if(id=="md"){
            ctx.beginPath();
            ctx.moveTo(x,y);
        }else{
            ctx.lineTo(x,y);
            ctx.stroke();
        }
    }
}