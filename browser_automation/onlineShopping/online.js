let puppeteer=require("puppeteer");
let fs=require("fs");
const table = require('table').table;
let priceTable=[];
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
})();
async function amazon(page)
{
    // Amazon
    await page.goto("https://www.amazon.in/")
    await page.type("input[id=twotabsearchtextbox]","One Plus 7")
    await page.keyboard.press("Enter")
    await page.waitForNavigation({waituntil:"networkidle0"})
    let results=await page.$$(".a-link-normal.a-text-normal")
    let href=await page.evaluate(function(ele){
        return ele.getAttribute("href")
    },results[0])
    let url=`https://www.amazon.in${href}`
    await page.goto(url)
   let price =await page.evaluate(function(){
        let price=document.querySelector(".priceBlockBuyingPriceString")
        let actual=price.innerText
        return actual
    })
    let row=["Amazon"]
    row.push(price)
     console.log("Amazon : "+price)
    priceTable.push(row)
       page.close();
}
async function flipkart(page)
{
        // flipkart
    await page.goto("https://www.flipkart.com/")
    await page.click(".LM6RPg")
    await page.type(".LM6RPg","One Plus 7")
    await page.keyboard.press("Enter")
   await page.waitForSelector("._31qSD5")
    let results=await page.$$("._31qSD5")
    let href=await page.evaluate(function(ele){
        return ele.getAttribute("href")
    },results[0])
    let url="https://www.flipkart.com"+href
    await page.goto(url)
    await page.waitForSelector("._1vC4OE")
    let price=await page.evaluate(function(){
        let prices=document.querySelector("._1vC4OE")
        let res= prices.innerHTML
        return res
    })
    let row=["Flipkart"]
    row.push(price)
    priceTable.push(row)
    console.log("flipkart : "+price)
    page.close();
}