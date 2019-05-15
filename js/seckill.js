function SecKill(tabId){
    this.init.apply(this,arguments);
}

SecKill.prototype = {
    init(tabId){
        this.seckilltab = document.getElementById(tabId);
        //设置滚动特效
        this.scroll();
        //添加秒杀滚动条
        this.setSeckillTabUl();
    }
}

//设置滚动特效
SecKill.prototype.scroll = function(){
    var _this = this;
    _this.seckilltab.style.position = "static";
    window.onscroll = function(){
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var headerbox = document.querySelector(".header_box");
        var headerboxHeight = headerbox.offsetHeight;
        if(scrollTop > headerboxHeight){
            _this.seckilltab.style.position = "fixed";
        }else{
            _this.seckilltab.style.position = "static";
        }
    }
}

SecKill.prototype.setSeckillTabUl = function(){
    var _this = this;
    $.ajax({
        url:"./php/seckill.php",
        type:"get",
        dataType:"json",
        success:function (param) { 
            console.log(param)
            var seckilllis = template("seckillTabUl",{
                obj:param
            })
            _this.seckilltab.innerHTML = seckilllis;
            var date = new Date();
            var todayHours = date.getHours();
            console.log(todayHours);
            for(let i = 0;i < param.length;i++){
                if(todayHours >= parseInt(param[i].id) && todayHours-2 <= parseInt(param[i].id)){
                    console.log(param[i].time)
                    //写数据模板
                    // var seckillDatas = template("",{
                    //     obj:param[i]
                    // })
                    _this.setSeckillTabUlStyle(_this,param[i])
                }
            }
        }
    })
}

//切换菜单栏的样式
SecKill.prototype.setSeckillTabUlStyle = function(_this,param){
    setTimeout(function(){
        var ulLiTime = _this.seckilltab.querySelectorAll("ul li");
        for(let a = 0;a < ulLiTime.length;a++){
            ulLiTime[a].classList.remove("hover");
            if(ulLiTime[a].querySelectorAll("p")[0].innerHTML == param.time){
                ulLiTime[a].classList.add("hover");
                ulLiTime[a].querySelectorAll("p")[1].innerHTML = "抢购中";
            }
            if(ulLiTime[a].querySelectorAll("p")[0].innerHTML > param.time){
                ulLiTime[a].querySelectorAll("p")[1].innerHTML = "即将开始";
            }
            if(ulLiTime[a].querySelectorAll("p")[0].innerHTML < param.time){
                ulLiTime[a].querySelectorAll("p")[1].innerHTML = "已开抢";
            }
        }
    },500)
}



var seckill = new SecKill('seckill_tab');
