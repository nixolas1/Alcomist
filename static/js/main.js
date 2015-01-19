var calculatedPercentage = 0;
var alcoholCalculate = [];
var alcoholConsumed = [];
var goal = 0;
var total_drinks = 0;
var last_time;

window.addEventListener("load", function(){
	console.log("loaded"+window.usr);
	console.log("full_history"+window.full_history);

	response = $.ajax({ 
		type: "POST",   
		url: "php/change.php",   
		data: {functionname: "getHistory", usr: window.usr, history: window.full_history} ,
		async: false
	}).responseText;

	response = $.parseJSON(response);
	//console.log(response);

	user_info = response.shift();
	drink_history = response;
	
	drinks = getXML();
	console.log(drink_history);

	for(var x = 0; x < drink_history.length; x++)
	{
		var d_h = drink_history[x];
		full = d_h["time"].split(" ")[0].split("-").concat(d_h["time"].split(" ")[1].split(":"));
		sendTime = new Date(full[0], full[1], full[2], full[3], full[4], full[5]);
		calculate_func(d_h["drink"], sendTime)
		total_drinks += 1;
	}

	updatePercentage();

	if(!window.full_history) {
		show_percentage(0)
		prev_update = new Date();
		setInterval(function(){
			update_delta = (new Date().getTime() - prev_update.getTime())/1000;
			prev_update = new Date();
			simulate(update_delta);
			updatePercentage();
		}, 10000);
	}
	else updateTotal();
	
	if(window.full_history)
	{
		document.getElementById("today").addEventListener("click", function(){sort_history("today")});
		document.getElementById("week").addEventListener("click", function(){sort_history("week")});
		document.getElementById("month").addEventListener("click", function(){sort_history("month")});
		document.getElementById("all").addEventListener("click", function(){sort_history("all")});
	}
});

function calculate(drink)
{
	calculate_func(drink, new Date());
	add_to_database(drink, user_info["id"]);
}

function calculate_func(drink, time)
{
	curr_drink      = drinks[drink];
	time.setSeconds(7200);


	water           = user_info["gender"]=="male" ? 0.73 : 0.63;
	alcoWeight 		= 0.8;
	alcoholGrams    = (alcoWeight * (curr_drink["volume"] * curr_drink["percentage"]/100))*1000;
	alcPercent      = alcoholGrams/(user_info["weight"] * water);

	servertime      = new Date(parseInt(user_info["servertime"]*1000)).getTime()/1000;
	drinktime 		= time.getTime()/1000;
	nowtime         = new Date().getTime()/1000;
	
	seconds 		= servertime - drinktime; // to timer forskjell på servern
	if(last_time 	== undefined) last_time = drinktime;
	since_last_time = drinktime - last_time;
	
	last_time 		= drinktime;
	if(seconds<0)	seconds = 0;

	if(seconds != 0 && !window.full_history) simulate(seconds);
	if(window.full_history) simulate(seconds);
	
	alcoholCalculate.push(drink);
	alcoholCalculate.push(1);

	if(window.full_history) alcHistory(time, curr_drink["name"]);

	calculatedPercentage += alcPercent;
	alcoholConsumed.push(alcoholCalculate.shift());
	alcoholConsumed.push(alcoholCalculate.shift());

	//only animate if added through button
	if(seconds==0)updatePercentage();

	console.log(seconds);
	console.log(since_last_time);
	console.log(servertime + ", "+drinktime);
	console.log(parseFloat(curr_drink["volume"]));
	console.log(parseFloat(curr_drink["percentage"]));
	console.log("percentage: "+curr_drink["percentage"]+"\nvolume: "+curr_drink["volume"]+"\nuserweight: "+user_info["weight"]+"\nusergender: "+user_info["gender"]);
	console.log("alcpercent: "+alcPercent);
	console.log("alcoholGrams: "+alcoholGrams);
}

function add_to_database(drink, id)
{
	total_drinks += 1;
	response = $.ajax({ 
		type: "post",   
		url: "php/change.php",   
		data: {functionname: "addDrinkToUser", id: id, drink: drink},
		async: false
	}).responseText;
	console.log(response);
}

function finalPercentage(){
	//var printPercent = calculatedPercentage.toFixed(3);
	return Math.round(calculatedPercentage*1000)/1000;
}

