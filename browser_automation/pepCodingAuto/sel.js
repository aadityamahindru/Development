require("chromedriver")
let swd=require("selenium-webdriver")
//browser build
let fs=require("fs")
let credentialFile=process.argv[2]
let metadataFile=process.argv[3]
let username, password,modulem,lecture,problem,gmodules,glectures,gproblems
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
    let lisTabToBeLocatedPromise = driver.wait(swd.until.elementsLocated(swd.By.css(".lis.tab")), 100000);
}).then(function () {
    let ModulesWillBeSelectedPromise = driver.findElements(swd.By.css(".lis.tab"));
    return ModulesWillBeSelectedPromise;
  }).then(function (modules) {
    gModules = modules
    let moduleTextPromiseArr = [];
    for (let i = 0; i < modules.length; i++) {
      let moduleNamePromise = modules[i].getText();
      moduleTextPromiseArr.push(moduleNamePromise);
    }
    let AllModuleNamesPromise = Promise.all(moduleTextPromiseArr);
    return AllModuleNamesPromise;
  }).then(function (AllModulesText) {
    let i;
    for (i = 0; i < AllModulesText.length; i++) {
      if (AllModulesText[i].includes("Dynamic Programming") == true) {
        break;
      }
    }
    let moduleWillBeclickedPromise = gModules[i].click();
    return moduleWillBeclickedPromise;
  }).then(function(){
      let waitForLectureLoad=driver.wait(swd.until.elementsLocated(swd.By.css(".title.black-text.no-margin")),10000)
  })
.then(function(){
    let loadLecturePromise=driver.findElements(swd.By.css(".title.black-text.no-margin"))
    return loadLecturePromise
}).then(function(lectures)
{
    glectures=lectures
    let lectureArr=[]
    for(let j=0;j<lectures.length;j++)
    {
        let lectureName=lectures[j].getText()
        lectureArr.push(lectureName)
    }
    let lectureResult=Promise.all(lectureArr)
    return lectureResult
}).then(function(allLectures){
    let j;
    for(j=0;j<allLectures.length;j++)
    {
        if(allLectures[j].includes("Dynamic Programming and Greedy")==true)
        {
            break;
        }
    }
    let lectureClicked=glectures[j].click();
    return lectureClicked
}).then(function(){
    let waitForProblemLoad=driver.wait(swd.until.elementsLocated(swd.By.css(".collection-item.no-margin.searchRow")),1000)
}).then(function(){
    let loadProblemPromise=driver.findElements(swd.By.css(".collection-item.no-margin.searchRow"))
    return loadProblemPromise
})
.then(function(problems){
    gproblems=problems
    let problemArr=[]
    for(let k=0;k<problems.length;k++)
    {
        let problemName=problems[k].getText()
        problemArr.push(problemName)
    }
    let allProblems=Promise.all(problemArr)
    return allProblems
}).then(function(allProblemsName){
    let k;
    for(k=0;k<allProblemsName.length;k++)
    {
        if(allProblemsName[k].includes("Goldmine")==true)
        {
            break;
        }
    }
    let problemWillBeClicked=gproblems[k].click();
    return problemWillBeClicked
})
.then(function(){
 let editorPromise=driver.wait(swd.until.elementLocated(swd.By.css(".tab.bold.editorTab")))
}).then(function(){
    let editorWillBePromised=driver.findElement(swd.By.css(".tab.bold.editorTab"))
    return editorWillBePromised
}).then(function(editorClick){
    let editorOpenedPromise=editorClick.click();
    return editorOpenedPromise
})
.then(function(){
    let inputCode=driver.findElement(swd.By.css("#customInput"))
    return inputCode
}).then(function(inputArea){
    let inputEntered=inputArea.sendKeys("bsfbbbjdfbjh");
    return inputEntered
})
.then(function(){
    let inputCode=driver.findElement(swd.By.css("#customInput"))
    return inputCode
})
.then(function(inputArea){
    let inputEntered=inputArea.sendKeys(swd.Key.CONTROL+"a");
    return inputEntered
})
.then(function(){
    let inputCode=driver.findElement(swd.By.css("#customInput"))
    return inputCode
})
.then(function(inputArea){
    let inputEntered=inputArea.sendKeys(swd.Key.CONTROL+"x");
    return inputEntered
})
.then(function(){
    let editorArea=driver.findElement(swd.By.css(".ace_text-input"))
    return editorArea
})
.then(function(editorArea){
   let codeEntered =editorArea.sendKeys(swd.Key.CONTROL+"a")
   return codeEntered
}).then(function(){
    driver.navigate().back();
    driver.navigate().back();
})
.catch(function(err){
    console.log(err)
})
