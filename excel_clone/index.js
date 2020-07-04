const $=require("jquery")
let fs=require("fs")
let dialog=require("electron").remote.dialog;
$(document).ready(
    function(){
        let db=[];
        $("#grid .cell").on("click",function(){
            let rid=Number($(this).attr("row-id"));
            let cid=Number($(this).attr("col-id"));
            let ciAdrr = String.fromCharCode(cid + 65);
            $("#address-container").val(ciAdrr +(rid));
        })
        $(".menu-items").on("click",function(){
            $(".menu-options-item").removeClass("selected");
            let id=$(this).attr("id");
            $(`#${id}-options`).addClass("selected");
        })
        $("#New").on("click",function(){
            let rows=$("#grid").find(".row")
            for(let i=0;i<rows.length;i++){
                let row=[];
                let cells=$(rows[i]).find(".cell");
                for(let j=0;j<cells.length;j++){
                    let cell=""
                    $(cells[j]).html("");
                    row.push(cell);
                }
                db.push(row);
            }
        })
        $("#grid .cell").on("keyup",function(){
            let rid=Number($(this).attr("row-id"));
            let cid=Number($(this).attr("col-id"));
            db[rid][cid]=$(this).html();
        })
        $("#Save").on("click",async function(){
            let sdb=await dialog.showOpenDialog();
            let jsonData=JSON.stringify(db)
            fs.writeFileSync(sdb.filePaths[0],jsonData);
        })
        $("#Open").on("click",async function(){
            let odb=await dialog.showOpenDialog();
            let fp=odb.filePaths[0];
            let content=fs.readFileSync(fp);
            let dbs=JSON.parse(content);
            let rows=$("#grid").find(".row")
            for(let i=0;i<rows.length;i++){
                let cells=$(rows[i]).find(".cell");
                for(let j=0;j<cells.length;j++){
                    $(cells[j]).html(dbs[i][j]);
                }
            }
        })
        function init(){
            $("#File").trigger("click")
            $("#New").click();
        }
        init();
    }
);