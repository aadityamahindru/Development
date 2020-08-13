
let isPenDown=false;
let undoArr=[];
let redoArr=[];
board.addEventListener("mousedown",function(e){
    ctx.beginPath();
    let x=e.clientX;
    let y=e.clientY;
    let top = getLocation();
    y = Number(y) - top
    console.log("mouse down")
    ctx.moveTo(x,y);
    isPenDown=true;
    let mdp={
        x,
        y,
        id:"md",
        color:ctx.strokeStyle,
        width:ctx.lineWidth
    }
    undoArr.push(mdp)
})
board.addEventListener("mousemove",function(e){
    if(isPenDown){
        let x=e.clientX;
        let y=e.clientY;
        let top = getLocation();
        y = Number(y) - top
        ctx.lineTo(x,y);
        ctx.stroke();
        let mmp={
            x,
            y,
            id:"mm",
            color:ctx.strokeStyle,
            width:ctx.lineWidth
        }
        undoArr.push(mmp)
    }
    
})
board.addEventListener("mouseup",function(e){
    isPenDown=false;
    
})
board.addEventListener("mouseleave",function(e){
    isPenDown=false;
})
function getLocation() {
    let { top } = board.getBoundingClientRect();
    return top;
}
