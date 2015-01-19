<?php

require_once("db.php");
include("logged_in.php");
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
            <div class="container big" style="color: hsl(100,80%,50%);"> 
                0.0‰
            </div>
            <span class="glyphicon sub glyphicon-thumbs-up" title="Drikk mer!"></span>
        </div>
            <select id="select-control" class="form-control" name="amount">
                <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option>
            </select>
            <select id="select-control" class="form-control" name="type">
                <option value="beer">Øl</option>
                <option value="wine">Vin</option>
                <option value="spirit">Shot</option>
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
      <script>

      </script>
    </body>
</html>
<?php mysql_close($db); ?>