function updatePercentage(){
	if(!window.full_history) {
		var now = goal;
		goal = finalPercentage();

		if(now == goal)return;

		jQuery({val: now}).animate({val: goal}, {
		duration: 1500,
		easing:'swing', // can be anything
		step: function() { // called on every step
				show_percentage(this.val);
			}
		});
		/*show_percentage(goal);*/
	}
}

function show_percentage(per){
	display 			= document.getElementById("display-percent");
	message 			= document.getElementById("display-message");
	display.innerHTML	= per.toFixed(3)+"&nbsp‰";
	display.style.color = getColor(per);
	message.innerHTML 	= messageFromPermille(per);
}

function simulate(seconds){
	var dissolvedPercent = ((0.15/60)/60)*seconds
	calculatedPercentage = calculatedPercentage - dissolvedPercent > 0 ? calculatedPercentage - dissolvedPercent : 0;
}

function updateTotal(){
	document.getElementById("total_drinks").innerHTML = "Your total count of drinks since you've signed up is: "+total_drinks;
}


function alcHistory(time, drinkName)
{
	var c 		  = "t"+time.getMonth()+""+time.getDate()+" w"+time.getWeekNumber()+" m"+time.getMonth()+" h";
	var table 	  = document.getElementById("drinkHistory").getElementsByTagName('tbody')[0];
	var row 	  = table.insertRow(0);
	row.className = c;
	hours 		  = pad(time.getHours());
	date 		  = time.getDate();
	month 		  = time.getMonth();
	minutes 	  = pad(time.getMinutes());
	i 			  = 0;

	if(window.full_history) {
		insertCol(row, i,  date+"."+month+"."+(time.getYear()-100), "time");
		i = 1;
	}
	insertCol(row, i,  hours+":"+minutes, "time");
	insertCol(row, i+1,  drinkName, "drink");
	insertCol(row, i+2,  finalPercentage()+"%", "percent");

	console.log(time.getMonth()+""+time.getDate());
	console.log("percent of drinker:"+finalPercentage());
}

function insertCol(row, pos, text, id, c){
	var cell = row.insertCell(pos);
	cell.innerHTML = text;
	cell.id = id;
}

function getColor(n){
	var ret=100-n*40;
	if (ret < 0) return "#000";
	return "hsl("+ret.toFixed(0)+", 80%, 50%)";
}

function getXML(loc)
{

	response = $.ajax({ 
		type: "POST",   
		url: "php/change.php",   
		data: {functionname: "get_drinks_json"} ,
		async: false
	}).responseText;

	drinks = $.parseJSON(response);
	drinks = drinks["drink"];
	
	console.log(drinks);
	/*for(var x = 0; x < xml.length; x++){
		drinks[x] = {volume: v, percent: p, name: n};
	}*/
	return drinks;
}

var messageFromPermille = function(permille) {
	if (permille < 0.1) {
		return "It's five o'clock somewhere, better start drinking!";
	}else if (permille < 0.3) {
		return "Time to drink more, you wuss!";
	}else if (permille < 0.6) {
		return "To drink or not to drink, thats not a question. Drink!";
	}else if (permille < 1.1) {
		return "You're doing pretty good, just keep it up!";
	}else if (permille < 2.0) {
		return "You're golden! Take it easy for a while to have a good time.";
	}else if (permille < 3.0) {
		return "Woah! Easy there, sailor! You oughta slow down, bro.";
	}else if (permille < 4.0) {
		return "Seriously, how are you still using this website? Stop drinking immediately and have a glass of water. Or ten.";
	}else if (permille < 6.0) {
		return "STOP STOP STOP STOP STOP STOP!";
	}else if (permille < 8.0) {
		return "You can stop clicking buttons now.";
	}else if (permille < 10.0) {
		return "Wooo! Buttons!";
	}else if (permille < 100.0) {
		return "Gooby pls?";
	}else {
		return "Goodbye.";
	}
}

function sort_history(param)
{
	d = new Date();
	if(param == "today"){
		param = "t"+d.getMonth()+""+d.getDate();
	}else if(param == "week"){
		param = "w"+d.getWeekNumber();
	}else if(param == "week"){
		param = "m"+d.getMonth();
	}else{
		$('tr').show();
		return;
	}
	$('tr.h').hide();
	$('tr.'+param+'').show();
}

function pad(n) { return ("0" + n).slice(-2); }
function sign(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; }

function formatDate(date1) {
  return date1.getFullYear() + '-' +
    (date1.getMonth() < 9 ? '0' : '') + (date1.getMonth()+1) + '-' +
    (date1.getDate() < 10 ? '0' : '') + date1.getDate();
}

Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};