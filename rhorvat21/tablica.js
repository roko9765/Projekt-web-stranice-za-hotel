var ds = require("fs");



exports.dajTablicu = function () {
	let data = ds.readFileSync("Podaci/cjenik.json", "utf-8");
	let tablica = "";

    data = data.replaceAll('}','');
    data = data.replaceAll(':','');
    data = data.replaceAll('[','');
    data = data.replaceAll(']','');
	data = data.replaceAll('"','');
	var i = 0;
	var redovi = data.split("{");
	tablica += "<table>";
	for (var red of redovi) {
        if(i != 0){
		var kolone = red.split(",");
		tablica +=
			"<tr><td>" +
			kolone[0] +
			"</td><td>" +
			kolone[1] +
			"</td><td>" +
			kolone[2] +
			"</td></tr>";
	}
    i++;
}
	tablica += "</table>";

	return tablica;
};