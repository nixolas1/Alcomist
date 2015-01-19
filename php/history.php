<?php

/*
http://nixo.no/+alkocalc
http://www.promillekalkulator.no/
For kvinner: Alkohol i gram / (kroppsvekten i kg x 0,60) - (0,15 x timer fra drikkestart) = promille.
For menn: Alkohol i gram / (kroppsvekten i kg x 0,70) - (0,15 x timer fra drikkestart) = promille.
*/

?>
<!DOCTYPE html>
<html>
    <head>
        <?php include("header.php"); 
			  include("php/logged_in.php"); ?>
        <title>Alcomist</title>
    </head>
    <body>
        <?php include("navbar.php"); ?>
		<script>window.usr = "<?php echo $user; ?>"; window.full_history = true;</script>
        <div class="container">
			<div id="welcome-header">
				History
			</div>


        <!--<input type="button" id="simulateOneMinute" value="Simulate 1 min passed"/>
        <input type="button" id="simulateOneHour" value="Simulate 1 hour passed"/>-->

        <div id="display">
            <div id="history" class="center">
				<h2 id="total_drinks"></h2>
				<a id="today" class="sort-history">Today</a><a id="week" class="sort-history">This Week</a><a id="month" class="sort-history">This Month</a><a id="all" class="sort-history">Show All</a>
	            <table id="drinkHistory" class="center table table-striped well">
		            <thead><tr><th>Date</th><th>Time</th><th>Drink</th><th>Alcohol level at time</th></tr></thead>
		            <tbody>
		            	
		            </tbody>
	            </table>
            </div>
      </div>
      <script src="static/js/main.js"></script>
    </body>
</html>