calculatedPercentage = 1


function simulateOneMinute(){
	console.log('simulateOneMinute')
	
	if ((calculatedPercentage - (0.15/60)) <= 0){
		calculatedPercentage = 0
	} else {
		calculatedPercentage -= (0.15/60)
	} printPercentage()
}

function simulate(seconds){
	var div = Math.floor(y/x);
	var rem = y % x;
	console.log("div: " + div)
	console.log("rem: " + rem)
}

console.log("test")

