/**
 * Created by stephenfortune on 03/02/2016.
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var PlanetView = require('./PlanetView');
var PlanetsCollection = require('./../collections/PlanetsCollection');
var Planets = new PlanetsCollection();

var PlanetsView = Backbone.View.extend({

    el: '#planets',

    initialize: function() {
        this.listenTo(Planets, 'sort', this.render);
        Planets.fetch();
    },

    render: function() {
        this.$('#planets-table__body').html('');

        for(var i = 0; i < 3; i++){
            var aPlanet = Planets.pop();
            var planet = new PlanetView({
                model: aPlanet
            });
            console.log(planet);
            $('#earth_sized_exoplanets').append(planet.render().el);
        }

        //Planets.forEach(function(model) {
        //
        //    var planet = new PlanetView({
        //        model: model
        //    });
        //    console.log(planet);
        //    $('#earth_sized_exoplanets').append(planet.render().el);
        //});

        return this;
    },

    sortCollection: function(e) {
        Planets.comparator = e.target.value;
        //TODO - something is happening with the sort function that adds more models to the collection
        Planets.sort();
    }

});
module.exports = function (opt) {
    return new PlanetsView(opt);
}