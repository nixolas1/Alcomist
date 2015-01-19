<?php 
    include("php/logged_in.php"); 

    $saved="";
    if(isset($_REQUEST["edit"])){
        $weight = htmlspecialchars($_REQUEST['weight']);
        $gender = htmlspecialchars($_REQUEST['gender']);
        if(user_exists($user)){
            if(!edit_user($user, $weight, $gender))print("fail");
            else $saved="d!";
        }
    }

    $info=get_user_info($user);
    $male="";
    $female="";
    if($info["gender"]=="male")$male="checked='checked'";
    else $female="checked='checked'";

?>
<!DOCTYPE html>
<html>
<head>
    <?php include("php/header.php"); ?>
    <title>Profile - Alcomist</title>
</head>
<body>
    <?php include("php/navbar.php"); ?>
    <div class="center container">
        <div id="welcome-header">
            Hi, <?php echo($user);?>!
        </div>

        <form class="center register-form" method="post" >
            <div class="row text-left">
            <div class="panel panel-default">
             <div class="panel-heading"><h3 class="panel-title">Edit user information</h3></div>
                <div class="panel-body">

                    <div class="form-group">
                        <span class="label">Weight</span>
                        <input name="weight" id="weight" type="number" min="10" max="635" step="1" value="<?php echo($info['weight']); ?>" required>
                    </div>

                    <div class="form-group">
                        <span class="label">Gender</span>
                        <label for="checkMale">Male <input type="radio" id="checkMale" name="gender" value="male" <?php echo($male);?>/></label>
                        <label for="checkFemale">Female <input type="radio" id="checkFemale" name="gender" value="female"/<?php echo($female);?>/></label>
                    </div>

                    <div class="form-group">
                        <button type="submit" id="calculate" name="act" class="btn btn-success" title="Save" value="add">
                            <span class="glyphicon glyphicon-plus"></span>Save<?php echo($saved);?>
                        </button>
                        
                    </div>
                    <input type="hidden" name="edit">
                </div>
               


            </div>
            </div>
        </form>
    </div>
</body>
</html>