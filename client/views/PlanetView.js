/**
 * Created by stephenfortune on 03/02/2016.
 */
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

var PlanetView = Backbone.View.extend({

    tagName: 'tr',

    template: _.template($('#planet-template').html()),

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }

});
module.exports = function (opt) {
    return new PlanetView(opt);
}