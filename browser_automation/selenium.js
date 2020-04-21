require("chromedriver")
let swd=require("selenium-webdriver")
//browser build
let fs=require("fs")
let credentialFile=process.argv[2]
let metadataFile=process.argv[3]
let username, password
let bldr=new swd.Builder();
//tab
let driver=bldr.forBrowser("chrome").build();
let credentialfileWillBeReadPromise=fs.promises.readFile(credentialFile)
.then(function(credentials)
{
    credentials=JSON.parse(credentials)
    username=credentials.username
    password=credentials.password
    let googlePageWillOpenPromise=driver.get("https://pepcoding.com/login")
}).then(function(){
    //search email input 
    let emailWillBeSelectedPromise=driver.findElement(swd.By.css("input[type=email]"))
    let passwordWillBeSelectedPromise=driver.findElement(swd.By.css("input[type=password]"))
    let combinedSelect=Promise.all([emailWillBeSelectedPromise,passwordWillBeSelectedPromise])
    return combinedSelect
}).then(function(elementArray)
{
    let emailEnteredPromise=elementArray[0].sendKeys(username)
    let passwordEnteredPromise=elementArray[1].sendKeys(password)
    let combinedInput=Promise.all([emailEnteredPromise,passwordEnteredPromise])
    return combinedInput
}).then(function()
{
    let submitBtnWillBeClickedPromise=driver.findElement(swd.By.css("button[type=submit]"))
    return submitBtnWillBeClickedPromise
}).then(function(submitbtn)
{
    let submitBtnClicked=submitbtn.click();
    return submitBtnClicked;
}).then(function(){
let willWaitForResourcesToLoad=driver.wait(swd.until.elementsLocated(swd.By.css(".resource a")))
return willWaitForResourcesToLoad
}).then(function(){
    let resourcePageLinkPromise=driver.findElement(swd.By.css(".resource a"))
    return resourcePageLinkPromise
}).then(function(resourcePageAncor){
    let resourceLinkAnchor=resourcePageAncor.getAttribute("href")
    return resourceLinkAnchor
}).then(function(rLink){
let rLinkPromise=driver.get(rLink);
}).then(function(){
let siteOverlayPromise=driver.findElement(swd.By.css("#siteOverlay"))
return siteOverlayPromise
}).then(function(soe){
    let siteOverlayRemovePromise=driver.wait(swd.until.elementIsNotVisible(soe),10000)
    return siteOverlayRemovePromise
}).then(function(){
    let courseLocatedPromise=driver.findElement(swd.By.css("#courseCard33"))
    return courseLocatedPromise
}).then(function(courseClick){
    let courseClickPromise=courseClick.click();
    return courseClickPromise
}).then(function(){
    let metadataReadPromise=fs.promises.readFile(metadataFile)
    return metadataReadPromise
}).then(function(metadata){
    metadata=JSON.parse(metadata);
    let ques=metadata[0]
    let quesOpenPromise=driver.get(ques.url)
    return quesOpenPromise
}).then(function(){
    console.log("Sucess")
})
.catch(function(err){
    console.log(err)
})