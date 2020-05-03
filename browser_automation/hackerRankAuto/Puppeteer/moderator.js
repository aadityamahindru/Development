let puppeteer = require("puppeteer");
let fs = require("fs")
let cFile = process.argv[2];
(async function () {
    try {
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--incognito", "--start-maximized"]
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
        let mpUrl=await page.evaluate(function(ele){
            return ele.getAttribute("href");
        },tabs[1]);
        await tabs[1].click();
        mpUrl=`https://hackerrank.com${mpUrl}`
        let qIdx=0;
        while(true)
        {
            let question= await getMeQuestion(page,qIdx);
            if(question==null)
            {
                return;
            }
            await question.click();
            await page.waitForNavigation({waitUntil:"networkidle0"})
            await handleQuestion(page,process.argv[3]);
            await page.goto(mpUrl)
            qIdx++;
        }
    }
    catch (err) {
        console.log(err)
    }
})();
async function getMeQuestion(page,qIdx)
{
    let pIdx=Math.floor(qIdx/10);
    let qNo=qIdx%10;
    for(let i=0;i<pIdx;i++)
    {   
        await page.waitForSelector(".pagination ul li", { visible: true });
        let buttons=await page.$$(".pagination ul li")
        let nextBtn=buttons[buttons.length-2];
        await nextBtn.click();
    }
    await page.waitForSelector(".backbone.block-center",{visible:true})
    let question=await page.$$(".backbone.block-center");
    if(qNo<question.length)
    {
        return question[qNo];
    }
    else
    {
        return null;
    }
}
async function handleQuestion(page,mod)
{   
    await page.waitForSelector("span.tag",{visible:true})
    await page.waitForSelector("li[data-tab=moderators]", { visible: true })
    await page.click("li[data-tab=moderators]");
    await page.waitForSelector("#moderator", { visible: true })
    await page.type("#moderator",mod);
    await page.keyboard.press("Enter");
    await page.click(".save-challenge.btn.btn-green")

}

