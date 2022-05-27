<?php
header('Access-Control-Allow-Origin: *');
require_once("../model/user.php");
require_once("../model/tweets.php");

$_POST = json_decode(trim(file_get_contents("php://input")),true);

$dbuser = new user();
$dbTweets = new tweets();
if(isset($_POST["req"]) && $_POST["req"] == "register_image" ){
    if($_POST["id"] !== false){
        $row = $dbuser-> verifiy_UserImg($_POST["id"]);
        
        if($row == 0){
            $urlPC = $_POST["urlPC"];
            $urlPP = $_POST["urlPP"];
            $dbuser->registerImg_User($_POST["id"],$urlPP,$urlPC);
        }else{
            if($_POST["urlPC"] != "NULL"){
                $urlPC = $_POST["urlPC"];
                $dbuser->register_PC($_POST["id"],$urlPC);
            }
            if($_POST["urlPP"] != "NULL"){
                $urlPP = $_POST["urlPP"];
                $dbuser->register_PP($_POST["id"],$urlPP,$urlPC);
            }
        }

        if($_POST["bio"] !== false && $_POST["bio"] != ""){
            $dbuser->set_bio($_POST["bio"],$_POST["id"]);
        }
        if($_POST["nom"] !== false && $_POST["nom"] != ""){
            $str = str_replace(' ', '', $_POST["nom"]);
            if(strlen($str) != 0){
                $dbuser->set_pseudo($str,$_POST["id"]);
            }
        }
    }
}

if(isset($_POST["req"]) && $_POST["req"] == "get_tweets"){
    if($_POST["id"] !== false){
        $res = $dbTweets->get_allFor_tweets($_POST["id"]);
        echo json_encode($res);
    }
}
