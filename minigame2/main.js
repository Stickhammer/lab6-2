var mapArray, ctx, currentImgMainX,currentImgMainY;
    //地圖屬性 畫圖用           主角現在位置
var imgMountain, imgMain,imgEnemy;
    //圖片變數們(山 主角 敵人)
var randomChildNumber=-1;
    //有沒有按按鈕
var imgPeople=[0,0,0,0,0,0,0,0,0,0,0,0,0];
//一開始
$(document).ready(function() {
    //地形
    mapArray = [0,1,1,0,0,0,3,1,2];
                //0: walkable, 1: obstacle, 2: end, 3: enemy
    ctx = $("#myCanvas")[0].getContext("2d");
    
    //character
    imgMain = new Image();
    imgMain.src ="minigame2/images/spriteSheet.png";
    currentImgMainX=0;
    currentImgMainY=0;
    imgMain.onload = function()
    {ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,200,200);};
        // 畫圖    (要畫的變數 拿圖片哪一部份 要畫到哪個位置                  縮放   )
    
    //obstacle, enemy
    imgMountain = new Image();
    imgMountain.src = "minigame2/images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "minigame2/images/Enemy.png";
    imgMountain.onload=function(){
        imgEnemy.onload=function(){
            for(var x in mapArray)
                {
                    if(mapArray[x]==1)
                        {ctx.drawImage(imgMountain,32,65,32,32,x%3*200,Math.floor(x/3)*200,200,200);}
                    else if(mapArray[x]==3)
                        {ctx.drawImage(imgEnemy,7,40,104,135,x%3*200,Math.floor(x/3)*200,200,200)}
                }
        };};
    
    //人頭
    for(x=0;x<memberList.length;x++){
        imgPeople[x]=new Image();
        imgPeople[x].src=memberList[x].imgsrc;
    };
    for(x=0;x<memberList.length;x++){$("#choices").append("<li>"+memberList[x].name+"</li>");};
    $("input").click(function()
    {
        var numberOfListItem = $("#choices li").length;
        randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        $("#H1").text($("#choices li").eq(randomChildNumber).text());
        
        ctx.clearRect(currentImgMainX,currentImgMainY,200,200);
        ctx.drawImage(imgPeople[randomChildNumber],0,0,100,120,currentImgMainX,currentImgMainY,200,200);
        /*不知道為啥不行QAQ
        imgPeople.onload = function(){
            ctx.drawImage(imgPeople[randomChildNumber],0,0,50,80,currentImgMainX,currentImgMainY,300,300);
        };
        */
    });
});

//如果按按鍵
$(document).keydown(function(Event){
    var targetImgMainX, targetImgMainY, targetBlock,cutImagePositionX;
        //      預計要移動到的座標   前面的座標會對應到mapArray第幾個元素  主角轉向
    event.preventDefault();
            //避免點擊影響瀏覽器設定值
    switch(event.which){ //對鍵盤輸入做switch
        case 37://left(37=方向鍵左的鍵盤輸入編碼)
            targetImgMainX = currentImgMainX-200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 175;
            break;
        case 38://up
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY-200;
            cutImagePositionX = 355;
            break;
        case 39://right
            targetImgMainX = currentImgMainX+200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 540;
            break;
        case 40://down
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY+200;
            cutImagePositionX = 0;
            break;
        default://除這些case之外
            return;
    }
        //有無超出邊界
    if(targetImgMainX<=400 && targetImgMainX>=0 && targetImgMainY<=400 && targetImgMainY>=0)
        {targetBlock=targetImgMainX/200+targetImgMainY/200*3;}
    else
        {targetBlock=-1;}
            //清除長方形        左上起點              大小
    ctx.clearRect(currentImgMainX,currentImgMainY,200,200);
            //如果走到外面、障礙、敵人
    if(targetBlock==-1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3)
        {}
    else
        {
            $("#talkBox").text("nothing");
                    //清空對話框
            currentImgMainX=targetImgMainX
            currentImgMainY=targetImgMainY
        }
    if(randomChildNumber<0)
        {ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200);}
    else
        {ctx.drawImage(imgPeople[randomChildNumber],0,0,100,120,currentImgMainX,currentImgMainY,200,200);}
    
    switch(mapArray[targetBlock])
        {
            case undefined:
                $("#talkBox").text("border");
                break;
            case 1:
                $("#talkBox").text("mountain");
                break;
            case 2:
                $("#talkBox").text("Goal~");
                break;
            case 3:
                $("#talkBox").text(" (*゜Д゜)ゞ”");
                break;
        }
});