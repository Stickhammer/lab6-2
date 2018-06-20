var player;
var currentPlay = 0;
    //第幾首歌
    
    //等YoutubeAPI準備好
function onYouTubeIframeAPIReady(){
    player = new YT.Player(
        "player",
        {
        height:"390",
        width:"640",
        videoId:playList[currentPlay],
        playerVars:{
            "autoplay":0,                    //是否自動播放
            "controls":0,                    //是否顯示控制項(播放暫停音量)
            "start":playTime[currentPlay][0],//開始時間
            "end":playTime[currentPlay][1],  //結束時間
            "showinfo":0,                    //是否顯示影片標題
            "rel":0,                         //結束時是否顯示相關影片
            "iv_load_policy":3               //是否顯示置入連結
        },
        events:{
            "onReady":onPlayerReady,
            "onStateChange":onPlayerStateChange
        }
    });
}
    //等YoutubePlayer準備好(index.html)
function onPlayerReady(event){
    $("#playButton").click(function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}
    //當PlayerState改變時(變暫停之類的)
function onPlayerStateChange(event){
    if(event.data==1 && (Math.floor(player.getCurrentTime())==playTime[currentPlay][1]))//放到最後一秒時
    {
        if(currentPlay<playList.length-1)
            {
                currentPlay++;
                player.loadVideoById({
                    "videoId":playList[currentPlay],
                    "startSeconds":playTime[currentPlay][0],
                    "endSeconds":playTime[currentPlay][1],
                    "suggestedQuality":"large"});
            }
        else if(currentPlay==playList.length-1)
            {
                currentPlay=0;
                player.cueVideoById({"videoId":playList[currentPlay],
                                    "startSeconds":playTime[currentPlay][0],
                                    "endSeconds":playTime[currentPlay][1],
                                    "suggestedQuality":"large"});
                $("h2").text(player.getVideoData().title);
            }
    }
    if(player.getVideoLoadedFraction()>0)
    {$("h2").text(player.getVideoData().title);}
}

