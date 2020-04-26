require("chromedriver")
let swd = require("selenium-webdriver")
//browser build
let fs = require("fs")
let credentialFile = process.argv[2]
let metadataFile = process.argv[3]
let username, password
let bldr = new swd.Builder();
//tab
let driver = bldr.forBrowser("chrome").build();
let credentialfileWillBeReadPromise = fs.promises.readFile(credentialFile)
    .then(function (credentials) {
        credentials = JSON.parse(credentials)
        username = credentials.username
        password = credentials.password
        let googlePageWillOpenPromise = driver.get("https://pepcoding.com/login")
    })
    .then(function () {
        let WillBeSetPromise = driver.manage().setTimeouts({
          implicit: 10000
        })
        return WillBeSetPromise;
      })
    .then(function () {
        //search email input 
        let emailWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=email]"))
        let passwordWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"))
        let combinedSelect = Promise.all([emailWillBeSelectedPromise, passwordWillBeSelectedPromise])
        return combinedSelect
    }).then(function (elementArray) {
        let emailEnteredPromise = elementArray[0].sendKeys(username)
        let passwordEnteredPromise = elementArray[1].sendKeys(password)
        let combinedInput = Promise.all([emailEnteredPromise, passwordEnteredPromise])
        return combinedInput
    }).then(function () {
        let submitBtnWillBeClickedPromise = driver.findElement(swd.By.css("button[type=submit]"))
        return submitBtnWillBeClickedPromise
    }).then(function (submitbtn) {
        let submitBtnClicked = submitbtn.click();
        return submitBtnClicked;
    }).then(function () {
        let willWaitForResourcesToLoad = driver.wait(swd.until.elementsLocated(swd.By.css(".resource a")))
        return willWaitForResourcesToLoad
    }).then(function () {
        let resourcePageLinkPromise = driver.findElement(swd.By.css(".resource a"))
        return resourcePageLinkPromise
    }).then(function (resourcePageAncor) {
        let resourceLinkAnchor = resourcePageAncor.getAttribute("href")
        return resourceLinkAnchor
    }).then(function (rLink) {
        let rLinkPromise = driver.get(rLink);
    }).then(function () {
        let siteOverlayPromise = driver.findElement(swd.By.css("#siteOverlay"))
        return siteOverlayPromise
    }).then(function (soe) {
        let siteOverlayRemovePromise = driver.wait(swd.until.elementIsNotVisible(soe), 10000)
        return siteOverlayRemovePromise
    }).then(function () {
        let courseLocatedPromise = driver.findElement(swd.By.css("#courseCard33"))
        return courseLocatedPromise
    }).then(function (courseClick) {
        let courseClickPromise = courseClick.click();
        return courseClickPromise
    }).then(function () {
        let metadataReadPromise = fs.promises.readFile(metadataFile)
        return metadataReadPromise
    }).then(function (metadata) {
        metadata = JSON.parse(metadata);
        let ques = metadata[2]
        let quesOpenPromise = goToQuestionPage(ques)
        return quesOpenPromise
    }).then(function () {
       driver.quit();
    })
    .catch(function (err) {
        console.log(err)
    })
    function goToQuestionPage(question) {
        // resource page 
        let data,inputBox,editorBox;
          return new Promise(function (resolve, reject) {
            let waitPromise = willWaitForOverlay();
            waitPromise
              .then(function () {
                let willClickModule = navigationHelper(question.module, ".lis.tab");
                return willClickModule;
              }).then(willWaitForOverlay)
              .then(function () {
                let willClickLecture = navigationHelper(question.lecture, ".collection-item");
                return willClickLecture;
              }).then(willWaitForOverlay)
              .then(function () {
                let willClickQuestion = navigationHelper(question.problem, ".collection-item");
                return willClickQuestion;
              }).then(willWaitForOverlay)
            .then(function(){
                   let editorWillBePromised=driver.findElement(swd.By.css(".tab.bold.editorTab"))
                   return editorWillBePromised
               }).then(function(editorClick){
                   let editorOpenedPromise=editorClick.click();
                   return editorOpenedPromise
               })
               .then(function(){
                   let content =fs.promises.readFile(question.path)
                   return content
               })
               .then(function(content){
                data=content;
                let inputCode=driver.findElement(swd.By.css("#customInput"))
                return inputCode
            }).then(function(inputArea){
                inputBox=inputArea
                let inputEntered=inputArea.sendKeys(data+"");
                return inputEntered
            })
            .then(function(){
                let inputEntered=inputBox.sendKeys(swd.Key.CONTROL+"a");
                return inputEntered
            })
            .then(function(){
                let inputEntered=inputBox.sendKeys(swd.Key.CONTROL+"x");
                return inputEntered
            })
            .then(function(){
                let editorArea=driver.findElement(swd.By.css(".ace_text-input"))
                return editorArea
            })
            .then(function(editorArea){
                editorBox=editorArea
               let codeEntered =editorArea.sendKeys(swd.Key.CONTROL+"a")
               return codeEntered
            }).then(function(){
                let codeEntered=editorBox.sendKeys(swd.Key.CONTROL+"v")
                return codeEntered
            }).then(function(){
                let submitBtn=driver.findElement(swd.By.css("#submitCode"))
                return submitBtn
            }).then(function(sb){
                let submitClick=sb.click();
                return submitClick
            })
            .then(function(){
              let outputs=driver.findElements(swd.By.css(".indicator.fa.fa-arrow-down.cyan-text"))
              let actualOp=driver.findElements(swd.By.css(".indicator.fa.fa-arrow-down.blue-text.text-lighten-3"))
              let combinedOp=Promise.all([outputs,actualOp])
              return combinedOp
            }).then(function(combinedOp){
              let outputClick,actualOpClick;
             let outputs=combinedOp[0]
             let actualOp=combinedOp[1]
              for(let i=1;i<outputs.length;i++)
              {
                outputClick=outputs[i].click();
              }
              for(let i=1;i<actualOp.length;i++)
              {
                actualOpClick=actualOp[i].click();
              }
              let combined=Promise.all([outputClick,actualOpClick])
              return combined
            })
              .then(function () {
                resolve();
              }).catch(function () {
                reject();
              })
          })
        
        }
        function willWaitForOverlay() {
          let waitTillPromiseIsDismissed = new Promise(function (resolve, reject) {
            //  let us assume done is working
            // search overlay 
            let waitForsoe = driver.wait(swd.until.elementLocated(swd.By.css("#siteOverlay")));
            waitForsoe.then(function () {
              let siteOverlayWillBeSelectedPromise = driver.findElement(swd.By.css("#siteOverlay"));
              return siteOverlayWillBeSelectedPromise
            })
              .then(function (soe) {
                let waitForOverlayToRemovePromise = driver.wait(swd.until.elementIsNotVisible(soe), 10000);
                return waitForOverlayToRemovePromise;
              }
              )
              .then(function () {
                resolve();
              }).catch(function (err) {
                reject(err);
              })
            //wait 
          })
          return waitTillPromiseIsDismissed
        }
        function navigationHelper(nameToBeSelected, selector) {
          let gElements
          return new Promise(function (resolve, reject) {
            let ModulesWillBeSelectedPromise = driver.findElements(swd.By.css(selector));
            ModulesWillBeSelectedPromise
              .then(function (modules) {
                // console.log(modules);
                gElements = modules

                let moduleTextPromiseArr = [];
                for (let i = 0; i < modules.length; i++) {
                  let moduleNamePromise = modules[i].getText();
                  moduleTextPromiseArr.push(moduleNamePromise);
                }
                let AllModuleNamesPromise = Promise.all(moduleTextPromiseArr);
                return AllModuleNamesPromise;
              })
              .then(function (AllModulesText) {
                let i;
                for (i = 0; i < AllModulesText.length; i++) {
                  if (AllModulesText[i].includes(nameToBeSelected) == true) {
                    break;
                  }
                }
                let moduleWillBeclickedPromise = gElements[i].click();
                return moduleWillBeclickedPromise;
              })
              .then(function () {
                resolve();
              }).catch(function (err) {
                reject(err);
              })
          })
        }
