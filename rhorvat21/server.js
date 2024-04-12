const express = require("/usr/lib/node_modules/express");
const port = 12366;
const server = express();
const putanja = __dirname;

server.get("/javascript", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Jsk/rhorvat21.js");
});

server.use("/css", express.static(putanja + "/Css"));
server.use("/dokumenti", express.static(putanja + "/Dokumenti"));

server.get("/", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Html/index.html");
});

server.get("/index", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Html/index.html");
});


server.get("/besplatna_masaza", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Html/besplatna_masaza.html");
});

server.get("/cjenik", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Html/cjenik.html");
});

server.get("/dorucak", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Html/dorucak.html");
});

server.get("/galerija", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Html/galerija.html");
});

server.get("/interaktivna_slika", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Html/interaktivna_slika.html");
});

server.get("/karta", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Html/karta.html");
});

server.get("/obrazac_kontakt", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Html/obrazac_kontakt.html");
});

server.get("/obrazac_sobe", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Html/obrazac_sobe.html");
});

server.get("/sauna", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Html/sauna.html");
});

server.get("/video", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Html/video.html");
});

server.get("/autor", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Dokumentacija/autor.html");
});

server.get("/dokumentacija", (zahtjev, odgovor) => {
	odgovor.sendFile(putanja + "/Dokumentacija/dokumentacija.html");
});

var ds = require("fs");
const tablica = require("./tablica.js");
const Reze = require("./rezervacije.js");
server.get("/dinamicna",(zahtjev, odgovor) => {
    let zag = ds.readFileSync("Podaci/zaglavlje.txt", "utf-8");
    let pod = ds.readFileSync("Podaci/podnozje.txt", "utf-8");
  
    odgovor.type("html");
    odgovor.write(zag);
    odgovor.write(tablica.dajTablicu());
    odgovor.write(pod);
    odgovor.end();
  
  });

  const reze = new Reze();

  server.get("/api/rezervacije", (zahtjev, odgovor) =>{
  
	odgovor.type("json");
  
  let data = reze.dajValute();
  if(data == undefined)
  { 
	odgovor.status(417); 
	odgovor.send(JSON.stringify(
	  {poruka: "greska"}
	  ));
  }
  else{
	odgovor.status(200); 
	odgovor.send(JSON.stringify(data));
  }
  })
  
  server.get("/api/rezervacije/:id", (zahtjev, odgovor) =>{
  
	odgovor.type("json");
	let id = zahtjev.params.id;
  
  let data = reze.dajValute();
  if(data == undefined)
  { 
	odgovor.status(417); 
	odgovor.send(JSON.stringify(
	  {greska: "nevaljani podaci "}
	  ));
  }
  else{
	if(data[id] == undefined){odgovor.status(404); 
	  odgovor.send(JSON.stringify({greska: "nema resursa"}))}
	odgovor.status(200); 
	odgovor.send(JSON.stringify(data[id]));
  }
  })
  
  
	server.post("/api/rezervacije", (zahtjev, odgovor) => {   
	  let podaci = zahtjev.body; 
	  console.log(podaci);
	  odgovor.type("json");   
	  if(podaci==null){
	odgovor.status(417);
	odgovor.send(JSON.stringify({ greska: "nevaljani podaci" }));  
	  } else {
		reze.dodaj(podaci);
		odgovor.status(200);
		odgovor.send(JSON.stringify({ poruka: "Podaci dodani" }));  
	  }   
  });
  
  server.delete("/api/rezervacije/:id", (zahtjev, odgovor) => {   
	odgovor.type("json");   
	let id = zahtjev.params.id;
	if(reze.dajValute(id) == ""){
	  odgovor.status(417);
	  odgovor.send(JSON.stringify({ greska: "Nevaljani podaci" }));  
	}
	else{
	  console.log(reze.dajValute(id));
	reze.brisi(id);
  odgovor.status(200);
	odgovor.send(JSON.stringify({ poruka: "Podaci obrisani" }));       
	}
  });
  
  
  
  server.put('/api/rezervacije',(zahtjev,odgovor) => {
	  odgovor.status(501);
	odgovor.send(JSON.stringify({ greska: "metoda nije implementirana" })); 
  });
  server.delete('/api/rezervacije',(zahtjev,odgovor) => {
	  odgovor.status(501);
	odgovor.send(JSON.stringify({ greska: "metoda nije implementirana" })); 
  });
  server.put('/api/rezervacije/:id',(zahtjev,odgovor) => {
	  odgovor.status(501);
	odgovor.send(JSON.stringify({ greska: "metoda nije implementirana" })); 
  });
  server.post("/api/rezervacije/:id", (zahtjev, odgovor) =>{
	odgovor.status(405);
	odgovor.send(JSON.stringify({ greska: "metoda nije dopuštena" })); 
  })

/*Ovo mora biti na dnu*/
server.use((zahtjev, odgovor) => {
	odgovor.status(404);
	odgovor.send("Stranica nije pronađena!");
});

server.listen(port, () => {
	console.log(`Server pokrenut na portu: ${port}`);
});