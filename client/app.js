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

    //var UsersView = Backbone.View.extend({
    //
    //    el: '#users',
    //
    //    events: {
    //        'change #sort': 'sortCollection'
    //    },
    //
    //    initialize: function() {
    //        this.listenTo(Users, 'sort', this.render);
    //        Users.fetch();
    //    },
    //
    //    render: function() {
    //        this.$('#users-table__body').html('');
    //
    //        Users.forEach(function(model) {
    //            var user = new UserView({
    //                model: model
    //            });
    //            $('#users-table__body').append(user.render().el);
    //        });
    //
    //        return this;
    //    },
    //
    //    sortCollection: function(e) {
    //        Users.comparator = e.target.value;
    //        Users.sort();
    //    }
    //
    //});

    var PlanetsView = Backbone.View.extend({
        el: "#planets",

        //collection: new PlanetsCollection(),

        initialize: function() {
            var scope = this;
            Planets.fetch({
                success: function() {
                    scope.render();
                }
            });
        },

        render: function() {
            var scope = this;
            Planets.forEach(function(model) {
                scope.output(model);
            });
            return this;
        },

        output: function(model) {
            var row = document.createElement("tr");
            row.innerHTML = "<td>" + model.get("firstname") + "</td>\
                     <td>" + model.get("lastname") + "</td>\
                     <td>" + model.get("email") + "</td>";
            this.el.appendChild(row);
        }
    });

    var app = new PlanetsView();


})();