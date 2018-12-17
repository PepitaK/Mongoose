var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
const mongoose = require('mongoose');
mongoose.connect('mongodb://123456A:123456A@ds026018.mlab.com:26018/testitietokanta');

const Poni = mongoose.model('ponejas', { Nimi: String, Väri: String, Rotu: String, Säkäkorkeus: String, id: String, Lempi_herkku:String  });


/////kaikki ponit
  app.get('/', function(req, res) {
      res.render("index.ejs");

      console.log("kopoti koo!")
  });


/////kaikki ponit
  app.get('/kaikki', function(req, res) {
      Poni.find({}, function(err, users) {
         res.send({users: users});
      });
      console.log("kopoti koo!")
  });

/////tietty poni
    app.get('/tiettyponi', function(req, res) {
        Poni.findOne({id:"10"}, function(err, users) {
           res.send({users: users});
        });
        console.log("kopoti koo, kympin poni!")
    });


///////// Lisää Poni!
app.post("/lisaa", function(req, res) {
res.send("Tämä lisää uuden ponin");
  const uusiPoni = new Poni({ Nimi: 'Zildjian', Rotu: 'Yksisarvinen', Väri:'Kimo', Säkäkorkeus
  :"130 cm", id: "10", Lempi_herkku:"Rusinat"  });
  uusiPoni.save().then(() => console.log('koppoti koppoti!'));
});


////////////// Päivitä poni!
app.put("/paivita", function(req, res) {
res.send("Tämä muokkaa yhden ponin nimeksi Mika");

const paivitaPoni = Poni.update({ id: "10" }, { $set: { Nimi: 'Mika' }});
  paivitaPoni.findOneAndUpdate().then(() => console.log('koppoti koppoti! 2'));
});


/////// Poista poni!
app.delete("/poista", function(req, res) {
res.send("Tämä poistaa yhden Mika -ponin");

var query = { Nimi: 'Mika' };

const poistaPoni = Poni.findOneAndRemove(query);
  poistaPoni.findOneAndRemove().then(() => console.log('Byee Mika!'));
});

app.listen(process.env.PORT || 8080)
console.log('8080 is the magic port');
