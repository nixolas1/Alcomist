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
    <a class="navbar-brand" href=".">Alcomist</a>
</div>


<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
  <ul class="nav navbar-nav">
    <li><a href="#">Profile</a></li><!--class="active"-->
    <li><a href="#">History</a></li>
    <li class="dropdown">
      <a href="#" class="dropdown-toggle" data-toggle="dropdown">About <span class="caret"></span></a>
      <ul class="dropdown-menu" role="menu">
        <li><a href="#">Action</a></li>
        <li><a href="#">Another action</a></li>
        <li><a href="#">Something else here</a></li>
        <li class="divider"></li>
        <li><a href="#">Separated link</a></li>
        <li class="divider"></li>
        <li><a href="#">One more separated link</a></li>
      </ul>
    </li>

    <?php if(False): ?>
      <ul class="nav navbar-nav navbar-right">
      <form action = "login.php" method = "post" class="navbar-form navbar-right  ">
         <div class="form-group"> 
            <input autofocus type="text" class="form-control" id="username" name="username" placeholder="Enter username">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="password"name="password" placeholder="Password">
          </div>
          <input type="submit" value="Login" class="btn btn-primary">
      </form>
      </ul>
   <?php endif; ?>
  </ul>
 </div>
</div>
</nav>
