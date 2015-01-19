
var permille = 0.0;

var colorFromPermilleSimple = function(permille) {
	if (permille < 2.0) {
		return "#00FF00";
	}else if (permille < 3.0) {
		return "#FFFF00";
	}else {
		return "#FF0000";
	}
}

var colorFromPermille = function(permille) {
	//Finds a color to represent permille based on its magnitude. Uses a gradient scale from green("#00FF00") at 0.0 permille to red("#FF0000") at 3.0++-4.0 through yellow("#FFFF00") at around 1.0
	var red;
	var green;
	if (permille <= 1.0) {
		red = Math.floor(permille*(255/1.0));
		green = 255;
	}else if (permille <= 3.0) {
		red = 255;
		green = Math.floor((3.0 - permille)*(255/2.0));
	}else if (permille <= 4.0){
		red = Math.floor((4.0-permille)*(255/1.0));
		green = 0;
	}else {
		return "#000000";
	}
	red = red.toString(16);
	green = green.toString(16);
	if (red.length < 2) {
		red = "0" + red;
	}
	if (green.length < 2) {
		green = "0" + green;
	}
	return "#" + red + green + "00";
}

var messageFromPermille = function(permille) {
	if (permille < 0.1) {
		return "It's five o'clock somewhere, better start drinking!";
	}else if (permille < 0.3) {
		return "Time to drink more, you wuss!";
	}else if (permille < 0.6) {
		return "Stop drinking like a girl. Man up!";
	}else if (permille < 1.1) {
		return "Is that the best you can do? My grandmother drinks more than you.";
	}else if (permille < 2.1) {
		return "You're golden!";
	}else if (permille < 3.0) {
		return "Woah! Easy there, sailor! You oughta slow down, bro.";
	}else if (permille < 4.0) {
		return "Seriously, how are you still using this website? Stop drinking immediately and have a glass of water. Or ten.";
	}else {
		return "You should be dead by now. R.I.P.";
	}
}

var changeColor = function() {
	var permilleString = document.getElementById("permille");
	permilleString.innerHTML = permille;
	permilleString.style.color = colorFromPermille(permille);
	permilleString.style.fontSize = "72px";
	var message = document.getElementById("message");
	message.style.fontSize = "34px";
	message.innerHTML = messageFromPermille(permille);
	permille += 0.1;
}

var init = function() {
	window.setInterval(changeColor, 1000);
}
window.addEventListener("load", init);