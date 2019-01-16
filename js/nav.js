
function Nav(id,obj){
    this.init.apply(this,arguments);
}

Nav.prototype = {
    init(id,obj){
        this.nav = document.getElementById(id);
        this.ul = this.nav.getElementsByTagName('ul')[0];
        this.imgs = obj.imgs;
        this.texts = obj.texts;
        this.setHtml(); 
    }
}

Nav.prototype.setHtml = function(){
    console.log(this.ul)
    for(var i = 0;i<this.imgs.length;i++){
        var li = document.createElement('li');
        this.ul.appendChild(li);
        var a = document.createElement('a');
        a.href = '#';
        li.appendChild(a);
        var img = document.createElement('img');
        img.src = this.imgs[i];
        a.appendChild(img);
        var span = document.createElement('span');
        span.textContent = this.texts[i];
        a.appendChild(span)
    }
}

var nav = new Nav("nav",{
    imgs : ['./img/nav0.png','./img/nav1.png','./img/nav2.png','./img/nav3.png','./img/nav4.png','./img/nav5.png','./img/nav6.png','./img/nav7.png'],
    texts : ['分类查询','送货查询','购物车','个人信息','手机充值','优惠卷','折扣商品','收藏物品'],
});


//json生成视图
(function(){
    var key = document.getElementById('key');
    var keyul = key.getElementsByTagName('ul')[0];

    var xhr = new XMLHttpRequest();
    xhr.open('get',"./php/index.php");
    xhr.send(null);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                console.log(xhr.responseText);
                var starArr = JSON.parse(xhr.responseText);
                console.log(starArr);
                for(var i=0;i<starArr.length;i++){
                    var li = document.createElement('li');
                    li.id = starArr[i].id;
                    keyul.appendChild(li);
                    var a = document.createElement('a');
                    a.href = starArr[i].href;
                    li.appendChild(a);
                    var img = document.createElement('img');
                    img.src = starArr[i].path;
                    a.appendChild(img);
                }
            }
        }
    }
})();