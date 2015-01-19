<?php

/*
http://nixo.no/+alkocalc
http://www.promillekalkulator.no/
For kvinner: Alkohol i gram / (kroppsvekten i kg x 0,60) - (0,15 x timer fra drikkestart) = promille.
For menn: Alkohol i gram / (kroppsvekten i kg x 0,70) - (0,15 x timer fra drikkestart) = promille.
*/

if(isset($_REQUEST["logout"])){
        session_destroy();
        header("Location: ../");
        exit;
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
		<script>window.usr = "<?php echo $user; ?>"; window.full_history = false;</script>
        <div class="container">
        <div class="infobox">
            <div class="container big" id="display-percent">
                0.000 ‰
            </div>
            <div class="container subtext" id="display-message">
            </div>
        </div>


       <div class="buttonbox center">
       		<ul class="drinks">
            <?php
            //get all drinks, with image, name, percentage, volume, from xml
            $xml = get_xml("static/xml/drinks.xml");

            foreach($xml->drink as $drink){

                $id      = $drink->id;
                $name    = $drink->name;
                $percent = $drink->percentage;
                $vol     = $drink->disp_vol;
                $img     = $drink->url;
             
                //print("<button class='btn drink-button' id='drink_$id' style=\"background-image:url($img)\" >$name</button>");
                ?>
                <li style="background-image:url(<?php echo($img);?>)" onclick="calculate('<?php echo $id; ?>');">
                    <img class="image-height-types" src="<?php echo($img);?>" >
                    <h3 class="inner" ><?php print("$vol $name<br>$percent%");?></h3>
                </li>

                <?php
            }

            ?>
            </ul>
        </div>
        
      <script src="static/js/main.js"></script>
    </body>
</html>