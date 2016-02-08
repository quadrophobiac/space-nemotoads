/**
 * Created by stephenfortune on 03/02/2016.
 */
// hard load backbone deps

var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var sinon = require('sinon');


var Planet = require('./../client/models/Planet');
var PlanetsCollection = require('./../client/collections/PlanetsCollection');
//var PlanetsView = require('./../client/views/PlanetsView'); TODO - this is throwing errs

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

    beforeEach(function(){
        this.server = sinon.fakeServer.create();
        this.server.respondWith("GET", "/planets",
            [ 200, {"Content-Type":"application/json"},
            '[{"pl_name": "Kepler-452 b","pl_rade": "1.630","pl_bmasse": "","pl_disc": "2015","rowupdate": "2015-07-23"},{"pl_name": "K2-21 b","pl_rade": "1.590","pl_bmasse": "","pl_disc": "2015","rowupdate": "2015-09-18"}]' ]
        );
        this.planets = new PlanetsCollection();
        console.log(this.planets.url);
        //this.save_stub = sinon.stub(this.planets, "save"); TODO sinon breaking tdd logic
        // using this is the pattern for declaring an object available to all
        //specs within a block of it specs bounded by describe
    });
    afterEach(function(){
        //this.save_stub.restore(); TODO this sinon breaking tdd logic
        this.server.restore();
    })
    //var planets = new PlanetsCollection(); // declare var outside subsequent
    // `it` declarations to keep it available
    // write more tests

    it("on creation has default values", function () {
        expect(this.planets).to.be.ok;
        expect(this.planets).to.have.length(0);
    });

    it("has correct endpoint", function(){
        expect(this.planets.url).to.equal('/planets');
    });

    it("populates with mock array", function(){
        var populate = new PlanetsCollection;
        populate.add(
            [
                {
                    "pl_name": "HD 114762 b",
                    "pl_rade": "",
                    "pl_bmasse": "3710.00000",
                    "pl_disc": "1989",
                    "rowupdate": "2014-05-14"
                },
                {
                    "pl_name": "PSR B1257+12 c",
                    "pl_rade": "",
                    "pl_bmasse": "4.30000",
                    "pl_disc": "1992",
                    "rowupdate": "2015-04-30"
                }
            ]
        );
        expect(populate).to.be.ok;
        console.log(populate.models);
        expect(populate).to.have.length(2);
    });

    it('fetches from endpoint', function(){
        // TODO the correct way of testing this aspect of Backbone Collections is TBD
        expect(this.planets).to.have.length(0);
        this.planets.fetch();
        server.respond();
        expect(this.planets).to.have.length(0);
    })

    // -- Omitted in Book. --
    it.skip("should be empty on fetch", function (done) {
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