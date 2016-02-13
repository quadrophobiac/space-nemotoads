/**
 * Created by stephenfortune on 03/02/2016.
 */
var Backbone = require('backbone');
var _ = require('underscore');
var data = require('./../../fixtures/earthSized.json');


var Planet = require('./../models/Planet');

var PlanetsCollection = Backbone.Collection.extend({

    model: Planet,
    comparator: function (c,d) {
        if (c.pl_disc == d.pl_disc) {
            //console.log("equal years");
            if(Date.parse(c.rowupdate) > Date.parse(d.rowupdate)){
                //console.log("years disc: "+ c.pl_disc+" more recently updated than years disc: "+ d.pl_disc);
                return 1;
            }else if (Date.parse(d.rowupdate) > Date.parse(c.rowupdate)){
                //console.log("years disc: "+ d.pl_disc+" more recently updated than years disc: "+ c.pl_disc);
                return -1;
            }
        }
        if (c.pl_disc > d.pl_disc) {
            return 1;
        }
        if (c.pl_disc < d.pl_disc) {
            return -1;
        }

        // a must be equal to b
        return 0;
    },
    url: '/planets'

    // todo - currently the manner in which this collection coexists with view results in incorrect sorting
    //url:'data/earthSized.json',
    //parse: function(data) {
    //    return (data);
    //}
});

module.exports = function () {
    return new PlanetsCollection();
}