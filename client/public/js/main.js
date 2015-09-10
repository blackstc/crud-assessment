// add scripts

$(document).on('ready', function() {
  $("#name").focus();
  listPokemon();
});

$('form').on('submit', function(e) {
  e.preventDefault();
  var name = $("#name").val();
  var ability = $("#ability").val();
  var evolution = $("#evolution").val();

  var payload = {
    name: name,
    ability: ability,
    evolution: evolution
  };

  $.post('/pokemon', payload, function(data) {
    $("input", "form").val("");
    $("#all").html("");
    $("#name").focus();
    listPokemon();
  });
});

$(document).on('click', '.delete-button', function(){
  $.ajax({
    method: "DELETE",
    url: 'pokemon/'+$(this).attr('id')
  }).done(function(data) {
    $("#all").html("");
    $( "#results" ).html('Success!');
    listPokemon();
  });
});

$(document).on('click', '.edit-button', function(){
  $.get('/pokemon/'+$(this).attr('id'), function(data){
    $('#name').val(data.name);
    $('#ability').val(data.ability);
    $('#evolution').val(data.evolution);
  });
  $.ajax({
    method: "DELETE",
    url: 'pokemon/'+$(this).attr("id")
  }).done(function(data) {
  });
});


function listPokemon() {
  $.get('/pokemon', function(data) {
    for (var i = 0; i < data.length; i++) {
      $('#all').prepend(
        '<tr>'+
        '<td><a href="#">'+data[i].name+'</a></td>'+
        '<td>'+data[i].ability+'</td>'+
        '<td>'+data[i].evolution+'</td>'+
        '<td><a class="btn btn-danger btn-xs delete-button" id="'+data[i]._id+'" role="button">Delete</a>'+
        '&nbsp;<a class="btn btn-primary btn-xs edit-button" id="'+data[i]._id+'" role="button">Edit</a></td>'+
        '</tr>'
      );
    }
  });
}
