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

    events: {
        'change #sort': 'sortCollection'
    },

    initialize: function() {
        this.listenTo(Planets, 'sort', this.render);
        Planets.fetch();
    },

    render: function() {
        this.$('#planets-table__body').html('');

        Planets.forEach(function(model) {

            var planet = new PlanetView({
                model: model
            });
            //console.log(planet);
            $('#earth_sized_exoplanets').append(planet.render().el);
        });

        return this;
    },

    sortCollection: function(e) {
        Planets.comparator = e.target.value;
        Planets.sort();
    }

});
module.exports = function (opt) {
    return new PlanetsView(opt);
}