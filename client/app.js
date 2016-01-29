/**
 * Created by stephenfortune on 28/01/2016.
 */
(function() {
    // some code here
    var PlanetsModel = Backbone.Model.extend({

        defaults: function(){
            return{
                pl_name: "",
                pl_rade: "",
                pl_bmasse: "",
                pl_disc: "",
                rowupdate: ""
            }
        }
    });

    var PlanetsCollection = Backbone.Collection.extend({
        model: PlanetsModel,
        comparator: "rowupdate",
        url: "../fixtures/earthSized.json"
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
            this.$('#planets-table').html('');

            Planets.forEach(function(model) {
                var user = new PlanetView({
                    model: model
                });
                $('#earth_sized_exoplanets').append(user.render().el);
            });

            return this;
        },

        sortCollection: function(e) {
            Planets.comparator = e.target.value;
            Planets.sort();
        }

    });

    var app = new PlanetsView();


})();