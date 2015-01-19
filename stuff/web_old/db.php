<?php
$servername = "localhost";
$username = "alko";
$password = "Kekx9000///";
$dbname = "alko";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
/*$db = mysql_connect("localhost","alko","Kekx9000///");
if(!$db){
  die('Could not connect: ' . mysql_error());
}
$db_select = mysql_select_db("alko",$db); 
if (!$db_select){
  die ("Could not select the database: <br />". mysql_error());
}
mysql_set_charset('utf8',$db);*/

?>
