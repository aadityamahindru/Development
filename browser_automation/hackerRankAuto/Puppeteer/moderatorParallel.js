let puppeteer = require("puppeteer");
let fs = require("fs")
let cFile = process.argv[2];
(async function () {
    try {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let pages = await browser.pages();
        let page = pages[0];
        let data = await fs.promises.readFile(cFile)
        let { url, password, username } = JSON.parse(data);
        //login
        await page.goto(url, { waitUntil: "networkidle0" })
        await page.type("#input-1", username)
        await page.type("#input-2", password)
        await page.click("button[data-analytics=LoginPassword]")
        await page.waitForNavigation({waitUntil:"networkidle0"})
        //dashboard
        await page.click("a[data-analytics=NavBarProfileDropDown]")
        await page.click("a[data-analytics=NavBarProfileDropDownAdministration]")
        await page.waitForNavigation({waitUntil:"networkidle0"})
        let tabs=await page.$$(".administration ul li a")
        await tabs[1].click();
        await handleSinglePageQuestion(page,browser);
    }
    catch (err) {
        console.log(err)
    }
})();
async function handleSinglePageQuestion(page,browser)
{
    await page.waitForSelector(".backbone.block-center",{visible:true})
    let questions=await page.$$(".backbone.block-center");
    let pArr=[];
    for(let i=0;i<questions.length;i++)
    {
        let href=await page.evaluate(function(ele){
            return ele.getAttribute("href")
        },questions[i])
        let newTab= await browser.newPage();
        let modAdd=handleSingleQuestion(newTab,`https://www.hackerrank.com${href}`,process.argv[3]);
        pArr.push(modAdd)
    }
    await Promise.all(pArr);
    await page.waitForSelector(".pagination ul li",{visible:true})
    let buttons=await page.$$(".pagination ul li")
    let nextBtn=buttons[buttons.length-2];
    let className=await page.evaluate(function(ele){
        return ele.getAttribute("class")
    },nextBtn);
    if(className=="disabled")
    {
        return;
    }
    else{
        //await Promise.all([nextBtn.click(),page.waitForNavigation({waitUntil:"newtorkidle0"})]);
        await nextBtn.click();
        await handleSinglePageQuestion(page,browser)
    }
}
async function handleSingleQuestion(newTab,link,mod)
{
    await newTab.goto(link,{waitUntil:"networkidle0"})
    await newTab.waitForSelector(".tag");
    await newTab.click("li[data-tab=moderators]")
    await newTab.waitForSelector("#moderator", { visible: true })
    await newTab.type("#moderator",mod);
    await newTab.keyboard.press("Enter");
    await newTab.click(".save-challenge.btn.btn-green")
    await newTab.close();
}