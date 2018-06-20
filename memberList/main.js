$(document).ready(function() {
    var number=memberList.length;
    var row=Math.ceil(number/3);
    for(var x=0;x<row;x++){
         $("#memberList").append("<div class='row'>");
         for(var y=0;y<3;y++){
             $("#memberList").append("<div class='col-lg-4'>");
             $("#memberList").append("<img src='"+memberList[3*x+y].imgsrc+"' width='140' height='140'>");
             $("#memberList").append("<p>"+memberList[3*x+y].name+"</p>");
             $("#memberList").append("</div>");
         }
         $("#memberList").append("</div>");
     }
});