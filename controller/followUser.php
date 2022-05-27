<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
require_once("../model/user.php");
// $_POST = json_decode(trim(file_get_contents("php://input")),true);
$_POST["id"] = 1;
$_POST["req"] = "follow_user";
$_POST["username"] = "";
$user = new user();
// $id_to_follow = $user->get_id_with_username($_POST["username"]);
if($_POST["id"] !==false){
    if(isset($_POST["req"]) && $_POST["req"] == "follow_user"){
        $liste = $user->get_profil_info($_POST["id"]);
        $liste = $liste["followins"];
        print_r($liste);
    }
}


