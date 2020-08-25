console.log("content se aya hu ");
function replaceImages(){
    let imgPaths = [
        "images/img-1.jpg",
        "images/img-2.jpg",
        "images/img-3.jpg",
        "images/img-4.jpg",
        "images/img-5.jpeg",
        "images/img-6.jpg"
    ];
    let aIP = document.querySelectorAll("img");
    for(let i=0;i<aIP.length;i++){
        let idx=Math.floor(Math.random()*imgPaths.length)
        let fullPath = chrome.extension.getURL(imgPaths[idx]);
        aIP[i].src = fullPath;
    }
}
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender);
        replaceImages()
    })