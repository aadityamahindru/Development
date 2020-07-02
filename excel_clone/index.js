const $=require("jquery")
$(document).ready(
    function(){
        $("#grid .cell").on("click",function(){
            let rid=Number($(this).attr("row-id"));
            let cid=Number($(this).attr("col-id"));
            let ciAdrr = String.fromCharCode(cid + 65);
            $("#address-container").val(ciAdrr +(rid));
        })
    }
);