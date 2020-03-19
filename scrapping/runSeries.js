let request=require("request")
let fs=require("fs")
let cheerio=require("cheerio")
request("https://www.espncricinfo.com/scores/series/19322",
function(err,res,html){
    if(err==null&&res.statusCode==200)
    {
        //  fs.writeFileSync("cric.html",html)
        
       parsehtml(html)
          console.log("Successful")
      }
      else if(res.statusCode==404)
      {
          console.log("Page Not Found")
      }
      else{
          console.log(err)
      }
  })
