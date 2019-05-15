function AddList(id) {
    this.init.apply(this, arguments);
}

AddList.prototype = {
    init(id) {
        this.nav = document.getElementById(id);
        this.ul = this.nav.getElementsByTagName('ul')[0];
        this.product = document.getElementById('product');
        this.startY = 0;
        this.moveY = 0;
        this.distanceY = 0;
        this.targetY = 0;
        this.index = 0;
        this.indexoff = 0;
        this.array = [];
        this.getJson();
        this.ulli = this.ul.getElementsByTagName('li');
        this.setPlay();
    }
}

AddList.prototype.getJson = function () {
    var _this = this;
    $.ajax({
        url: "./php/list.php",
        type: 'get',
        dataType: "json",
        success: function (data) {
            // console.log(data)
            var lis = template("lis", {
                obj: data
            })
            // console.log(lis)
            _this.ul.innerHTML = lis;
        }
    })
    $.ajax({
        url:"./php/list.php",
        type:"get",
        dataType:"json",
        success:function(data){
            // console.log(data[0])
            var lis = template("divs",{
                obj:data[0]
            })
            // console.log(lis);
            _this.product.innerHTML = lis;
        }
    })
}

AddList.prototype.setPlay = function () {
    var _this = this;
    
    _this.nav.addEventListener('touchstart', function (e) {
        _this.startY = e.touches[0].clientY - 44;
        // console.log(1)
    });
    _this.nav.addEventListener('touchmove', function (e) {
        _this.moveY = e.touches[0].clientY - 44;
        _this.distanceY = -(_this.startY - _this.moveY + _this.indexoff);
        _this.ul.style.transition = '';
        _this.ul.style.transform = 'translateY(' + (_this.targetY + _this.distanceY) + "px)";
    });
    _this.nav.addEventListener('touchend', function () {
        _this.indexoff = 0;
        // console.log(3)
        if (_this.targetY + _this.distanceY >= 0) {
            _this.ul.style.transition = 'all 0.3s';
            _this.ul.style.transform = 'translateY(' + 0 + "px)";
            _this.targetY = 0;
            return false;
        }
        if (_this.targetY + _this.distanceY <= -_this.ul.offsetHeight + document.documentElement.offsetHeight) {
            _this.ul.style.transition = 'all 0.3s';
            _this.ul.style.transform = "translateY(" + (-_this.ul.offsetHeight + document.documentElement.offsetHeight - 44) + 'px)';
            _this.targetY = (-_this.ul.offsetHeight + document.documentElement.offsetHeight - 44);
            return false;
        }
        _this.targetY = _this.distanceY + _this.targetY;

    })
    console.log(_this.nav.getElementsByTagName('ul'))
    setTimeout(function () {
        _this.ulli = _this.ul.getElementsByTagName('li');
        _this.ulli[_this.index].classList.add('hover');
        // console.log(_this.ulli)
        for (var i = 0; i < _this.ulli.length; i++) {
            _this.array.push(_this.ulli[i]);
        }
        // console.log(_this.array);
        _this.array.forEach(function (el, id) {
            el.onclick = function () {
                // console.log((-_this.ul.offsetHeight + document.documentElement.offsetHeight))
                _this.index = id;
                for (var i = 0; i < _this.array.length; i++) {
                    _this.ulli[i].classList.remove("hover");
                }
                // console.log(id)
                _this.ulli[id].classList.add('hover');
                //异步数据的方法
                _this.getDataHTML(id,_this);

                if ((document.documentElement.offsetHeight - _this.ul.offsetHeight - 44) > -(_this.index * _this.ulli[0].offsetHeight)) {
                    _this.ul.style.transform = "translateY(" + (-_this.ul.offsetHeight + document.documentElement.offsetHeight - 44) + 'px)';
                    _this.ul.style.transition = 'all 0.3s';
                    _this.indexoff = (_this.ul.offsetHeight - document.documentElement.offsetHeight + 44);
                    return false;
                }
                _this.indexoff = (_this.index * _this.ulli[0].offsetHeight);
                _this.ul.style.transition = 'all 0.3s';
                _this.ul.style.transform = "translateY(" + -_this.indexoff + 'px)';
                
            }
        })

    }, 500);

}

AddList.prototype.getDataHTML = function(id,_this){
    $.ajax({
        url:"./php/list.php",
        type:"get",
        dataType:"json",
        success:function(data){
            console.log(data[id])
            var lis = template("divs",{
                obj:data[id]
            })
            console.log(lis);
            _this.product.innerHTML = lis;
        }
    })
}


var addList = new AddList('nav');

// function ListNav


// var listNav = new ListNav('nav',data);
(function(){
    var product = document.getElementById('product');
    var startY = 0, moveY = 0, distanceY = 0,targetY = 0;
    product.addEventListener('touchstart', function (e) {
        startY = (e.touches[0].clientY - 44);
        // console.log(1)
    });
    product.addEventListener('touchmove', function (e) {
        moveY = (e.touches[0].clientY - 44);
        distanceY = -(startY - moveY);
        product.style.transition = '';
        product.style.transform = 'translateY(' + (targetY + distanceY) + "px)";
    });
    product.addEventListener('touchend', function () {
        // console.log(3)
        if (targetY + distanceY >= 0) {
            product.style.transition = 'all 0.3s';
            product.style.transform = 'translateY(' + 0 + "px)";
            targetY = 0;
            return false;
        }
        if (targetY + distanceY <= -product.offsetHeight + document.documentElement.offsetHeight) {
            product.style.transition = 'all 0.3s';
            product.style.transform = "translateY(" + (-product.offsetHeight + document.documentElement.offsetHeight - 1) + 'px)';
            targetY = (-product.offsetHeight + document.documentElement.offsetHeight - 1);
            return false;
        }
        targetY = distanceY + targetY;
        

    })
})();



