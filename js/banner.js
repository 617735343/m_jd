function getId(id) {
    return document.getElementById(id);
}
function getTag(name, oPane) {
    return (oPane || document).getElementsByTagName(name);
}
function getQr(name, oPane) {
    return (oPane || document).querySelectorAll(name);
}

function Banner(id, imgs) {
    this.init.apply(this, arguments);
}

Banner.prototype = {
    init(id, imgs) {
        this.banner = getId(id);
        this.ul = getTag("ul", this.banner)[0];
        this.ol = getTag('ol', this.banner)[0];
        this.imgs = imgs;
        this.timer = null;
        this.index = 0;
        this.oIndex = 0;
        this.setHtml();
        //定义滑动的距离
        this.startX = 0;
        this.moveX = 0;
        this.distanceX = 0;
        //定义控制滑动的开关
        this.isMove = false;
        this.ulLi = getQr('ul li', this.banner)[0];
        this.olLi = getQr('ol li', this.banner);
        this.olLi[this.oIndex].classList.add("hover");
        this.setInterval(this);

    }
}

//添加Html
Banner.prototype.setHtml = function () {
    var fram = document.createDocumentFragment();
    for (var i = 0; i < this.imgs.length; i++) {
        var li = document.createElement('li');
        this.ul.appendChild(li);
        var a = document.createElement('a');
        a.href = "#";
        li.appendChild(a);
        var img = document.createElement('img');
        img.src = imgs[i];
        a.appendChild(img);
    }

    for (var i = 0; i < this.imgs.length - 1; i++) {
        var li = document.createElement('li');
        fram.appendChild(li)
    }
    this.ol.appendChild(fram);

}

//自动轮播
Banner.prototype.setInterval = function (_this) {
    _this.timer = setInterval(function () {
        _this.player(_this);
    }, 3000);

    //触摸时执行
    _this.banner.addEventListener('touchstart', function (e) {
        clearInterval(_this.timer);
        //获取点击时的距离
        _this.startX = e.touches[0].clientX;
    })

    //触摸过程中执行
    _this.banner.addEventListener('touchmove', function (e) {
        _this.isMove = true;
        //获取滑动时的距离
        _this.moveX = e.touches[0].clientX;
        //计算滑动的距离
        _this.distanceX = _this.moveX - _this.startX;
        _this.fn(_this, -_this.index * _this.ulLi.offsetWidth + _this.distanceX);
    })

    //触摸完执行
    _this.banner.addEventListener('touchend', function () {
        //当超过了一定距离的时候
        if (_this.isMove && (Math.abs(_this.distanceX) > _this.ulLi.offsetWidth / 3)) {
            //当超过一定的距离的时候
            if (_this.distanceX > 0) {
                _this.index--;
                _this.oIndex--;
                if (_this.index < 0) {
                    _this.index = _this.imgs.length - 2;
                    _this.ul.style.left = -(_this.imgs.length - 1) * _this.banner.offsetWidth + 'px';
                }
                if (_this.oIndex < 0) {
                    _this.oIndex = _this.olLi.length - 1;
                }
            } else {
                _this.index++;
                _this.oIndex++;
                if (_this.index > _this.imgs.length - 1) {
                    _this.index = 1;
                    _this.ul.style.left = 0 + 'px';
                }
                if (_this.oIndex > _this.olLi.length - 1) {
                    _this.oIndex = 0;
                }
            }
            _this.fn(_this, -_this.index * _this.ulLi.offsetWidth);
            _this.setColor(_this.oIndex);
        } else {
            _this.fn(_this, -_this.index * _this.ulLi.offsetWidth);
            _this.setColor(_this.oIndex);
        }
        //重置
        _this.startX = 0;
        _this.moveX = 0;
        _this.distanceX = 0;
        _this.isMove = false;
        //设置自动轮播
        _this.timer = setInterval(function () {
            _this.player(_this);
        }, 3000);
    })
}

Banner.prototype.player = function (_this) {
    _this.index++;
    _this.oIndex++;
    if (_this.index > _this.imgs.length - 1) {
        _this.index = 1;
        _this.ul.style.left = 0 + 'px';
    }
    if (_this.oIndex > _this.olLi.length - 1) {
        _this.oIndex = 0;
    }

    _this.setColor(_this.oIndex);
    // _this.ul.style.left = -_this.index * _this.ulLi.offsetWidth + 'px';
    _this.fn(_this, -_this.index * _this.ulLi.offsetWidth);
}

Banner.prototype.setColor = function (oIndex) {
    for (var i = 0; i < this.olLi.length; i++) {
        this.olLi[i].classList.remove("hover");
    }
    this.olLi[oIndex].classList.add("hover");
}

