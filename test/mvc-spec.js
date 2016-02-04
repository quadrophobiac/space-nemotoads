/**
 * Created by stephenfortune on 03/02/2016.
 */
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var Planet = require('./../client/models/Planet');
var PlanetsCollection = require('./../client/collections/PlanetsCollection');

describe('Planet Model', function(){
    var planet = new Planet();

    it('should be a model', function(){
        expect(planet).to.be.ok;
        expect(planet.defaults).to.not.be.undefined;
    });

    it('should have defaults set to empty strings', function(){
        expect(planet.get('pl_name')).to.equal('');
        expect(planet.get('pl_rade')).to.equal('');
        expect(planet.get('pl_bmasse')).to.equal('');
        expect(planet.get('pl_disc')).to.equal('');
        expect(planet.get('rowupdate')).to.equal('');
    });

    it('accepts passed attributes', function(){
        var exoplanets = new Planet({
            "pl_name": "HD 114762 b",
            "pl_rade": "",
            "pl_bmasse": "3710.00000",
            "pl_disc": "1989",
            "rowupdate": "2014-05-14"
        });
        expect(exoplanets.get('pl_name')).to.equal("HD 114762 b");
        expect(exoplanets.get('pl_rade')).to.equal('');
        expect(exoplanets.get('pl_disc')).to.not.equal('');

    });
});

describe('Planets Collection', function(){

    var planets = new PlanetsCollection();

    it("on creation has default values", function () {
        expect(planets).to.be.ok;
        expect(planets).to.have.length(0);
    });

    it("has correct endpoint", function(){
        expect(planets.url).to.equal('http://localhost:3000/planets');
    })

    // -- Omitted in Book. --
    it("should be empty on fetch", function (done) {
        // Stash reference to save context.

        // Before fetch.
        expect(planets).to.be.ok;
        expect(planets).to.have.length(0);

        // After fetch.
        planets.once("reset", function () {
            expect(planets).to.have.length(0);
            done();
        });

        planets.fetch({ reset: true });
    });

});