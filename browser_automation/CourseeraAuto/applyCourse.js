let puppeteer=require("puppeteer")
let fs =require("fs");
let cFile=process.argv[2];
(async function(){
    let browser=await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        slowMo:100,
        args:["--start-maximized"]
    })
    let pages=await browser.pages();
    let page=pages[0];
    let data =await fs.promises.readFile(cFile)
    let {url,username,password}=JSON.parse(data)
    await page.goto(url);
    await Promise.all([page.click("#c-ph-right-nav > ul > li.c-ph-right-nav-button.c-ph-log-in > a"),page.waitForNavigation({waitUntil:"networkidle0"})]);
    await page.waitForSelector("input[type=email]",{visible:true})
    await page.type("input[type=email]",username,{delay:150})
    await page.type("input[type=password]",password,{delay:150})
    await Promise.all([page.click("button[data-js=submit]"),page.waitForNavigation({waitUntil:"networkidle0"})]);
})()