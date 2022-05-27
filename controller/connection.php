<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
require_once("../model/user.php");
$_POST = json_decode(trim(file_get_contents("php://input")),true);
$user = new user();
if($_POST["email"]!="" && $_POST["password"]!=""){
    $_POST["password"] = hash_hmac('ripemd160', $_POST["password"], "vive le projet tweet_academy");
    if($user->check_password($_POST["email"],$_POST["password"])){
        $id = $user->get_id($_POST["email"]);
        $slug = $user->get_username($id);
        $arr = ["status"=>"success","id"=>$id,"slug"=>$slug];
        echo json_encode($arr);
    }else{
        $arr = ["status"=>"error","message"=>"Mot de passe/Email invalides"];
        echo json_encode($arr);
    }
}
