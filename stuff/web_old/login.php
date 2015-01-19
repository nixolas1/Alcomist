<?php 
if(isset($_POST["username"])){

    include("db.php");

    $user=$_POST["username"];
    $pass=$_POST["password"];

    $qry="SELECT * FROM  `user` WHERE  `username` = '$user'";
    $result=mysql_query($qry);
    $row = mysql_fetch_array($result, MYSQL_ASSOC); 
    if($row){
        if (password_verify($pass, $row["password"])) {
            session_start(); 
            $_SESSION['loggedin']=1;
            header("location: index.php");
        }
    }

}
else if(isset($_GET["logout"])){
    session_start(); 
    session_destroy(); 
}
else if(isset($_GET["new"])){
    $options = array('cost' => 5);
    echo password_hash($_GET["new"], PASSWORD_BCRYPT, $options);
}


?>
<!DOCTYPE html>
<html>
    <head>
        <?php include("header.php"); ?>
        <title>Alcomist</title>
    </head>
    <body>
            <?php include("navbar.php"); ?>
            
            <div class="container">
            	<center>
                	<form action = "login.php" method = "post" class="login">
                		<?php if(isset($_POST["username"])){
                            echo('<div class="alert alert-danger" role="alert">Feil brukernavn eller passord. Prøv igjen!</div>');
                        }
                        ?>
                         <div class="form-group">
                            <input autofocus type="text" class="form-control" id="username" name="username" placeholder="Enter username">
                          </div>
                          <div class="form-group">
                            <input type="password" class="form-control" id="password"name="password" placeholder="Password">
                          </div>
						<input type="submit" value="Login" class="btn btn-primary">
					</form>
            	</center>
            </div>
    </body>
</html>
