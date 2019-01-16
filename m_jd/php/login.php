<?php
    $name = $_POST['username'];
    $password = $_POST['password'];

    if($name == "root" && $password == "root"){
        echo 1;
    }else{
        echo 2;
    }