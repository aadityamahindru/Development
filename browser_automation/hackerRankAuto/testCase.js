let fs = require("fs")
require("chromedriver")
let swd = require("selenium-webdriver")
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();
let cFile = process.argv[2];
let questionFile = process.argv[3];
(async function () {
    try {
        await loginHelper();
        let dropDown = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDown]"))
        await dropDown.click()
        let adminAnchor = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration]"))
        await adminAnchor.click();
        await waitForLoader();
        let manageTabs = await driver.findElements(swd.By.css(".administration ul li a"))
        await manageTabs[1].click()
        let mpUrl = await driver.getCurrentUrl();
        let qIdx = 0;
        let questions=require(questionFile);
        while (true) {
            let question = await getMeQuestion(qIdx);
            if (question == null) {
                return;
            }
            await question.click();
            await waitForLoader()
            await handleQuestion(questions[qIdx]);
            await driver.get(mpUrl);
            qIdx++;

        }
    }
    catch (err) {
        console.log(err)
    }
})();
async function loginHelper() {
    await driver.manage().setTimeouts({ implicit: 10000, pageLoad: 10000 })
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
async function waitForLoader() {
    let loader = await driver.findElement(swd.By.css("#ajax-msg"));
    await driver.wait(swd.until.elementIsNotVisible(loader));
}
async function getMeQuestion(qIdx)
{
    let pIdx=Math.floor(qIdx/10);
    let qNo=qIdx%10;
    console.log(qNo+" "+pIdx)
    for(let i=0;i<pIdx;i++)
    {   
        let buttons=await driver.findElements(swd.By.css(".pagination ul li"));
        let nextBtn=buttons[buttons.length-2];
        await nextBtn.click();
    }
    let question=await driver.findElements(swd.By.css(".backbone.block-center"))
    if(qNo<question.length)
    {
        return question[qNo];
    }
    else
    {
        return null;
    }
}
async function handleQuestion(question)
{   
    await driver.wait(swd.until.elementLocated(swd.By.css("span.tag")))
    let testCaseTab=await driver .findElement(swd.By.css("li[data-tab=testcases]"))
    await testCaseTab.click();
    let testCases=question["Testcases"];    
    for(let i=0;i<testCases.length;i++)
    {   
        let reqTestCase= testCases[i]
        let addBtn=await driver.wait(swd.until.elementLocated(swd.By.css(".btn.add-testcase.btn-green")));
        await addBtn.click();
        let input = await driver.findElement(swd.By.css(".input-testcase-row .CodeMirror div textarea"));
        let output= await driver.findElement(swd.By.css(".output-testcase-row .CodeMirror div textarea"));
        await editorHandler(".input-testcase-row .CodeMirror div",input,reqTestCase["Input"]);
        await editorHandler(".output-testcase-row .CodeMirror div",output,reqTestCase["Output"]);
        let saveBtn= await driver.findElement(swd.By.css(".btn.btn-primary.btn-large.save-testcase"))
        await saveBtn.click();
    }
}
async function editorHandler(parentSelector,element ,data)
{
    let parent=await driver.findElement(swd.By.css(parentSelector))
    await driver.executeScript("arguments[0].style.height='10px'",parent)
    await element.sendKeys(data)
}