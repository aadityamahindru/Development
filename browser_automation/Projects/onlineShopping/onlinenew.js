let puppeteer=require("puppeteer");
let fs=require("fs");
const table = require('table').table;
let path=require("path")
let product=process.argv[2]
let src=process.argv[3];
let priceTable=[["Website","Variant","Price"]];

let dirPath=path.join(src,product)
if(fs.existsSync(dirPath)==false)
{
    fs.mkdir(dirPath,function(err){
        if(err)
        {
            console.log(err)
        }
    })
}
(async function(){
    let browser=await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--disable-notifications","--start-maximized"]
    })
    let pages=await browser.pages()
    let page= pages[0]
    let page1=await browser.newPage();
    let ama=amazon(page)
    let flip=flipkart(page1)
    await Promise.all([ama,flip])
    let output=table(priceTable)
    console.log(output)
    let opPath=path.join(dirPath,"PriceTable.txt")
    fs.writeFile(opPath,output,function(err){
        if(err)
        {
            console.log(err)
        }
    })
})();
async function amazon(page)
{
    await page.goto("https://www.amazon.in/")
    await page.type("input[id=twotabsearchtextbox]",product)
    await page.keyboard.press("Enter")
    await page.waitForNavigation({waituntil:"networkidle0"})
    let results=await page.$$(".a-link-normal.a-text-normal")
    let href=await page.evaluate(function(ele){
        return ele.getAttribute("href")
    },results[0])
    let url=`https://www.amazon.in${href}`
    await page.goto(url)
   let vals =await page.evaluate(function(){
        let price=document.querySelector(".priceBlockBuyingPriceString")
        let variant=document.querySelector("#productTitle")
        let actual=price.innerText
        let vName=variant.innerText
        return [actual,vName]
    })
    let ssPath=path.join(dirPath,"amazon.png")
    if(fs.existsSync(ssPath)==false)
    await page.screenshot({path:ssPath,fullPage:true})
    let row=["Amazon"]
    row.push(vals[1])
    row.push(vals[0])
    priceTable.push(row)
       page.close();
}
async function flipkart(page)
{
    await page.goto("https://www.flipkart.com/")
    await page.click(".LM6RPg")
    await page.type(".LM6RPg",product)
    await page.keyboard.press("Enter")
   await page.waitForSelector("._31qSD5")
    let results=await page.$$("._31qSD5")
    let href=await page.evaluate(function(ele){
        return ele.getAttribute("href")
    },results[0])
    let url="https://www.flipkart.com"+href
    await page.goto(url)
    await page.waitForSelector("._1vC4OE")
    let vals=await page.evaluate(function(){
        let prices=document.querySelector("._1vC4OE")
        let productName=document.querySelector("._35KyD6")
        let pro=productName.innerText
        let res= prices.innerHTML
        return [res,pro]
    })
    let ssPath=path.join(dirPath,"flipkart.png")
    if(fs.existsSync(ssPath)==false)
    await page.screenshot({path:ssPath,fullPage:true})
    let row=["Flipkart"]
    row.push(vals[1])
    row.push(vals[0])
    priceTable.push(row)
    page.close();
}