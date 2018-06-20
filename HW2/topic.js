var topic = [
    "尚未開學",
    "依仁堂練球",
    "男九舍練球",
    "依仁堂練球",
    "未定",
    "未定"
];

var startDate = new Date();

function setMonthAndDay(startMonth, startDay)
{
    startDate.setMonth(startMonth-1);
    startDate.setDate(startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}

setMonthAndDay(9,4);
