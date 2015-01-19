<?php
include("db.php");
include("logged_in.php");

$user = $_REQUEST["user"]; //burde være session username
$query = "SELECT * FROM  `user` WHERE  `username` = '$user'";
$result = mysql_query($query);
if($result){
    $row = mysql_fetch_array($result, MYSQL_ASSOC); 
    print_r($row);
}else{
    print($result);
}

?>