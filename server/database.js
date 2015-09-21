var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Pokemon = new Schema (
  {
    name: String,
    ability: String,
    evolution: Number
  }
);


mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/pokemon");
module.exports = mongoose.model('pokemons', Pokemon);
