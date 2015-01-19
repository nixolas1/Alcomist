<?php

require_once("db.php");
include("logged_in.php");
/*
http://nixo.no/+alkocalc
http://www.promillekalkulator.no/
For kvinner: Alkohol i gram / (kroppsvekten i kg x 0,60) - (0,15 x timer fra drikkestart) = promille.
For menn: Alkohol i gram / (kroppsvekten i kg x 0,70) - (0,15 x timer fra drikkestart) = promille.
*/

$permille = 1.6;
$pcolor = 100 - $permille*80;
if($pcolor<0)$pcolor=0;
$thumb=array("glyphicon-thumbs-up", "Drikk mer!");
if($permille>1.0)$thumb=array("glyphicon-thumbs-down", "Drikk mindre!");
if($permille==1)$thumb=array("glyphicon-star", "You're Golden!");

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

        <div class="infobox">
            <div class="container big" style="color: hsl(<?php echo($pcolor);?>,80%,50%);"> 
                
                <?php echo($permille); ?>‰
            </div>
            <span class="glyphicon sub <?php echo($thumb[0]); ?>" title="<?php echo($thumb[1]); ?>"></span>
        </div>
            <select id="select-control" class="form-control" name="amount">
                <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option>
            </select>
            <select id="select-control" class="form-control" name="type">
                <option value="wine.vin">Vin</option>
                <option value="beer.øl">Øl</option>
            </select>
            <input id="id_to" name="to" type="hidden" value="3">
            <input id="committee" name="committee" type="hidden" value="dotKom">
            <button type="submit" name="act" class="btn btn-success" title="Ny Vinstraff" value="add">
          <span class="glyphicon glyphicon-plus"></span> Drukket</button>

          <div class="input-group">
            <span class="input-group-btn">
                <button class="btn btn-default" type="button">
                <span class="glyphicon glyphicon-plus-sign"></span>
                </button>
              </span>
              <input type="text" class="form-control" placeholder="Drikkens navn">
            </div>

        </center>
      </div>
    </body>
</html>
<?php mysql_close($db); ?>