<?php
require_once("php/db.php");
include("php/change.php");


//add new user
if(isset($_REQUEST["newuser"])){
    //bruker finnes ikke, lag den.
    $usr    = htmlspecialchars($_REQUEST['usr']);
    $weight = htmlspecialchars($_REQUEST['weight']);
    $gender = htmlspecialchars($_REQUEST['gender']);
    if(!user_exists($usr)){
        if(!new_user($usr, $weight, $gender))print("fail");
    }
    header("Location: ./".$_REQUEST["usr"]);
    exit;
}

$url = explode("/", htmlspecialchars(strtolower($_SERVER["REQUEST_URI"])));
//hvis man er inne på et subdomene, gå til brukerns side
if($url[1]!="" && isset($url[1]) && count($url)>=1){
    $page=$url[1];

    if(ctype_alpha($page) && file_exists("php/".$page.".php")){
    	include("php/".$page.".php");
    }
    else if(user_exists($page)){
        session_start();
    	$user=$page;
    	$_SESSION["usr"]=$user;
    	include("php/main.php");
	}
	else{
        //not valid page, or not logged in. send to index page
		header("Location: ../");
	}
    exit();
}


?>
<!DOCTYPE html>
<html>
<head>
    <?php include("php/header.php"); ?>
    <title>Alcomist</title>
</head>
<body>
    <?php include("php/navbar.php"); ?>
    <div class="center container">
            <div id="welcome-header">
                Welcome to Alcomist!
            </div>

            <form class="center register-form" method="post">
                <div class="row text-left">
                    <div class="form-group">
                        <span class="label">Weight</span>
                        <input name="weight" id="weight" type="number" min="10" max="635" step="1" value="75" required>
                    </div>
                    
                    <div class="form-group">
                        <span class="label">Gender</span>
                        <label for="checkMale">Male <input type="radio" id="checkMale" name="gender" value="male" checked="checked" /></label>
                        <label for="checkFemale">Female <input type="radio" id="checkFemale" name="gender" value="female"/></label>
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" id="usr" placeholder="Username" name="usr" maxlength="20" required>
                        <button type="submit" id="calculate" name="act" class="btn btn-success" title="Create user, or log in to existing user" value="add">
                            <span class="glyphicon glyphicon-plus"></span>Create / Login
                        </button>
                    </div>
                </div>
                <input type="hidden" name="newuser">
          </form>
            <div id="welcome-text" class="center">
                Alcomist is the new way to check your blood alcohol level throughout the night and make sure you stay golden!
            </div>
    </div>
</body>
</html>