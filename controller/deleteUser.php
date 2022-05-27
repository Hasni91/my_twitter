<?php
require_once("../model/user.php");
$_POST = json_decode(array_keys($_POST)[0], true);
$user = new user();
if($user->delete_user($_POST["password"],$_SESSION["id"])){
    echo "success";
}else{
    echo "error";
}
