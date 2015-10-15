process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var server = require('../server/app');
var Pokemon = require("../server/database");
var should = chai.should();

chai.use(chaiHttp);


describe('Pokemon', function() {

  Pokemon.collection.drop();

  beforeEach(function(done){
    var pokemon = new Pokemon({
      name: 'Wicket',
      ability: 'awesomeness',
      evolution: 1
    });

    pokemon.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Pokemon.collection.drop();
    done();
  });

  it('should list ALL pokemon on /pokemon GET', function(done) {
    chai.request(server)
    .get('/pokemon')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('ability');
      res.body[0].should.have.property('evolution');
      res.body[0].name.should.equal('Wicket');
      res.body[0].ability.should.equal('awesomeness');
      res.body[0].evolution.should.equal(1);
      done();
    });
  });

  it('should list a SINGLE pokemon on /pokemon/<id> GET', function(done) {
    var newPokemon = new Pokemon({
      name: 'Teek',
      ability: 'speed',
      evolution: 1
    });
    newPokemon.save(function(err, data) {
      chai.request(server)
      .get('/pokemon/'+data.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('ability');
        res.body.should.have.property('evolution');
        res.body.name.should.equal('Teek');
        res.body.ability.should.equal('speed');
        res.body.evolution.should.equal(1);
        res.body._id.should.equal(data.id);
        done();
      });
    });
  });

  it('should add a SINGLE pokemon on /pokemon POST', function(done) {
    chai.request(server)
    .post('/pokemon')
    .send({'name': 'Java', 'ability': 'Script', 'evolution': 1})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.be.a('object');
      res.body.SUCCESS.should.have.property('name');
      res.body.SUCCESS.should.have.property('ability');
      res.body.SUCCESS.should.have.property('evolution');
      res.body.SUCCESS.should.have.property('_id');
      res.body.SUCCESS.name.should.equal('Java');
      res.body.SUCCESS.ability.should.equal('Script');
      res.body.SUCCESS.evolution.should.equal(1);
      done();
    });
  });

  it('should update a SINGLE pokemon on /pokemon/<id> PUT', function(done) {
    chai.request(server)
    .get('/pokemon')
    .end(function(err, res){
      chai.request(server)
      .put('/pokemon/'+res.body[0]._id)
      .send({'name': 'Spider'})
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('UPDATED');
        response.body.UPDATED.should.be.a('object');
        response.body.UPDATED.should.have.property('name');
        response.body.UPDATED.should.have.property('_id');
        response.body.UPDATED.name.should.equal('Spider');
        done();
      });
    });
  });

  it('should delete a SINGLE pokemon on /pokemon/<id> DELETE', function(done) {
    chai.request(server)
    .get('/pokemon')
    .end(function(err, res){
      chai.request(server)
      .delete('/pokemon/'+res.body[0]._id)
      .end(function(error, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('REMOVED');
        response.body.REMOVED.should.be.a('object');
        response.body.REMOVED.should.have.property('name');
        response.body.REMOVED.should.have.property('_id');
        response.body.REMOVED.name.should.equal('Wicket');
        done();
      });
    });
  });
});
