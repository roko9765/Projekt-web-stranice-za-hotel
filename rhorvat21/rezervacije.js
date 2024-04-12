const ds = require("fs");

class Reze {
	dajValute = function(){
		var podaci = ds.readFileSync("Podaci/rezervacije.csv","utf-8");
		return JSON.parse(podaci);
	}

	dodaj = function(valuta) {
		var valute = this.dajValute();
		valute.push(valuta);
		var novaValutaDodana = JSON.stringify(valute);
		ds.writeFile('Podaci/rezervacije.csv',novaValutaDodana,{flag: 'w'}, (greska) => { 
			if(greska) console.log(greska);
		});
	}

	brisi = function(id){
		var valute = this.dajValute();
		var obrisanaValuta = new Array();
		var obrisana = "";
		for(var index in valute){
			if(index!=id){
				obrisanaValuta.push(valute[index]);
			} else {
				obrisana = valute[index];
			}
		}
		console.log(obrisanaValuta);
		//delete valute[Object.keys(valute)[id]];//Ostaje null objekt
		ds.writeFile('Podaci/rezervacije.csv',JSON.stringify(obrisanaValuta),{flag: 'w'}, (greska) => { 
			if(greska) console.error("Greška"); 
		});
		return obrisana;
	}

	azuriraj = function(id,noviPodaci){
		var valute = this.dajValute();
		for(var index in valute){
			if(index==id){
				valute[index]=noviPodaci;
				break;
			}
		}
		ds.writeFile('Podaci/rezervacije.csv',JSON.stringify(valute),{flag: 'w'}, (greska) => { 
			if(greska) console.error("Greška"); 
		});
	}
}

module.exports = Reze;
