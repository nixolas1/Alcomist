<?php
session_start();
$logged_in=false;
if(isset($_SESSION["usr"])){
	if(isset($_REQUEST["logout"])){
		session_destroy();
		header("Location: ../");
    	exit;
	}else{
    	$logged_in=true;
    	$user=$_SESSION["usr"];
	}
}
/*else{
	header("Location: ../");
	exit;
}*/

?>