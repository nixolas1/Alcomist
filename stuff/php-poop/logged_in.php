<?php
session_start();
$loggedin=false;
if(!isset($_SESSION["usr"])){
    //header("location:login.php");
   // echo("<!-- Not logged in -->");
    $loggedin=true;
    $guid = substr(base64_encode(crc32($_SERVER['HTTP_USER_AGENT'].$_SERVER['REMOTE_ADDR'].$_SERVER['HTTP_ACCEPT_LANGUAGE'])), 0, 8);
	$_SESSION["usr"] = $guid;
}

function is_logged_in(){
    return $loggedin;
}
?>