<?php
require_once("../model/user.php");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
$_POST = json_decode(trim(file_get_contents("php://input")),true);
$user = new user();
$_SESSION["id"] = $user->get_id($_POST["email"]);
if($_POST["email"]!=""&& $_POST["pseudo"]!=""&& $_POST["username"]!=""&& $_POST["password"]!=""){
    $_POST["password"] = hash_hmac('ripemd160', $_POST["password"], "vive le projet tweet_academy");
    
    if(!$user->is_user_exist($_POST["email"])){
        $user->create_user($_POST["pseudo"],$_POST["username"],$_POST["email"],$_POST["password"]);
        $_SESSION["id"] = $user->get_id($_POST["email"]);
        echo '{"status":"success"}';
    }else{
        echo '{"status":"error"}';
    }
}else{
    echo '{"status":"error"}';
}