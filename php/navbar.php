<nav class="navbar navbar-default" role="navigation">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href='/web/<?php if(isset($user)){echo("$user");}?>'>
        <img class="logo" src="static/images/favicon.png"/>
        Alcomist
    </a>
</div>


<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
  <ul class="nav navbar-nav">
  <?php if(isset($user)){ ?>
    <li><a href="../profile">Profile</a></li>
    <li><a href="../history">History</a></li>
  <?php } ?>
    <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">About <span class="caret"></span></a>
        <ul class="dropdown-menu" role="menu">
            <li><a href="/web/about/aboutus.php">About Alcomist</a></li>
            <li><a href="/web/about/faq.php">FAQ</a></li>
            <li><a href="/web/about/sitemap.php">Sitemap</a></li>
            <li><a href="/web/about/contact.php">Contact</a></li>
            <li class="divider"></li>
            <li><a href="/web/about/measurement.php">Alcohol measurement</a></li>
            <li><a href="/web/about/consumption.php">Alcohol consumption</a></li>
        </ul>
    </li>
    <?php if(isset($user)){ ?>
        <li><a href="?logout">Log Out</a></li>
    <?php } ?>
    </ul>
 </div>
</div>
</nav>
