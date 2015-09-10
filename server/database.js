var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Pokemon = new Schema (
  {
    name: String,
    ability: String,
    evolution: Number
  }
);

mongoose.model('pokemons', Pokemon);

mongoose.connect('mongodb://localhost/pokemon');
