<?php

require_once("db.php");
include("guid.php");
include("logged_in.php");
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
    <?php include("header.php"); ?>
    <title>Alcomist</title>
    <style type="text/css">
        @font-face {
            font-family: 'chunkfiveroman';
            src: url('static/fonts/chunkfive/chunkfive-webfont.eot');
            src: url('static/fonts/chunkfive/chunkfive-webfont.eot?#iefix') format('embedded-opentype'),
            url('static/fonts/chunkfive/chunkfive-webfont.woff2') format('woff2'),
            url('static/fonts/chunkfive/chunkfive-webfont.woff') format('woff'),
            url('static/fonts/chunkfive/chunkfive-webfont.ttf') format('truetype'),
            url('static/fonts/chunkfive/chunkfive-webfont.svg#chunkfiveroman') format('svg');
            font-weight: normal;
            font-style: normal;
        }

        #welcome-header {
            color:#900000;
            font-size: 50px;
            font-family: 'chunkfiveroman';
            text-shadow: 2px 2px #C8C8C8;
        }

        #welcome-text {
            color:#A00000;
            font-size: 20px;
            font-family: 'chunkfiveroman';
            text-shadow: 1px 1px #C8C8C8;
            width: 53%;
        }
    </style>
</head>
<body>
    <?php include("navbar.php"); ?>
    <div class="container">
        <center>
            <br><br><br>
            <div id="welcome-header">
                Hi, and welcome to Alcomist!
            </div>
            <div id="welcome-text">
                Alcomist is a new way to calculate your blood alcohol level throughout the night and reach the optimal drunkness for you!
                By letting Alcomist know when and what you drink, we can more accurately calculate your blood alcohol level in real-time.
                Fill inn a username below and get your own user to keep history and statistics of your alcohol consumption.
            </div>
            <br><br><br>
            <input type="text" class="form-control" id="usr" placeholder="Username" required>
            <button type="submit" id="calculate" name="act" class="btn btn-success" title="Calculate" value="add">
            <span class="glyphicon glyphicon-plus"></span> Create</button>
        </center>
    </div>
</body>
</html>