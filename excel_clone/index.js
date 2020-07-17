const $=require("jquery")
let fs=require("fs");
const { get } = require("https");
let dialog=require("electron").remote.dialog;
$(document).ready(
    function(){
        let db=[];
        let lastSCell;
        let lastRowCell;
        let LastColCell;
        let cut,copy,paste;
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
            // drowpdown selected item value corrosponding to ccell
            $("#font-family").val(cellObject.fontfamily)
            $("#font-size").val(cellObject.fontSize)
            //color corrosponding to cell
            $("#text-color").val(cellObject.textColor)
            $("#bg-color").val(cellObject.bgColor)
            highlightedRC(rid,cid);
            $(this).addClass("selected");
            if (lastSCell && lastSCell != this){
                $(lastSCell).removeClass("selected");
            }
            lastSCell = this;
        })
        function highlightedRC(rid,cid){
            if(cid<0||cid>26||rid<0||rid>100){
                return;
            }
            let rows=$("#top-row").find(".cell")
            let cols=$("#left-col").find(".cell");
            //removing last highlighted cell
            if(lastRowCell!=rows[cid]){
            $(lastRowCell).removeClass("highlighted")
            }
            if(LastColCell!=cols[rid]){
            $(LastColCell).removeClass("highlighted")
            }
            //highlighting cell 
            $(rows[cid]).addClass("highlighted")
            $(cols[rid]).addClass("highlighted")
            lastRowCell=rows[cid];
            LastColCell=cols[rid];
        }
        $("#grid .cell").on("keyup",function(){
            let height=$(this).outerHeight();
            let rid=Number($(this).attr("row-id"));
            let cols=$("#left-col").find(".cell");
            $(cols[rid]).css("height",height+"px");

        })
        //move from one cell to another on arrow key press
        $("#grid .cell").keydown(function(e){
            let rid=Number($(this).attr("row-id"));
            let cid=Number($(this).attr("col-id"));
            switch(e.which){
                case 37: $(`#grid .cell[row-id=${rid}][col-id=${cid-1}]`).focus(); //left arrow
                         $(`#grid .cell[row-id=${rid}][col-id=${cid-1}]`).click();
                         break;
                case 38: $(`#grid .cell[row-id=${rid-1}][col-id=${cid}]`).focus(); // top arrow
                         $(`#grid .cell[row-id=${rid-1}][col-id=${cid}]`).click(); 
                         break;
                case 39: $(`#grid .cell[row-id=${rid}][col-id=${cid+1}]`).focus(); //right arrow
                         $(`#grid .cell[row-id=${rid}][col-id=${cid+1}]`).click();
                         break;
                case 40: $(`#grid .cell[row-id=${rid+1}][col-id=${cid}]`).focus(); //down arrow
                         $(`#grid .cell[row-id=${rid+1}][col-id=${cid}]`).click()
                         break;
            }
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
                        bgColor: "#FFFFFF",
                        align: 'left'
                    }
                    $(cells[j]).html("");
                    $(cells[j]).css("font-family",cell.fontfamily);
                    $(cells[j]).css("font-size",cell.fontSize+"px");
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
            if(formula.length==0)
            return;
            //formula validation
            if(formula.charAt(0)!="("||formula.charAt(formula.length-1)!=")"){
                dialog.showErrorBox("Please Check the Formula","Use proper brackets");
                return;
            }
            for(let i=0;i<formula.length-1;i++){
                let ch=formula.charAt(i);
                let ch1=formula.charAt(i+1);
                if((ch=="("||ch=="+"||ch=="-"||ch=="*"||ch=="/")&&ch1!=" "){
                    dialog.showErrorBox("Please Check the Formula","1) Make sure to use space after every operator and operand");
                    return;
                }
            }
            if(cellObject.formula==$(this).val()){
                return;
            }
            if(cellObject.formula){
                removeFormula(cellObject,rowId,colId)
            }
            cellObject.formula=formula;
            let set=new Set();
            let cyclic=isCyclic(cellObject,set);
            if(cyclic){
                dialog.showErrorBox("There are one or more circular references where formula reffers to its own cell","Try removing or changing these references")
                cellObject.formula="";
                return;
            }
            let evaluatedVal=evaluate(cellObject);
            setUpFormula(rowId,colId,formula)
            updateCell(rowId,colId,evaluatedVal,cellObject);
        })
        function isCyclic(cellObject,set){
            if(!set.has(cellObject)){
                set.add(cellObject)
                let children=cellObject.downstream;
                children.forEach(function(childRC){
                    chObj=getCellObject(childRC.rowId,childRC.colId);
                    if(!set.has(chObj)){
                        isCyclic(chObj,set)
                    }
                })
            }else{
                return true;
            }
            return false;
        }
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
                    let cell=db[i][j]
                    console.log(cell)
                    $(cells[j]).html(dbs[i][j].value);
                    $(cells[j]).css("font-family",cell.fontfamily);
                    $(cells[j]).css("font-size",cell.fontSize+"px");
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
        $("#font-size").on("change",function(){
          let fontSize=$(this).val();
          $("#grid .cell.selected").css("font-size",fontSize+"px");
          let selectedCell=$("#grid .cell.selected");
          let {rowId,colId}=getRc(selectedCell);
          db[rowId][colId].fontSize=fontSize;
        })
        $("#font-family").on("change",function(){
            let fontfamily=$(this).val();
            $("#grid .cell.selected").css("font-family",fontfamily);
            let selectedCell=$("#grid .cell.selected");
            let {rowId,colId}=getRc(selectedCell);
            db[rowId][colId].fontfamily=fontfamily;
          })
          $("#text-color").on("change",function(){
              let textColor=$(this).val();
              $("#grid .cell.selected").css("color",textColor);
              let selectedCell=$("#grid .cell.selected");
              let {rowId,colId}=getRc(selectedCell);
              db[rowId][colId].textColor=textColor;
          })
          $("#bg-color").on("change",function(){
            let bgColor=$(this).val();
            $("#grid .cell.selected").css("background-color",bgColor);
            let selectedCell=$("#grid .cell.selected");
            let {rowId,colId}=getRc(selectedCell);
            db[rowId][colId].bgColor=bgColor;
        })

        //cut,copy,paste button
        $("#copy").on("click",function(){
            copy=$("#grid .cell.selected").html();
            cut="";
        })
        $("#cut").on("click",function(){
            cut=$("#grid .cell.selected").html();
            copy="";
            let selectedCell=$("#grid .cell.selected");
            let {rowId,colId}=getRc(selectedCell);
            let cellObject=getCellObject(rowId,colId)
            if(cellObject.formula){
                removeFormula(cellObject,rowId,colId);
            }
            $(`#grid .cell[row-id=${rowId}][col-id=${colId}]`).html("");
        })
        $("#paste").on("click",function(){
            paste=cut?cut:copy
            $("#grid .cell.selected").html=paste;
            if(!cut&&!copy){
                return
            }
            let selectedCell=$("#grid .cell.selected");
            let {rowId,colId}=getRc(selectedCell);
            let cellObject=getCellObject(rowId,colId)
            if(cellObject.formula){
                removeFormula(cellObject,rowId,colId);
            }
            updateCell(rowId,colId,paste,cellObject)
            paste=""
            cut=""
            copy=""
        })
        function init(){
            $("#File").trigger("click")
            $("#New").click();
            $("#Home").trigger("click")
            let rows=$("#grid .row")
            let cells=$(rows[0]).find(".cell")
            $(cells).eq(0).focus();
            $(cells).eq(0).click();
        }
        init();
    }
);