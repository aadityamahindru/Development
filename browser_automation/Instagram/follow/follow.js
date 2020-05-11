let puppeteer=require("puppeteer")
let fs=require("fs")
let cFile=process.argv[2];
let followerFile=process.argv[3];
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
        await page.goto(url)
        await page.waitForSelector("input[name=username]")
        await page.type("input[name=username]",username,{delay:100})
        await page.type("input[name=password]",password,{delay:100})
        await Promise.all([page.click(".sqdOP.L3NKy.y3zKF"),page.waitForNavigation({waitUntil:"networkidle2"})])
        let fList=require(followerFile)
        for(let i=0;i<fList.length;i++)
        {
        await page.waitForSelector(".XTCLo.x3qfX")
        await page.type(".XTCLo.x3qfX",fList[i],{delay:200})
        await page.waitForSelector(".yCE8d")
        await page.click(".yCE8d")
        await page.waitForNavigation({waitUntil:"networkidle2"})
        let flwBtn=await page.$("._5f5mN.jIbKX._6VtSN.yZn4P")
        if(flwBtn==undefined)
        {
            page.waitForSelector(".BY3EC.sqdOP.L3NKy.y3zKF")
            page.click(".BY3EC.sqdOP.L3NKy.y3zKF")
        }
        else{
            await page.click("._5f5mN.jIbKX._6VtSN.yZn4P")
        }   
        await page.waitFor(2000)
        }
    }
    catch(err)
    {
        console.log(err)
    }
})();