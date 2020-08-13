let imageUploader=document.getElementById("picture-upload")
function uploadPicture(){
    imageUploader.click();
    imageUploader.addEventListener("change",function(){
     let imgObj=imageUploader.files[0];
     let imgLink=URL.createObjectURL(imgObj);
     let img=document.createElement("img");
     img.src=imgLink;
     document.body.appendChild(img);
 })
}
function download(){
    let a=document.createElement("a");
    a.download="canvas.png";
    let url=board.toDataURL("image/png;base64");
    a.href=url;
    a.click();
    a.remove();
}