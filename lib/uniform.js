/**
 * Created by stephenfortune on 13/02/2016.
 */
var planets = require('./../fixtures/earthSized.json'); // old location


//console.log(planets.length);
//console.log(planets[planets.length-1]);
//console.log(planets.slice(planets.length-3));
module.exports.recent = function() {
    planets.sort(function (c,d) {
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
    });
    return planets.slice(planets.length-3);
}
