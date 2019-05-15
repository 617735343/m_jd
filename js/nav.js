
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


