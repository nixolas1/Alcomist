var startDate = null;
var stopDate = null;
var nowDate = null;
var soberDate = null;

function getTimeString(when) {
	if (when == "start") {
		h = startDate.getHours();
		m = startDate.getMinutes();
	} else if (when == "stop") {
		h = stopDate.getHours();
		m = stopDate.getMinutes();
	} else if (when == "sober") {
		h = soberDate.getHours();
		m = soberDate.getMinutes();
		x = Math.round( (soberDate-stopDate)/3600000 );
	} else {
		h = nowDate.getHours();
		m = nowDate.getMinutes();
	}
	if (h<10) h = "0"+h;
	if (m<10) m = "0"+m;
	if (when == "sober" && x > 24) m = m+" <br/>("+x+" timer etter drikkeslutt)";
	return h+":"+m;
}
function roundOff(alc) {
	if (alc < 0) return 0;
	return Math.round(alc*100)/100;
}
function getWeight () {
	var water  = (document.getElementById("gender_male").checked==true)? 0.7 : 0.6;
	var weight  = parseInt(document.getElementById("weight").value);
	return water*weight;
}
function getAlcUnits () {
	var alc_units = 0;
	var volume = new Array(500, 330, 200, 75, 40);
	var strength = new Array(0.045, 0.045, 0.12, 0.2, 0.4);
	for (var i=0; i<volume.length; i++) {
		var num = i+1;
		var count = document.getElementById("units"+num).value;
		if (count != "" && count != undefined && count != null)	
			alc_units = alc_units+(count*volume[i]*strength[i]*0.79)
	}
	return alc_units;
}
function getHours (when) {
	if (when == "stop") return (stopDate-startDate)/3600000;
	if (when == "now") return (nowDate-startDate)/3600000;
}
function setDateObj (when) {
	var starttime = document.getElementById("starttime").value;
	var stoptime = document.getElementById("stoptime").value;
	
	startDate = new Date();
	startDate.setHours(parseInt(starttime.substr(0,2),10));
	startDate.setMinutes(parseInt(starttime.substr(3,2),10));
	
	stopDate = new Date();
	stopDate.setHours(parseInt(stoptime.substr(0,2),10));
	stopDate.setMinutes(parseInt(stoptime.substr(3,2),10));
	
	nowDate = new Date();
	
	if (stopDate > nowDate) {
		stopDate.setDate(stopDate.getDate()-1);
		startDate.setDate(startDate.getDate()-1);
	}
	if (startDate > stopDate) startDate.setDate(startDate.getDate()-1);
}
function getLevel (alc_level) {
	var levels = new Array(0.2, 0.4, 0.7, 1, 1.5, 2, 3, 4);
	for (var i=0; i<8; i++) { if (alc_level < levels[i]) return i; }
	return 8;
}
function setSoberDate (alc) {
	var soberHours = Math.floor(alc/0.15);
	var soberMinutes = ((alc/0.15)-soberHours)*60;
	soberDate = startDate;
	var x = Math.floor( (startDate.getHours()+soberHours)/24 );
	if (x >= 1) {
		soberDate.setDate(startDate.getDate()+x);
		soberHours = soberHours-(x*24);
	}
	soberDate.setHours(startDate.getHours()+soberHours);
	soberDate.setMinutes(startDate.getMinutes()+soberMinutes);
}
function validate_value (value, is) {
	if (is == "num" && isNaN(value)) return false;
	if (is == "ne" && (value == "" || value == null || value == undefined)) return false;
	//if (is == "time" && (isNaN(value.substr(0,2)) || isNaN(value.substr(3,2)) || value.substr(2,1) != ":")) return false;
	if (is == "time") {
		var h = value.substr(0,2);
		var x = value.substr(2,1);
		var m = value.substr(3,2);
		if (isNaN(h) || isNaN(m) || x != ":") return false;
		if (parseInt(h,10) > 23 || parseInt(m,10) > 59) return false;
	}
	return true;
}
function validate () {
	var valid = true;
	
	if (validate_value(document.getElementById("weight").value, "num") == false || validate_value(document.getElementById("weight").value, "ne") == false) {
		valid = false;
		showError("weight", true);
	} else {
		showError("weight", false);
	}
	for (var i=0; i<=4; i++) {
		var num = i+1;
		var value = document.getElementById("units"+num).value;
		if (validate_value(value, "num") == false) {
			valid = false;
			showError("units"+num, true);
		} else showError("units"+num, false);
	}
	if (validate_value(document.getElementById("starttime").value, "time") == false) {
		valid = false;
		showError("starttime", true);
	} else showError("starttime", false);
	if (validate_value(document.getElementById("stoptime").value, "time") == false) {
		valid = false;
		showError("stoptime", true);
	} else showError("stoptime", false);
	if (valid == false) showError("text", true);
	else showError("text", false);
	return valid;
}
function showError (element, is) {
	if (is == true) document.getElementById("error_"+element).style.display = "inline";
	else document.getElementById("error_"+element).style.display = "none";		
	return is;
}
function hideLevel () {
	document.getElementById("resultwrap").style.display = "none";
}
function calculate () {
	if (validate() == true) {
		setDateObj();
		var alc_units = getAlcUnits();
		var weight = getWeight();
		var alc_max = alc_units/weight;
		var alc_now = roundOff( alc_max-(0.15*getHours("now")) );
		var alc_stop = roundOff( alc_max-(0.15*getHours("stop")) );
		setSoberDate(alc_max);
		var level_stop = getLevel(alc_stop);
		
		if (document.getElementById("past").checked==true) {
			var result = getResultTag("atStop", "Da du sluttet Ã¥ drikke, kl. "+getTimeString("stop")+":", "Vanlige reaksjoner:", level_stop, alc_stop);
			var level_now = getLevel(alc_now);
			result = result+getResultTag("now", "Promille nÃ¥, kl. "+getTimeString("now")+":", "Vanlige reaksjoner:", level_now, alc_now);
			if (level_now > 0) {
				result = result+getResultTag("sober", "Din promille = 0, ca kl. "+getTimeString("sober")+":", "Kalkulatoren viser kun estimert promille, og kan ikke brukes til Ã¥ avgjÃ¸re om man kan kjÃ¸re bil eller ikke.", 0, 0);
			}
		} else {
			var result = getResultTag("atStop", "NÃ¥r du slutter Ã¥ drikke, kl. "+getTimeString("stop")+":", "Vanlige reaksjoner:", level_stop, alc_stop);
			result = result+getResultTag("sober", "Din promille = 0, ca kl. "+getTimeString("sober")+":", "Kalkulatoren viser kun estimert promille, og kan ikke brukes til Ã¥ avgjÃ¸re om man kan kjÃ¸re bil eller ikke.", 0, 0);
		}
	
		
		var resultTag = document.getElementById("resultwrap");
		resultTag.innerHTML = result;
		resultTag.style.display = "block";
	} else hideLevel();
}
function getResultTag (type, title, description, level, alcLevel) {
	var mainTag = '<div class="result clearfix">%textTag%%iconTag%</div>';
	var textTag1 = '<div class="text"><h3>%title%</h3><p><b>%description%</b></p><ul>%symptoms%</ul></div>';
	var textTag2 = '<div class="text"><h3>%title%</h3><p><b>%description%</b></p></div>';
	var iconTag = '<div class="icon"><img src="graphics/icon_level%level%.gif" /><p class="alc_level">%alcLevel% &permil;</p></div>';
	var symptoms = new Array();
	symptoms[0] = "<li>Ingen tydelige symptomer</li>";
	symptoms[1] = "<li>Ã˜yets evne til Ã¥ fokusere reduseres</li><li>Du fÃ¥r en varmefÃ¸lelse og fÃ¸ler deg avspent</li><li>Kjenner deg pigg og vel til mote</li>";
	symptoms[2] = "<li>Tilstand: \"Litt pussa\"</li><li>Oppfatning av situasjoner reduseres og vansker med Ã¥ reagere presist</li><li>Problemer med Ã¥ ta til deg informasjon</li><li>StÃ¸rst nytelse av alkohol ved ca 0,5 i promille</li>";
	symptoms[3] = "<li>HÃ¸ylydt og overdrevne bevegelser</li><li>Langsomme reflekser og nedsatt koordinasjonsevne</li><li>Overdreven selvtillit</li><li>Det lukter tydelig alkohol av deg</li>";
	symptoms[4] = "<li>Snakker utydelig</li><li>Problemer med Ã¥ gÃ¥ rett</li><li>DÃ¥rlig muskelkontroll</li><li>Oppmerksomheten og konsentrasjonsevnen kraftig svekket</li><li>Du blir lett trÃ¸tt</li><li>Kan fÃ¥ problemer med Ã¥ kontrollere fÃ¸lelser</li>";
	symptoms[5] = "<li>Rangler nÃ¥r du gÃ¥r</li><li>Kan lett fÃ¥ fÃ¸lelsesutbrudd ved aggressivitet, eller begynne Ã¥ grÃ¥te</li><li>Mange spyr pÃ¥ dette stadiet</li><li>SvÃ¦rt slÃ¸ret tale</li><li>Man sovner veldig lett</li>";
	symptoms[6] = "<li>Forgiftningssymptomer</li><li>Ingen selvkontroll</li><li>Ser dobbelt og har problemer med Ã¥ gÃ¥ oppreist</li>";
	symptoms[7] = "<li>Ingen kontroll med urinblÃ¦ren</li><li>SkjÃ¸nner ikke hva som skjer rundt deg</li><li>Personer med normalt drikkemÃ¸nster: Fare for bevisstlÃ¸shet med dÃ¸den til fÃ¸lge</li>";
	symptoms[8] = "<li>BevisstlÃ¸shet</li><li>Veldig langsom pust</li><li>Stor risiko for dÃ¸delig alkoholforgiftning</li>";
	
	if (type == "sober") textTag = textTag2.replace("%title%", title);
	else textTag = textTag1.replace("%title%", title);
	textTag = textTag.replace("%description%", description);
	textTag = textTag.replace("%symptoms%", symptoms[level]);
	textTag = textTag.replace("%alcLevel%", alcLevel);
	iconTag = iconTag.replace("%level%", level);
	iconTag = iconTag.replace("%alcLevel%", alcLevel);
	mainTag = mainTag.replace("%textTag%", textTag);
	mainTag = mainTag.replace("%iconTag%", iconTag);
	return mainTag;
}