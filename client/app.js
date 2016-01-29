var Planet = Backbone.Model.extend({
    defaults: {
        pl_name: '',
        pl_rade: '',
        pl_bmasse: '',
        pl_disc: '',
        rowupdate: ''
    }
});
var PlanetsCollection = Backbone.Collection.extend({

    model: Planet,
    url: 'http://localhost:3000/planets',
    comparator: 'rowupdate'

});

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
            console.log(planet);
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

    //template: _.template($('#planet-template').html()),

    render: function() {
        //this.$el.html(this.template(this.model.attributes));
        return this;
    }

});

new PlanetsView();