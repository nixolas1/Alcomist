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
    </head>
    <body>
        <?php include("navbar.php"); echo $_SESSION['usr']; ?>
        <div class="container">
        <center>

            <div id="information">
        <!--<form id="collect-info">-->
            <strong>Weight </strong>
            <div id="weightValue">
            <form id="weightShit">
                <input name="weight" id="weight" type="number" min="10" max="99" step="1" value="75" required>
            </form>
            </div>
            <br>
            <strong>Gender </strong>
            <div id="genderValue">
                <form id="gender" style="padding-left:15px;"> <!-- required -->
                    <input type="radio" id="checkMale" name="gender" value="male" checked/>
                    <label for="checkMale"> Male</label><br>
                    <input type="radio" id="checkFemale" name="gender" value="female"/>
                    <label for="checkFemale"> Female </label>
                </form>
            </div>
            <br><br>
            <input type="hidden" id="checkWeight" value="Check weight"/>
            <input type="hidden" id="checkGender" value="Check gender"/><br>
        <!--</form>-->
    </div>




        <div class="infobox">
            <div class="container big" id="display-percent">
                0 ‰
            </div>
            <br>
            <div class="container big" id="display-message">
            </div>
            <!--<span class="glyphicon sub <?php //echo($thumb[0]); ?>" title="<?php //echo($thumb[1]); ?>"></span>-->
        </div>


            <select id="unitCounter" class="form-control" name="amount">
        <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option>
    </select>
    <select id="alcoholUnit" class="form-control" name="type">
        <option value="0">Beer (5 dl - 4,5%)</option>
        <option value="1">Beer (3,33 l - 4,5%)</option>
        <option value="2">Wine (2 dl - 12%)</option>
        <option value="3">Liquor (0,4 dl - 20%)</option>
        <option value="4">Liquor (0,4 dl - 40%)</option>
    </select>
    <button type="submit" id="calculate" name="act" class="btn btn-success" title="Calculate" value="add">
        <span class="glyphicon glyphicon-plus"></span> Drink</button>
        <br><br>
        <input type="button" id="simulateOneMinute" value="Simulate 1 min passed"/>
        <input type="button" id="simulateOneHour" value="Simulate 1 hour passed"/>

        <div id="display" style="font-size=40px">
            <br><br>
            <div id="history" style="text-align:left;width:500px;margin-left:auto;margin-right:auto;">

            </div>
            <br><br>
        <!--
          <div class="input-group">
            <span class="input-group-btn">
                <button class="btn btn-default" type="button">
                <span class="glyphicon glyphicon-plus-sign"></span>
                </button>
              </span>
              <input type="text" class="form-control" placeholder="Drikkens navn">
          </div>
        -->

        </center>
      </div>
      <script src="index12.js"></script>
    </body>
</html>