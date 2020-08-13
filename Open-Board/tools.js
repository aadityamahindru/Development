ctx.lineWidth=5;
let pencilWidth=5;
let eraserWidth=5;
let pencilOptions=document.querySelector("#pencil-options")
let eraserOptions=document.querySelector("#eraser-options")
let activeTool='pencil';
function handleTool(tool) {
    if (tool == "pencil") {
        if(activeTool=='pencil'&&pencilOptions.classList.contains("show")){
            pencilOptions.classList.remove("show")
        }else if(activeTool=='pencil'){
            pencilOptions.classList.add("show");
        }else{
            ctx.strokeStyle = "black";
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
            ctx.strokeStyle = "white"
            activeTool="eraser"
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
    }
}
function changeColor(color){
    ctx.strokeStyle=color
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