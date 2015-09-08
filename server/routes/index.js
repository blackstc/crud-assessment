var express = require('express');
var router = express.Router();

// get all pokemon
router.get('/pokemon', function(req, res) {
  Pokemon.find(function(err, pokemon){
    res.json(pokemon);
  });
});

module.exports = router;
