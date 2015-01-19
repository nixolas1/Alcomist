/*var promilleElem = document.getElementById('display-percent')
var alcoholCalculate = []
var alcoholConsumed = []
var alcoholVolume = [500, 330, 200, 40,40]
var alcoholPercentage = [0.045, 0.045, 0.12, 0.2, 0.4]
var calculatedPercentage = 0
var alcoholUnit;
var weight;
var unitCount;

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

var getAlcohol = function(){
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
	console.log('returnArray nedenfor')
	console.log(returnArray)
	return returnArray
}

var getWeight = function(){
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

var validateWeight = function(){
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

var storeAlcohol = function(){
	console.log('storeAlcohol()')
	alcoholConsumed.push(alcoholCalculate.shift())
	alcoholConsumed.push(alcoholCalculate.shift())
	response = $.ajax({ 
		type: "GET",   
		url: "change.php",   
		data: "drink="+alcoholUnit+"&weight="+weight+"&gender="+getGender()+"&amount="+unitCount,
		async: false
	}).responseText;
	console.log(response);
}

var alcoholHistory = function(){
	var space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
	var space3 = space + space + space
	var info = '<h2>Drinking log</h2><br><br>'
	var info2 = 'Time'+space+'Quantity'+space+'Drink'+space3+space3+'Percentage at time of consumption<br>'
	var info3 = '---------------------------------------------------------------------------------------------------------<br>'
	
	var historyElem = document.getElementById('history')
	var selectUnitElement = document.getElementById("alcoholUnit")
	var dateObj = new Date();
	
	if (historyElem.innerText == ''){
		historyElem.innerHTML = info
		historyElem.innerHTML += info2
		historyElem.innerHTML += info3
	}

	var hours = (dateObj.getHours().toString().length) == 1 ? '0' + dateObj.getHours() : dateObj.getHours()
	//console.log('dateObj.getHours().toString().length: ' + dateObj.getHours().toString().length)
	var minutes = (dateObj.getMinutes().toString().length) == 1 ? '0' + dateObj.getMinutes() : dateObj.getMinutes()
	//console.log('dateObj.getMinutes().toString().length: ' + dateObj.getMinutes().toString().length)
	var time = hours + ':' + minutes
	var quantity = alcoholCalculate[1]
	var drink = selectUnitElement.options[alcoholCalculate[0]].text
	var percent = calculatedPercentage.toFixed(3);
	
	//FORMATERING SIDEN JAVASCRIPT KUKER MED MELLOMROM. FIKSER BEDRE SENERE
	if (alcoholCalculate[0] < 3){
		historyElem.innerHTML += time +space+ quantity +space3+ drink +space3+'&nbsp;&nbsp;&nbsp;'+ percent + ' ‰<br>'
	} else {
		historyElem.innerHTML += time +space+ quantity +space3+ drink +'&nbsp;&nbsp;&nbsp;&nbsp;'+ percent + ' ‰<br>'
	}
	

}

var calculatePercentage = function(){
	console.log('calculatePercentage()')
	var weight = getWeight()
	var alcohol = getAlcohol()
	var alcholVariable = (alcohol[1]*alcoholVolume[alcohol[0]]*alcoholPercentage[alcohol[0]]*0.79)
	console.log('alcholVariable: ' + alcholVariable)
	
	var alcPercent = alcholVariable/weight
	console.log('alcPercent: ' + alcPercent)
	alcoholHistory()
	calculatedPercentage += alcPercent
	printPercentage()
	storeAlcohol()
}


function printPercentage(){
	//var printPercent = calculatedPercentage.toFixed(3);
	var printPercent = Math.round(calculatedPercentage*1000)/1000 
	
	promilleElem.innerHTML = printPercent + '‰'

}

function simulateOneMinute(){
	console.log('simulateOneMinute')
	
	if ((calculatedPercentage - (0.15/60)) <= 0){
		calculatedPercentage = 0
	} else {
		calculatedPercentage -= (0.15/60)
	} printPercentage()
}

function simulateOneHour(){
	console.log('simulateOneHour')
	
	if ((calculatedPercentage - 0.15) <= 0){
		calculatedPercentage = 0
	} else {
		calculatedPercentage -= 0.15
	} printPercentage()
}

function simulateTenSeconds(){
	console.log('simulateTenSeconds')
	
	if ((calculatedPercentage - (0.15/(60*6))) <= 0){
		calculatedPercentage = 0
	} else {
		calculatedPercentage -= (0.15/(60*6))
	} printPercentage()
}


var weightElem = document.getElementById("checkWeight")
var genderElem = document.getElementById("checkGender")
var calculateElem = document.getElementById('calculate')
var simOneMinElem = document.getElementById("simulateOneMinute")
var simOneHourElem = document.getElementById("simulateOneHour")
weightElem.addEventListener('click', getWeight);
genderElem.addEventListener('click', getGender);
calculateElem.addEventListener('click', calculatePercentage)
simOneMinElem.addEventListener('click', simulateOneMinute)
simOneHourElem.addEventListener('click', simulateOneHour)
var update = setInterval(function(){simulateTenSeconds()}, 10000);
*/