<?php include("../php/logged_in.php"); ?>
<!DOCTYPE html>
<html>
<head>
    <?php include("../php/header.php"); ?>
    <title>Alcohol measurement - Alcomist</title>
</head>
<body>
    <?php include("../php/navbar.php"); ?>
    <div class="center container">
            <div id="welcome-header">
                Alcohol Measurement
            </div>
            <div class="center table">
                <p>
                Calculating blood alcohol content (BAC) is difficult, as each individual 
                responds to alcohol differently. The BAC resulting from alcohol consumption 
                varies with factors such as gender, weight, height, muscle mass and metabolism. 
                The latter is important as it affects your body’s ability to eliminate alcohol 
                (reducing your BAC over time).
                </p>

                <p>
                Without conducting a breath test or a blood test, the best we can do is give an 
                estimate based on some generalizations. One of the assumptions made in our 
                calculation is that a person with average metabolism has a reduction of his or her 
                BAC by 0.15 permille per hour. Alcomist uses a formula obtained from the 
                Norwegian Institute of Public Health. The formula takes weight and gender 
                into account, omitting any other factors.
                </p>

            </div>
            <!--
            <div id="welcome-text" class="center">
                Alcomist is the new way to check your blood alcohol level throughout the night and make sure you stay golden!
            </div>
            -->
    </div>
</body>
</html>