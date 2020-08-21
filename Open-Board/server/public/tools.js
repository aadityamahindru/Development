ctx.lineWidth=5;
let pencilWidth=5;
let eraserWidth=5;
let isShapeClick = false;
ctx.lineCap = "round";
ctx.lineJoin = 'round';
let pencilColor="black"
let pencilOptions=document.querySelector("#pencil-options")
let eraserOptions=document.querySelector("#eraser-options")
let activeTool='pencil';
function handleTool(tool) {
    if (tool == "pencil") {
        isShapeClick=false;
        if(activeTool=='pencil'&&pencilOptions.classList.contains("show")){
            pencilOptions.classList.remove("show")
        }else if(activeTool=='pencil'){
            pencilOptions.classList.add("show");
        }else{
            ctx.strokeStyle =pencilColor;
            ctx.globalCompositeOperation='source-over';       //default composite
            activeTool="pencil"
            ctx.lineWidth=pencilWidth
            eraserOptions.classList.remove("show")
        }
    } else if (tool == "eraser") {
        if(activeTool=="eraser"&&eraserOptions.classList.contains("show")){
            eraserOptions.classList.remove("show")
        }else if(activeTool=="eraser"){
            eraserOptions.classList.add("show")
        }else{
            //ctx.strokeStyle = "white"
            activeTool="eraser"
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth=eraserWidth
            pencilOptions.classList.remove("show")
        }
    }else if(tool=="sticky"){
        createSticky();
    }else if(tool=="picture"){
        uploadPicture();
    }else if(tool=="undo"){
        undoWork();
    }else if(tool=="redo"){
        redoWork();
    }else if(tool=='download'){
        download();
    }else if(tool=="shape"){
        drawShape();
        activeTool="shape"
    }else if(tool=="line"){
        drawLine();
    }
}
function changeColor(color){
    ctx.strokeStyle=color
    pencilColor=color;
    socket.emit("changeColor", color);
}
// change size
let pencilSlider=document.getElementById("pencil-size")
pencilSlider.addEventListener("change",function(){
    let width=pencilSlider.value;
    ctx.lineWidth=width;
    pencilWidth=width
})
let eraserSlider=document.getElementById("eraser-size")
eraserSlider.addEventListener("change",function(){
    let width=eraserSlider.value;
    ctx.lineWidth=width;
    eraserWidth=width
})