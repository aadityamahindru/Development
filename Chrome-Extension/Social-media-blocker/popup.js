const button=document.querySelector("button");
const input=document.querySelector("input");
const list=document.querySelector(".list");
button.addEventListener("click",async function(){
    let val=input.value;
    if(val){
        await sendToBackground(val);
        let div=document.createElement("div");
        div.setAttribute("class","w3-card");
        div.innerHTML=val;
        list.appendChild(div);
        input.value="";
    }
})
function sendToBackground(message){
    return new Promise(function(resolve,reject){
        chrome.runtime.sendMessage(message, function (response) {
            resolve(true);
        });
    })
}
