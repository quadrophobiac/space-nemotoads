/**
 * Created by stephenfortune on 03/02/2016.
 */
var Backbone = require('backbone');
var Planet = Backbone.Model.extend({
    defaults: {
        pl_name: '',
        pl_rade: '',
        pl_bmasse: '',
        pl_disc: '',
        rowupdate: ''
    }
});

module.exports = function (opt) {
    return new Planet(opt);
}