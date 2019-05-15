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
                // console.log(xhr.responseText);
                var starArr = JSON.parse(xhr.responseText);
                // console.log(starArr);
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