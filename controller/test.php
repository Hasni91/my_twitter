<?php
header('Access-Control-Allow-Origin: *');
$_POST = json_decode(trim(file_get_contents("php://input")),true);
var_dump($_POST);