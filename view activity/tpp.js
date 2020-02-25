let cmd =process.argv[2];
let viewFile=require("./cmd/view")
let treefyFile=require("./cmd/treefy")
let untreefyFile=require("./cmd/untreefy")
let monitorFile=require("./cmd/monitor")
let helpFile=require("./cmd/help")
switch(cmd)
{
    case "view":
        viewFile.view(process.argv[3],process.argv[4]);
        break
    case "untreefy":
     untreefyFile.untreefy(process.argv[3],process.argv[4])
            break
    case "treefy":
        treefyFile.treefy(process.argv[3],process.argv[4])
        break
    case "monitor":
        monitorFile.monitor(process.argv[3],process.argv[4])
        break
    case "help":
           helpFile.help(process.argv[3],process.argv[4])
            break
    default:
        console.log("Wrong command")
        
}