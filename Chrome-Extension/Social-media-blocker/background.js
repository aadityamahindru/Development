let blockedSites=[];
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        blockedSites.push({url:request,time:10});
        console.log(blockedSites)
        sendResponse("sucess");
})
async function init(){
    if(blockedSites.length>0){
        let tab=await getCurrentTab();
        if(tab){
            let cTabUrl=tab.url;
            for(let i=0;i<blockedSites.length;i++){
                let isMatching=cTabUrl.includes(blockedSites[i].url);
                if(isMatching){
                    chrome.browserAction.setBadgeText({ text: blockedSites[i].time + "" });
                    blockedSites[i].time--;
                    console.log("time remaining: "+blockedSites[i].time);
                    if(blockedSites[i].time<=0){
                        closeTab(tab.id);
                        chrome.browserAction.setBadgeText({ text:  "" });
                    }
                }
            }
        }
    }
}
function getCurrentTab(){
    return new Promise(function(resolve,reject){
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            resolve(tabs[0]);
        })
    })
}
function closeTab(id){
    return new Promise(function(resolve,reject){
        chrome.tabs.remove(id, function () {
            resolve();
        });
    })
}
setInterval(init,1000);