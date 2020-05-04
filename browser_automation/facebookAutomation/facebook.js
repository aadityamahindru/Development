let puppeteer=require("puppeteer")
let cFile=process.argv[2];
let fs=require("fs")
let pName= process.argv[3];
let nPost =process.argv[4];
(async function(){
    try{
        let browser=await puppeteer.launch({
            headless:false,
            defaultViewport:null,
            args:["--start-maximized","--disable-notifications"]
        })
        let pages = await browser.pages();
        let page = pages[0];
        let data = await fs.promises.readFile(cFile)
        let { url, password, username } = JSON.parse(data);
        //login
        await page.goto(url, { waitUntil: "networkidle2" })
        await page.waitForSelector("input[type=email]");
        await page.type("input[type=email]",username,{delay:120})
        await page.type("input[type=password]",password,{delay:120});
        await Promise.all([page.click(".login_form_login_button"),page.waitForNavigation({waitUntil:"networkidle2"})])
        await page.type("#u_d_2",pName,{delay:120});
        await page.keyboard.press("Enter");
        await page.waitForNavigation({waitUntil:"networkidle2"})
        await page.waitForSelector("._58b7 ._1yt ._401d")
        let sRes=await page.$$("._58b7 ._1yt ._401d")
        await Promise.all([sRes[0].click(),page.waitForNavigation({waitUntil:"networkidle2"})]);


    }
    catch(err)
    {
        console.log(err);
    }
})();