<!DOCTYPE html>
<html>
    <head>
        <?php include("header.php"); ?>
        <title>Alcomist</title>
    </head>
    <body>
        <?php include("navbar.php"); ?>
        <div class="container">
			<div id="welcome-header">
				Error 404: Alcohol not found
			</div>
			<div class="well">
				<div id="notfound">
					Site not found... But hey, while you're here, enjoy the sound of a beer can being opened!
				</div>
				<audio controls>
					<source src="../static/sound/beer.mp3" type="audio/mpeg">
					<source src="../static/sound/beer.wav" type="audio/wav">
					Sorry, your browser does not suppoert the audio tag, mp3- or wavfiles. Maybe you should think about upgrading or changing browser?
				</audio>
			</div>
      </div>
    </body>
</html>