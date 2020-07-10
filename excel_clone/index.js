const $=require("jquery")
let fs=require("fs")
let dialog=require("electron").remote.dialog;
$(document).ready(
    function(){
        let db=[];
        let lastSCell;
        $("#grid .cell").on("click",function(){
            let rid=Number($(this).attr("row-id"));
            let cid=Number($(this).attr("col-id"));
            let ciAdrr = String.fromCharCode(cid + 65);
            $("#address-container").val(ciAdrr +(rid+1));
            $("#formula-container").val(db[rid][cid].formula);
            //check for styling buttons
            let cellObject=db[rid][cid];
            if(!cellObject.bold){
                $("#bold").removeClass("selected")
            }else{
                $("#bold").addClass("selected")
            }
            if(!cellObject.underline){
                $("#underline").removeClass("selected")
            }else{
                $("#underline").addClass("selected")
            }
            if(!cellObject.italic){
                $("#italic").removeClass("selected")
            }else{
                $("#italic").addClass("selected")
            }
            let align=cellObject.align;
            if(align.localeCompare("left")==0){
                $("#left").addClass("selected");
                $("#center").removeClass("selected")
                $("#right").removeClass("selected")
            }else if(align.localeCompare("center")==0){
                $("#center").addClass("selected");
                $("#left").removeClass("selected")
                $("#right").removeClass("selected")

            }else{
                $("#right").addClass("selected");
                $("#center").removeClass("selected")
                $("#left").removeClass("selected")
            }
            $(this).addClass("selected");
            if (lastSCell && lastSCell != this)
                $(lastSCell).removeClass("selected");
            lastSCell = this;
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
                    let cell={
                        value:"",
                        formula:"",
                        downstream:[],
                        upstream:[],
                        fontfamily: "Arial",
                        fontSize: 12,
                        bold: false,
                        underline: false,
                        italic: false,
                        textColor: "#000000",
                        bgColor: "white",
                        align: 'left'
                    }
                    $(cells[j]).html("");
                    $(cells[j]).css("font-family",cell.fontfamily);
                    $(cells[j]).css("font-size",cell.fontSize);
                    $(cells[j]).css("font-weight",cell.bold?"bold":"normal");
                    $(cells[j]).css("text-decoration",cell.underline?"underline":"none");
                    $(cells[j]).css("font-style",cell.italic?"italic":"normal");
                    $(cells[j]).css("color",cell.textColor);
                    $(cells[j]).css("background-color",cell.bgColor);
                    $(cells[j]).css("text-align",cell.align);
                    row.push(cell);
                }
                db.push(row);
            }
        })
        $("#grid .cell").on("blur",function(){
            let{rowId,colId}=getRc(this);  //get row and col id of current cell
            let cellObject=getCellObject(rowId,colId); // get cell object of cell
            if($(this).html()==cellObject.value){
                return;
            }
            if(cellObject.formula){
                removeFormula(cellObject,rowId,colId)
            }
            // updateCell=> update self // childrens(UI changes)
            updateCell(rowId,colId,$(this).html(),cellObject);
        })
        $("#cell-container").on("scroll",function(){
            let scrollX=$(this).scrollLeft();
            let scrollY=$(this).scrollTop();
            $("#top-left-cell , #top-row").css("top",scrollY+"px");
            $("#top-left-cell , #left-col").css("left",scrollX+"px");
        })
        $("#formula-container").on("blur",function(){
            let address=$("#address-container").val();
            let {rowId,colId}=getRcFromAddress(address);
            let cellObject=getCellObject(rowId,colId);
            let formula=$(this).val();
            if(cellObject.formula==$(this).val()){
                return;
            }
            if(cellObject.formula){
                removeFormula(cellObject,rowId,colId)
            }
            cellObject.formula=formula;
            let evaluatedVal=evaluate(cellObject);
            setUpFormula(rowId,colId,formula)
            updateCell(rowId,colId,evaluatedVal,cellObject);
        })
        function setUpFormula(rowId,colId,formula){
            let cellObject=getCellObject(rowId,colId);
            let formulaComponent=formula.split(" ");
            for(let i=0;i<formulaComponent.length;i++){
                let code=formulaComponent[i].charCodeAt(0);
                if(code>=65&&code<=90){
                    let parentRc=getRcFromAddress(formulaComponent[i]);
                    let fParent=db[parentRc.rowId][parentRc.colId];
                    //set yourself to parent's downstream
                    fParent.downstream.push({
                        rowId,
                        colId
                    })
                    cellObject.upstream.push({
                        rowId: parentRc.rowId,
                        colId:parentRc.colId
                    })
                }
            }
        }
        function evaluate(cellObject){
            console.log(cellObject);
            let formula=cellObject.formula;
            let formulaComponent=formula.split(" ");
            for(let i=0;i<formulaComponent.length;i++){
                let code=formulaComponent[i].charCodeAt(0);
                if(code>=65&&code<=90){
                    let parentRc=getRcFromAddress(formulaComponent[i]);
                    let fParent=db[parentRc.rowId][parentRc.colId];
                    let value=fParent.value;
                    formula=formula.replace(formulaComponent[i],value);
                }
            }
            console.log(formula);
            let ans=eval(formula);
            console.log(ans);
            return ans;
        }
        function updateCell(rowId,colId,val,cellObject){
            $(`#grid .cell[row-id=${rowId}][col-id=${colId}]`).html(val);
            cellObject.value=val;
            for(let i=0;i<cellObject.downstream.length;i++){
                let dsorc=cellObject.downstream[i];
                let dsobj=db[dsorc.rowId][dsorc.colId];
                let evaluatedVal=evaluate(dsobj);
                updateCell(dsorc.rowId,dsorc.colId,evaluatedVal,dsobj);
            }
        }
        function removeFormula(cellObject,rowId,colId){
            for(let i=0;i<cellObject.upstream.length;i++){
                let uso=cellObject.upstream[i];
                let fuso=db[uso.rowId][uso.colId];
                let fds=fuso.downstream.filter(function(rc){
                    return !(rc.rowId==rowId&&rc.colId==colId)
                })
                fuso.downstream=fds;
            }
            cellObject.upstream=[];
            cellObject.formula="";
        }
        function getRcFromAddress(address){
            let colId = address.charCodeAt(0) - 65;
            let rowId = Number(address.substring(1)) - 1;
            return { colId, rowId };
        }
        function getRc(elem){
            let rowId = $(elem).attr("row-id");
            let colId = $(elem).attr("col-id");
            return {
                rowId,
                colId
            }
        }
        function getCellObject(rowId,colId){
            return db[rowId][colId];
        }
        $("#Save").on("click",function(){
            let path=dialog.showSaveDialogSync();
            let jsonData=JSON.stringify(db)
            fs.writeFileSync(path,jsonData);
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
                    $(cells[j]).html(dbs[i][j].value);
                    $(cells[j]).css("font-family",cell.fontfamily);
                    $(cells[j]).css("font-size",cell.fontSize);
                    $(cells[j]).css("font-weight",cell.bold?"bold":"normal");
                    $(cells[j]).css("text-decoration",cell.underline?"underline":"none");
                    $(cells[j]).css("font-style",cell.italic?"italic":"normal");
                    $(cells[j]).css("color",cell.textColor);
                    $(cells[j]).css("background-color",cell.bgColor);
                    $(cells[j]).css("text-align",cell.align);
                }
            }
        })
        // home menu
        $("#bold").on("click",function(){
            $(this).toggleClass("selected");
            let isBold=$(this).hasClass("selected");
            $("#grid .cell.selected").css("font-weight",isBold?"bold":"normal");
            let selectedCell=$("#grid .cell.selected")
            let {rowId,colId}=getRc(selectedCell);
            db[rowId][colId].bold=isBold
        })
        $("#underline").on("click",function(){
            $(this).toggleClass("selected");
            let isUnderline=$(this).hasClass("selected");
            $("#grid .cell.selected").css("text-decoration",isUnderline?"underline":"none");
            let selectedCell=$("#grid .cell.selected");
            let {rowId,colId}=getRc(selectedCell);
            db[rowId][colId].underline=isUnderline
        })
        $("#italic").on("click",function(){
            $(this).toggleClass("selected");
            let isItalic=$(this).hasClass("selected");
            $("#grid .cell.selected").css("font-style",isItalic?"italic":"normal");
            let selectedCell=$("#grid .cell.selected");
            let {rowId,colId}=getRc(selectedCell);
            db[rowId][colId].italic=isItalic
        })
        $("#left").on("click",function(){
            $(this).toggleClass("selected");
            let isLeft=$(this).hasClass("selected");
            $("#grid .cell.selected").css("text-align",isLeft?"left":"left");
            $("#center").removeClass("selected")
            $("#right").removeClass("selected")
            let selectedCell=$("#grid .cell.selected");
            let {rowId,colId}=getRc(selectedCell);
            db[rowId][colId].align=isLeft?"left":"left";
        })
        $("#center").on("click",function(){
            $(this).toggleClass("selected");
            let isCenter=$(this).hasClass("selected");
            $("#grid .cell.selected").css("text-align",isCenter?"center":"left");
            $("#left").removeClass("selected")
            $("#right").removeClass("selected")
            let selectedCell=$("#grid .cell.selected");
            let {rowId,colId}=getRc(selectedCell);
            db[rowId][colId].align=isCenter?"center":"left"
        })
        $("#right").on("click",function(){
            $(this).toggleClass("selected");
            let isRight=$(this).hasClass("selected");
            $("#grid .cell.selected").css("text-align",isRight?"right":"left");
            $("#center").removeClass("selected")
            $("#left").removeClass("selected")
            let selectedCell=$("#grid .cell.selected");
            let {rowId,colId}=getRc(selectedCell);
            db[rowId][colId].align=isRight?"right":"left";
        })
        function init(){
            $("#File").trigger("click")
            $("#New").click();
            $("#Home").trigger("click")
            let rows=$("#grid .row")
            let cells=$(rows[0]).find(".cell")
            $(cells).eq(0).click();
        }
        init();
    }
);