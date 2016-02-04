/**
 * Created by stephenfortune on 03/02/2016.
 */
var Backbone = require('backbone');

var Planet = require('./../models/Planet');

var PlanetsCollection = Backbone.Collection.extend({

    model: Planet,
    url: 'http://localhost:3000/planets',
    comparator: 'rowupdate'

});

module.exports = function () {
    return new PlanetsCollection();
}