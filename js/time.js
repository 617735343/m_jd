(function () {
    var timers = null;
    var time = document.getElementById('time');
    var spans = time.getElementsByTagName('span');
    var todayYear = 0;
    var todayMonth = 0;
    var todayDay = 0;
    var todayTime = 0;
    var todaySeconds = getToday();
    var date = null;
    var dayTime = 0;
    var daySeconds = 0;
    timers = setInterval(setTime, 1000);
    setTime();
    function setTime() {
        clearInterval(timers);
        // console.log(todaySeconds);
        date = new Date();
        //获取当前时间的秒数
        dayTime = date.getTime();
        daySeconds = Math.floor(parseInt(dayTime) / 1000);
        // console.log(daySeconds)
        times = todaySeconds - daySeconds;
        if (times <= 0) {
            clearInterval(timer);
            todaySeconds = getToday();
            times = 1;
        } else {
            timers = setInterval(function () {
                setTime();
            }, 1000);
        }
        times--;
        /*格式化*/
        var h = Math.floor(times / 3600);
        var m = Math.floor(times % 3600 / 60);
        var s = times % 60;

        // console.log(h);
        // console.log(m);
        // console.log(s);

        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;
    }

    function getToday() {
        //获取每隔2个小时的秒数
        todayYear = (new Date()).getFullYear();
        todayMonth = (new Date()).getMonth();
        todayDay = (new Date()).getDate();
        todayHours = (new Date()).getHours() + 2;
        todayTime = (new Date(todayYear, todayMonth, todayDay,todayHours)).getTime();//毫秒
        todaySeconds = parseInt(todayTime) / 1000;
        return todaySeconds;
    }

})();
