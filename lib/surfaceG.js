/**
 * Created by stephenfortune on 06/02/2016.
 */
// ref = http://forum.kerbalspaceprogram.com/index.php?/topic/99336-how-do-i-calculate-the-surface-gravity-of-a-planet/
// https://www.wolframalpha.com/input/?i=surface+gravity

// 1 Earth Mass : (5.97219±0.0006)×10^24 kg
// 1 Units of radius of the Earth = 6,371 kilometers : 6.38x10^6m.

// constants
var G = 6.67384e-11;
var EM = 5.98*Math.pow(10,24);
var ER = 6.38*Math.pow(10, 6);

//console.log(surfaceGravity(1,1,1)); // should return 9.804729513271294

module.exports.surfaceGravity = function(planetMass, radius, newtonsPerMass){
    radius = parseFloat(radius);
    planetMass = parseFloat(planetMass);
    newtonsPerMass = 1; // Use a value of 1 for m2 and that'll give you how many newtons of force act on a 1kg mass.
    if(isNaN(planetMass)){
        return "0";
    } else {
        var mappedMass = planetMass * EM;
        var mappedRadius = radius * ER;
        var numerator = G * mappedMass * newtonsPerMass;
        var denominator = Math.pow(mappedRadius, 2);
        var gravForce = numerator / denominator;
        return (gravForce/9.8).toFixed(2); // surface gravity
    }
}
