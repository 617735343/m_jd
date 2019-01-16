(function () {
    var loginbox = document.getElementsByClassName('loginbox')[0];
    var del = loginbox.getElementsByTagName('i')[0];
    var login = document.getElementById('login');
    var logins = document.getElementsByClassName('login')[0];
    
    var loginbtn = document.getElementById('loginbtn');

    logins.onclick = function () {
        loginbox.style.display = "block";
        // login = document.getElementById('login');
    }
    del.onclick = function(){
        loginbox.style.display = "none";
    }
    if (login != null) {
        login.onclick = function () {
            loginbox.style.display = "block";
        }
    }

    loginbtn.onclick = function(){
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var xhr = new XMLHttpRequest();
        xhr.open('post','./php/login.php');
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(`username=${username}&password=${password}`);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    console.log(xhr.responseText);
                    if(xhr.responseText == 1){
                        logins.textContent = username;
                        loginbox.style.display = "none";
                    }else{
                        alert("用户名或密码错误 请输入用户：root 密码：root")
                    }
                }else{
                    alert("网络异常");
                }
            }
        }
    }

})();