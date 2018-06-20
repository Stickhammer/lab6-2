$(document).ready(function() {
    
    var currentQuiz=null;
    $("#startButton").click(function()
    {
    if(currentQuiz==null)
    {
        currentQuiz=0;
                //現在做到第幾題
        $("#question").text(questions[0].question);
                //找到HTML的question並打上問題questions[]第0個元素中的question
        $("#options").empty();
                //清空選項區
        for(var x=0;x<questions[0].answers.length;x++)
        {
            $("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[0].answers[x][0]+"</label><br><br>");
        }
        $("#startButton").attr("value","Next")
                //把按鈕由start轉成next
    }
    else
    {
                //檢查每個選項有沒有被選
        $.each($(":radio"),function(i,val){
            if(val.checked)
            {
                    //檢查所選會不會產生最終結果(A～D)
                if(isNaN(questions[currentQuiz].answers[i][1]))
                    {
                        var finalResult = questions[currentQuiz].answers[i][1];
                        $("#question").text(finalAnswers[finalResult][0]);
                                //寫上最終結果的標題
                        $("#options").empty();
                        $("#options").append(finalAnswers[finalResult][1]+"<br><br>");
                                //找到選項並加上最終結果的內容
                        currentQuiz=null;
                        $("#startButton").attr("value","重新開始");
                    }
                else            //如果所選的要跳下一題 
                    {
                        currentQuiz=questions[currentQuiz].answers[i][1]-1
                                //讓currentQuiz對應所選，變成要跳到的下一題
                        $("#question").text(questions[currentQuiz].question);
                                //打上新題目
                        $("#options").empty();
                        for(var x=0;x<questions[currentQuiz].answers.length;x++)
                        {
                            $("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[currentQuiz].answers[x][0]+"</label><br><br>");
                        }
                    }
                return false;
            }
        });
    }
    });
});