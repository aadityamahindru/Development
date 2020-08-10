
let isPenDown=false;
board.addEventListener("mousedown",function(e){
    ctx.beginPath();
    let x=e.clientX;
    let y=e.clientY;
    let top = getLocation();
    y = Number(y) - top
    console.log("mouse down")
    ctx.moveTo(x,y);
    isPenDown=true;
})
board.addEventListener("mousemove",function(e){
    if(isPenDown){
        let x=e.clientX;
        let y=e.clientY;
        let top = getLocation();
        y = Number(y) - top
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    
})
board.addEventListener("mouseup",function(e){
    isPenDown=false;
    
})
function getLocation() {
    let { top } = board.getBoundingClientRect();
    return top;
}
