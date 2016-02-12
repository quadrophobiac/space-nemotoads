/**
 * Created by stephenfortune on 03/02/2016.
 */
var Backbone = require('backbone');
var _ = require('underscore');
var data = require('./../../fixtures/earthSized.json');

var Planet = require('./../models/Planet');

var PlanetsCollection = Backbone.Collection.extend({

    model: Planet,
    comparator: 'rowupdate',
    url: '/selected_planets'

    // todo - currently the manner in which this collection coexists with view results in incorrect sorting
    //url:'data/earthSized.json',
    //parse: function(data) {
    //    return (data);
    //}
});

module.exports = function () {
    return new PlanetsCollection();
}