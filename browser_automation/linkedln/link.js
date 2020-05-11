let puppeteer = require("puppeteer");
let cFile = process.argv[2];
let field = process.argv[3];
let fs = require("fs");
(async function(){
    try{
    let browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args :["--disable-notifications"]
    })
    let pages = await browser.pages();
    let page =  pages[0];
    await login(page,cFile);
    await page.waitForSelector("nav ul #jobs-tab-icon",{visible:true})
    await Promise.all([page.click("nav ul #jobs-tab-icon"),page.waitForNavigation({waitUntil:"networkidle2"})])
     await page.type(".jobs-search-box__input--keyword .jobs-search-box__inner div .jobs-search-box__text-input","   web development",{delay:300})
     await page.keyboard.press("Enter")
     await page.type(".jobs-search-box__input--location .jobs-search-box__inner div .jobs-search-box__text-input","India",{delay:300})
     await page.keyboard.press("Enter")
    }
    catch(err){
        console.log(err);
    }
})()
async function login(page,cFile){
   let data = await fs.promises.readFile(cFile);
   let {url,user,pwd} = JSON.parse(data);
await page.goto(url)
await page.waitForSelector("#username",{visible:true})
await page.type("#username",user,{delay:400})
await page.type("#password",pwd,{delay:400})
await Promise.all([page.click(".login__form_action_container"),page.waitForNavigation({waitUntil:"networkidle2"})])
}