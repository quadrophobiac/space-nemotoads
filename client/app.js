var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
//var Planet = require('./models/Planet');
var PlanetsCollection = require('./collections/PlanetsCollection');
//var PlanetsView = require('./views/PlanetsView');
//TODO modularise the below into proper dir structure

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

var PlanetView = Backbone.View.extend({

    tagName: 'tr',

    template: _.template($('#planet-template').html()),

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }

});

new PlanetsView();