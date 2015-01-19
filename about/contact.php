<?php

include("../php/logged_in.php");

if(isset($_REQUEST['contact_text']))
{
	$to      = 'nf13gp@gmail.com';
	$subject = 'Contact from Alcomist';
	$message = htmlspecialchars($_REQUEST['contact_text']);
	$from = 'From: '.htmlspecialchars($_REQUEST['email']);

	mail($to, $subject, $message, $from);

}

?>
<!DOCTYPE html>
<html>
    <head>
        <?php include("../php/header.php"); ?>
        <title>Contact - Alcomist</title>
    </head>
    <body>
        <?php include("../php/navbar.php"); ?>
		
        <div class="container">
			<div id="welcome-header">
				Contact
			</div>
			<form id="contact-form" class="form-horizontal" method="post">
				<div class="form-group">
					<label for="inputText3" class="col-sm-2 control-label">Name</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="name" id="inputText3" placeholder="Name" required>
					</div>
				</div>
				<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">Email</label>
					<div class="col-sm-10">
						<input type="email" class="form-control" name="email" id="inputEmail3" placeholder="Email" required>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-10">
						<div class="textbox">
							<textarea class="form-control" rows="3" name="contact_text" placeholder="Type here..." required></textarea>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-offset-1 col-sm-10">
						<input type="submit" class="btn btn-default" value="send">
					</div>
				</div>
			</form>

        <!--<input type="button" id="simulateOneMinute" value="Simulate 1 min passed"/>
        <input type="button" id="simulateOneHour" value="Simulate 1 hour passed"/>-->
		</div>
        
      
    </body>
</html>