//缓动函数
Banner.prototype.fn = function (_this, target) {
    var speen = _this.ul.offsetLeft - target > 0 ? -10 : 10;
    // console.log(ul.offsetTop)
    clearInterval(_this.ul.timer);
    _this.ul.timer = setInterval(function () {
        _this.ul.style.left = _this.ul.offsetLeft + speen + 'px';
        var value = _this.ul.offsetLeft - target;
        if (Math.abs(value) <= Math.abs(speen)) {
            _this.ul.style.left = target + 'px';
            clearInterval(_this.ul.timer);
        }
    }, 10)
}



function TextBanner(id) {
    this.init.apply(this, arguments);
}
TextBanner.prototype = {
    init(id) {
        this.textBanner = getId(id);
        this.ul = getTag('ul', this.textBanner)[0];
        this.ulLi = getTag('li', this.ul);
        this.ulLiA = getQr('li a', this.ul);
        this.timer = null;
        this.target = null;
        this.index = 0;
        this.setTran();
    }
}

TextBanner.prototype.setTran = function () {
    var _this = this;
    this.timer = setInterval(function () {
        _this.index++;
        if (_this.index > 1) {
            _this.index = 0;
            _this.ul.style.transition = '';
            _this.ul.style.transform = "translateY(" + 0 + "px)";
            _this.target = _this.ulLiA[0].textContent;
            _this.ulLiA[0].textContent = _this.ulLiA[1].textContent;
            _this.ulLiA[1].textContent = _this.target;
            return false;
        }
        _this.ul.style.transition = 'all 1s';
        _this.ul.style.transform = "translateY(" + -_this.index * _this.ulLi[0].offsetHeight + "px)"
    }, 2000)
}


function SecKill(id) {
    this.init.apply(this, arguments);
}

SecKill.prototype = {
    init(id) {
        this.secKill = getId(id);
        this.ul = getTag('ul', this.secKill)[0];
        this.ulLi = getQr('li', this.ul);
        this.moveX = 0;
        this.startX = 0;
        this.distanceX = 0;
        this.targetX = 0;
        this.setTran();
    }
}
SecKill.prototype.setTran = function () {
    var _this = this;
    _this.secKill.addEventListener('touchstart', function (e) {
        // console.log(e.touches[0].clientX)
        _this.startX = e.touches[0].clientX;
    });
    _this.secKill.addEventListener('touchmove', function (e) {
        // console.log(e.touches[0].clientX)
        _this.moveX = e.touches[0].clientX;
        _this.distanceX = -(_this.startX - _this.moveX);
        _this.ul.style.transition = '';
        _this.ul.style.transform = "translateX(" + (_this.targetX + _this.distanceX) + 'px)';
    });
    _this.secKill.addEventListener('touchend', function () {
        // console.log(3);

        if (_this.targetX + _this.distanceX >= 0) {
            _this.ul.style.transition = 'all 0.3s';
            _this.ul.style.transform = "translateX(" + 0 + 'px)';
            return false;
        }
        // console.log(_this.ulLi[0].offsetWidth * _this.ulLi.length);
        if (_this.targetX + _this.distanceX <= -_this.ul.offsetWidth + document.documentElement.offsetWidth) {
            _this.ul.style.transition = 'all 0.3s';
            _this.ul.style.transform = "translateX(" + (-_this.ul.offsetWidth + document.documentElement.offsetWidth) + 'px)';
            // window.open('https://wqs.jd.com/portal/wx/seckill_m/index.shtml', '_self')
            window.open('./seckill.html','_self');
            return false;
        }
        _this.targetX = _this.distanceX + _this.targetX;
    });
}


function ToTop(id) {
    this.totop = getId(id);
    this.timer = null;
    this.target = 0;
    this.leader = 0;
    this.screenTop();
    this.totopClick();
}

ToTop.prototype.screenTop = function () {
    window.onscroll = function () {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var clintHeight = window.innerHeight / 3 || document.documentElement.clientHeight / 3;
        if (scrollTop > clintHeight) {
            this.totop.style.display = 'block';
        } else {
            this.totop.style.display = 'none';
        }
    }
}


ToTop.prototype.totopClick = function () {
    var _this = this;
    _this.totop.addEventListener('click', function () {
        clearInterval(_this.timer);
        _this.leader = document.body.scrollTop || document.documentElement.scrollTop
        _this.timer = setInterval(function () {
            var speen = (_this.target - _this.leader) / 10;
            speen = speen > 0 ? Math.ceil(speen) : Math.floor(speen);
            _this.leader = _this.leader + speen;
            window.scrollTo(0, _this.leader);
            if (_this.leader == _this.target) {
                clearInterval(_this.timer);
            }
        }, 30);
    })
}

//图片轮播
var imgs = ['./img/l1.jpg', './img/l2.jpg', './img/l3.jpg', './img/l4.jpg', './img/l5.jpg', './img/l6.jpg', './img/l7.jpg', './img/l8.jpg', './img/l1.jpg'];
var banner = new Banner("banner", imgs);

//文字轮播
var textBanner = new TextBanner("textBanner");

//秒杀滚动
var secKill = new SecKill('secKill');

//回到顶部缓动
var toTop = new ToTop('totop');
