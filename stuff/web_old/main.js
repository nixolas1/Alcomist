var alcoholVolume = [500, 330, 200, 40,40];
var alcoholPercentage = [0.045, 0.045, 0.12, 0.2, 0.4];
var calculatedPercentage = 0;
var alcoholCalculate = [];
var alcoholConsumed = [];
var promilleElem;

window.addEventListener("load", function(){
	promilleElem = document.getElementById('display-percent');
	console.log("loaded");

	response = $.ajax({ 
		type: "GET",   
		url: "change.php",   
		data: "getUser=TRUE",
		async: false
	}).responseText;
	response = $.parseJSON(response);
	console.log(response);
	if(!("x" in response))
	{
		userData = response[0];
		response.shift();
		document.getElementById("weight").value = userData["weight"];
		document.getElementById("checkMale").checked = userData["gender"] == "male";
		document.getElementById("checkFemale").checked = userData["gender"] == "female";
		for(x = 0; x < response.length; x++)
		{
			calculateDrunkness(response[x]["drink"], userData["weight"], response[x]["time"], true);
		}
	}
	document.getElementById('calculate').addEventListener("click", calculateDrunkness);
	document.getElementById('simulateOneMinute').addEventListener("click", simMinute);
	document.getElementById('simulateOneHour').addEventListener("click", simHour);
	
});

function calculateDrunkness(drink, weight, time, goTime)
{
	console.log("calc");
	var alcoholVariable;
	//console.log("boop");
	if(goTime == true)
	{
		alcoholVariable = (1*alcoholVolume[drink]*alcoholPercentage[drink]*0.79)
		console.log('alcoholVariable: ' + alcoholVariable)
		alcPercent = alcoholVariable/weight;
		console.log("alcPercent: " + alcPercent);
		alcoholCalculate.push(drink);
		alcoholCalculate.push(1);
		alcHistory(new Date(time).getHours(), new Date(time).getMinutes());
		calculatedPercentage += alcPercent;
		alcoholConsumed.push(alcoholCalculate.shift());
		alcoholConsumed.push(alcoholCalculate.shift());
		time = (new Date(time).getHours()*60*60)+(new Date(time).getMinutes()*60)+(new Date(time).getSeconds());
		console.log(time); 
		simulate(time);
		printPercentage();
	}else
	{
		consumed = getAlcohol();
		console.log(getWeight());
		//console.log(getAlcohol());
		/*response = $.ajax({ 
			type: "GET",   
			url: "change.php",   
			data: "drink="+alcoholUnit+"&weight="+weight+"&gender="+getGender()+"&amount="+unitCount,
			async: false
		}).responseText;*/
	}
}

function printPercentage(){
	//var printPercent = calculatedPercentage.toFixed(3);
	var printPercent = Math.round(calculatedPercentage*1000)/1000;
	promilleElem.innerHTML = printPercent + '‰';

}

function simulate(seconds){
	var dissolvedPercent = ((0.15/60)/60)*seconds
	calculatedPercentage = calculatedPercentage - dissolvedPercent > 0 ? calculatedPercentage - dissolvedPercent : 0;
}

function alcHistory(hours, minutes)
{
	var space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	var space3 = space + space + space;
	var info = '<h2>Drinking log</h2><br><br>'
	var info2 = 'Time'+space+'Quantity'+space+'Drink'+space3+space3+'Percentage at time of consumption<br>';
	var info3 = '---------------------------------------------------------------------------------------------------------<br>';
	
	var historyElem = document.getElementById('history');
	var selectUnitElement = document.getElementById("alcoholUnit");
	var dateObj = new Date();
	
	if (historyElem.innerText == '')
	{
		historyElem.innerHTML = info;
		historyElem.innerHTML += info2;
		historyElem.innerHTML += info3;
	}
	if(hours == null) var hours = (dateObj.getHours().toString().length) == 1 ? '0' + dateObj.getHours() : dateObj.getHours();
	else if(hours < 10) hours = "0"+hours;
	if(minutes == null) var minutes = (dateObj.getMinutes().toString().length) == 1 ? '0' + dateObj.getMinutes() : dateObj.getMinutes();
	else if(minutes < 10) minutes = "0"+minutes;
	var time = hours + ':' + minutes;
	var quantity = alcoholCalculate[1];
	var drink = selectUnitElement.options[alcoholCalculate[0]].text;
	var percent = calculatedPercentage.toFixed(3);
	
	//FORMATERING SIDEN JAVASCRIPT KUKER MED MELLOMROM. FIKSER BEDRE SENERE
	if (alcoholCalculate[0] < 3)
	{
		historyElem.innerHTML += time +space+ quantity +space3+ drink +space3+'&nbsp;&nbsp;&nbsp;'+ percent + ' ‰<br>';
	} else 
	{
		historyElem.innerHTML += time +space+ quantity +space3+ drink +'&nbsp;&nbsp;&nbsp;&nbsp;'+ percent + ' ‰<br>';
	}
	
}

function getWeight (){
	console.log('getWeight()')
	if (validateWeight() ){
		weight = document.getElementById('weight').value
		console.log('Weight: ' + weight)
		var waterConstant;
		if (getGender() == 'male'){ waterConstant = 0.7 }
		else { waterConstant = 0.6 }
		var waterWeight = weight*waterConstant;
		console.log('waterWeight: ' + waterWeight)
		return waterWeight;
	} else {
		//throw { name: 'Error', message: 'Something went badly wrong' };
		throw new Error('This is not an error. Weight is not filled and this error stops the script from continuing running.');
		
	}
}

function validateWeight(){
	console.log('validateWeight()')
	var weight = document.getElementById('weight').value
	//console.log('Weight: ' + weight)
	if(weight.value == ''){ //!isNaN(test) || ! test.isFinite()
		console.log('No weight value')
		//throw { name: 'FatalError', message: 'Something went badly wrong' };
		alert('Weight is not filled')
		
		return false
	} return true
}

function getAlcohol(){
	console.log('getAlcohol()')
	var selectCounterElement = document.getElementById("unitCounter")
	unitCount = selectCounterElement.options[selectCounterElement.selectedIndex].value
	console.log('Number of units: ' + unitCount)
	
	var selectUnitElement = document.getElementById("alcoholUnit")
	alcoholUnit = selectUnitElement.options[selectUnitElement.selectedIndex].value
	console.log('Alcohol unit: ' + alcoholUnit)
	
	alcoholCalculate.push(alcoholUnit)
	alcoholCalculate.push(unitCount)
	var returnArray = [alcoholUnit, unitCount]

	return returnArray
}

var getGender = function(){
	//console.log('gender()')
	var cMale = document.getElementById("checkMale")
	var cFemale = document.getElementById("checkFemale")
	if (cMale.checked){
		console.log('Gender: Male')
		return 'male'
	} if (cFemale.checked){
		console.log('Gender: Female')
		return 'female'
	}
}
