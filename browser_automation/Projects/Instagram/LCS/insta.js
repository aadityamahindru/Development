let puppeteer=require("puppeteer")
let fs=require("fs");
let cFile=process.argv[2];
let targetPage=process.argv[3]
let commentFile=process.argv[4]
let noOfPosts=process.argv[5];
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
        await page.waitForSelector("._7UhW9.PIoXz.qyrsm.KV-D4.uL8Hv")     
        await page.click("._7UhW9.PIoXz.qyrsm.KV-D4.uL8Hv")
        await page.waitForNavigation({waitUntil:"networkidle2"})
        let users=await page.evaluate(function(){
            let userArr=document.querySelectorAll("._7UhW9.xLCgt.MMzan.KV-D4.fDxYl a")
            let arr=[]
            for(let i=0;i<4;i++)
            {
                let name=userArr[i].getAttribute("title")
                arr.push(name)
            }
            return arr
        })
        await page.waitForSelector(".XTCLo.x3qfX")
        await page.type(".XTCLo.x3qfX",targetPage,{delay:200})
        await page.waitForSelector(".yCE8d")
        await page.click(".yCE8d")
        let idx=0,j=0
        let comments =require(commentFile)
        await page.waitForSelector(".v1Nh3.kIKUG._bz0w")
        await page.click(".v1Nh3.kIKUG._bz0w")
        while(idx<noOfPosts)
        {
            await page.waitForSelector(".fr66n .wpO6b")
            await page.click(".fr66n .wpO6b")
            await page.waitForSelector(".X7cDz textarea")
            await page.type(".X7cDz textarea",comments[j],{delay:200})
            await page.keyboard.press("Enter")
            await page.waitForSelector(".ltpMr.Slqrh > button")
            await page.click(".ltpMr.Slqrh > button")
            await page.waitForSelector(".-qQT3")
            await page.click(".-qQT3")
            for(let i=0;i<users.length;i++)
            {
                await page.waitForSelector(".j_2Hd.uMkC7.M5V28")
                await page.type(".j_2Hd.uMkC7.M5V28",users[i],{delay:200})
                await page.waitFor(2000)
                await page.click("._7UhW9.xLCgt.qyrsm.KV-D4.uL8Hv")
            }
            await page.click(".sqdOP.yWX7d.y3zKF.cB_4K")
            if(idx!=noOfPosts-1)
            await page.click(".coreSpriteRightPaginationArrow")
            idx++;
            if(j==comments.length-1)
            j=0;
            j++
        }
    }
    catch(err)
    {
        console.log(err)
    }
})();