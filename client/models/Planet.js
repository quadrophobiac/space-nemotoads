/**
 * Created by stephenfortune on 03/02/2016.
 */
var Backbone = require('backbone');
var gravity = require('./../../lib/surfaceG');

console.log(gravity.surfaceGravity(1,1,1));

var Planet = Backbone.Model.extend({
    defaults: {
        pl_name: '',
        pl_rade: '',
        pl_bmasse: '',
        pl_disc: '',
        rowupdate: '',
        gravity: '0'
    }
    ,
    initialize: function(){
        //this.set('gravity', gravity.surfaceGravity(this.get('pl_bmasse'),this.get('pl_rade')));
    }
});


module.exports = function (opt) {
    return new Planet(opt);
}