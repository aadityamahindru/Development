require("chromedriver")
let swd=require("selenium-webdriver")
//browser build
let fs=require("fs")
let credentialFile=process.argv[2]
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
})
.then(function(){
    //search email input 
    let emailWillBeSelectedPromise=driver.findElement(swd.By.css("input[type=email]"))
    return emailWillBeSelectedPromise
}).then(function(emailElement)
{
    let emailEnteredPromise=emailElement.sendKeys(username)
    return emailEnteredPromise
}).then(function()
{
    let passwordWillBeSelectedPromise=driver.findElement(swd.By.css("input[type=password]"))
    return passwordWillBeSelectedPromise
}).then(function(passwordVal)
{
    let passwordEnteredPromise=passwordVal.sendKeys(password)
    return passwordEnteredPromise
}).then(function()
{
    let submitBtnWillBeClickedPromise=driver.findElement(swd.By.css("button[type=submit]"))
    return submitBtnWillBeClickedPromise
}).then(function(submitbtn)
{
    let submitBtnClicked=submitbtn.click();
    return submitBtnClicked;
}).then(function(){
    console.log("sucess")
}).catch(function(err){
    console.log(err)
})