/**
 * Created by stephenfortune on 03/02/2016.
 */
var Backbone = require('backbone');
var _ = require('underscore');

var Planet = require('./../models/Planet');

var PlanetsCollection = Backbone.Collection.extend({

    model: Planet,
    comparator: 'rowupdate',
    url: '/planets'
});

module.exports = function () {
    return new PlanetsCollection();
}