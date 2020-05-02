let fs = require("fs")
require("chromedriver")
let swd = require("selenium-webdriver")
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();
let cFile = process.argv[2];
let questionFile=process.argv[3];
(async function () {
    try {
        await loginHelper();
        let dropDown =await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDown]"))
        await dropDown.click()
        let adminAnchor= await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"))
        await adminAnchor.click();
        await waitForLoader();
        let manageTabs=await driver.findElements(swd.By.css(".administration ul li a"))
        await manageTabs[1].click()
        let manageChallenge= await driver.getCurrentUrl();
        let quesions=require(questionFile);
        for(let i=0;i<quesions.length;i++)
        {
            await waitForLoader();
            await createNewChallenge(quesions[i])
            await driver.get(manageChallenge)
        }

    }
    catch (err) {
        console.log(err)
    }
})();
async function createNewChallenge(question)
{
    let createChallenge = await driver.findElement(swd.By.css(".btn.btn-green.backbone.pull-right"));
    await createChallenge.click();
    await waitForLoader();
    let eSelector = ["#name", "textarea.description", "#problem_statement-container .CodeMirror div textarea", "#input_format-container .CodeMirror textarea", "#constraints-container .CodeMirror textarea", "#output_format-container .CodeMirror textarea", "#tags_tag"];
    let eSelected=eSelector.map(function(s){
        return driver.findElement(swd.By.css(s));
    })
    let AllElements=await Promise.all(eSelected);
    let NameWillAddedPromise = AllElements[0].sendKeys(question["Challenge Name"]);
    let descWillAddedPromise = AllElements[1].sendKeys(question["Description"]);
    await Promise.all([NameWillAddedPromise,descWillAddedPromise])
    await editorHandler("#problem_statement-container .CodeMirror div",AllElements[2],question["Problem Statement"])
    await editorHandler("#input_format-container .CodeMirror div",AllElements[3],question["Input Format"])
    await editorHandler("#constraints-container .CodeMirror div",AllElements[4],question["Constraints"])
    await editorHandler("#output_format-container .CodeMirror div",AllElements[5],question["Output Format"])
    await AllElements[6].sendKeys(question["Tags"])
    await AllElements[6].sendKeys(swd.Key.ENTER);
    let submitBtn = await driver.findElement(swd.By.css(".save-challenge.btn.btn-green"))
    await submitBtn.click();
}
async function loginHelper()
{
    await driver.manage().setTimeouts({implicit:10000,pageLoad:10000})
        let data = await fs.promises.readFile(cFile)
        let { url, username, password } = JSON.parse(data)
        await driver.get(url);
        let userFind = driver.findElement(swd.By.css("#input-1"))
        let passFind = driver.findElement(swd.By.css("#input-2"))
        let loginFind = await Promise.all([userFind, passFind])
        let userEntered = loginFind[0].sendKeys(username)
        let passEntered = loginFind[1].sendKeys(password)
        await Promise.all([userEntered, passEntered])
        let loginBtn = await driver.findElement(swd.By.css("button[data-analytics=LoginPassword]"))
        await loginBtn.click();
}
async function editorHandler(parentSelector,element ,data)
{
    let parent=await driver.findElement(swd.By.css(parentSelector))
    await driver.executeScript("arguments[0].style.height='10px'",parent)
    await element.sendKeys(data)
}
async function waitForLoader()
{
    let loader = await driver.findElement(swd.By.css("#ajax-msg"));
    await driver.wait(swd.until.elementIsNotVisible(loader));
}