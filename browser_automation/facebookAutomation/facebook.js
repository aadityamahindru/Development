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
        // await page.type("#u_d_2",pName,{delay:120});
        // await page.keyboard.press("Enter");
        // await page.waitForNavigation({waitUntil:"networkidle2"})
        // await page.waitForSelector("._58b7 ._1yt ._401d")
        // let sRes=await page.$$("._58b7 ._1yt ._401d")
        // await Promise.all([sRes[0].click(),page.waitForNavigation({waitUntil:"networkidle2"})]);
        await page.goto(pName,{waitUntil:"networkidle2"});
        await page.waitForSelector("div[data-key=tab_posts]");
        await Promise.all([page.click("div[data-key=tab_posts]"),page.waitForNavigation({waitUntil:"networkidle2"})]);
        await page.waitForNavigation({waitUntil:"networkidle2"});
        let idx=0;
        do{
            await page.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager")
            let posts=await page.$$("#pagelet_timeline_main_column ._1xnd > ._4-u2._4-u8");
            let post =posts[idx];
            await page.waitForSelector("._666k ._8c74")
            let like=await post.$("._666k ._8c74")
            await like.click({delay:100});
            console.log(idx)
            let val=(idx+1)%7==0?true:false
            if(val)
            {
                let chain= await page.$("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager")
                await page.evaluate(function(ele){
                    console.log("executing")
                    ele.scrollIntoView()
                },chain)
                await page.waitForSelector(".uiMorePagerLoader",{hidden:true})
            }
            idx++;
        }while(idx<nPost)
    }
    catch(err)
    {
        console.log(err);
    }
})();