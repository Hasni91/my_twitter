<?php
header('Access-Control-Allow-Origin: *');
require_once("../model/user.php");
require_once("../model/tweets.php");

$_POST = json_decode(trim(file_get_contents("php://input")),true);
$dbuser = new user();
if($_POST["id"] !==false){
    if(isset($_POST["req"]) && $_POST["req"] == "getUser"){
        $infos = $dbuser->get_profil_info($_POST["id"]);
        echo json_encode($infos);
    }
    
    if(isset($_POST["req"]) && $_POST["req"] == "tweet"){
        $dbtweet = new tweets();
        if(isset($_POST["image"])){
            $dbtweet->tweet($_POST["id"],$_POST["tweet"],$_POST["image"]);
        }else{
            $dbtweet->tweet($_POST["id"],$_POST["tweet"]);
        }
    }

    if(isset($_POST["req"]) && $_POST["req"] == "getALLUser"){
        $users = $dbuser->getAllUser();
        echo json_encode($users);
    }

    if(isset($_POST["req"]) && $_POST["req"] == "getAllTweet"){
        $dbtweet = new tweets();
        $res = $dbtweet->get_allTweets_withImage();
        echo json_encode($res);
    }
}else{
    echo $_POST["id"];
    echo "not connected, id empty";
}
