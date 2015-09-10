var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Pokemon = mongoose.model('pokemons');

router.get('/', function(req, res) {
  res.render('index');
});

// get all pokemon
router.get('/pokemon', function(req, res) {
  Pokemon.find(function(err, pokemon){
    res.json(pokemon);
    console.log(pokemon);
  });
});

//get SINGLE pokemon
router.get('/pokemon/:id', function(req, res) {
  var query = {"_id": req.params.id};
  Pokemon.findOne(query, function(err, pokemon) {
    res.json(pokemon);
  });
});

//post ALL pokemon
router.post('/pokemon', function(req, res) {
  new Pokemon(req.body)
  .save(function(err, pokemon) {
    res.json(pokemon);
  });
});

//put SINGLE pokemon
router.put('/pokemon/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = req.body;
  var options = {new: true};
  Pokemon.findOneAndUpdate(query, update, options, function(err, pokemon) {
    res.json(pokemon);
  });
});

//delete SINGLE pokemon
router.delete('/pokemon/:id', function(req, res) {
  var query = {"_id": req.params.id};
  Pokemon.findOneAndRemove(query, function(err, pokemon) {
    res.json(pokemon);
  });
});

module.exports = router;
