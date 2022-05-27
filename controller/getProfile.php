<?php
header('Access-Control-Allow-Origin: *');
require_once("../model/user.php");
require_once("../model/tweets.php");
$_POST = json_decode(trim(file_get_contents("php://input")),true);
$dbuser = new user();
$dbtweets = new tweets();
if($_POST["id"] !==false){
    if(isset($_POST["req"]) && $_POST["req"] == "getTweets"){
        $id = $dbuser->get_id_with_username($_POST["arobase"]);
        $tweets = $dbtweets->get_user_tweets($id);
        echo json_encode($tweets);
    }
}