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

var egExo = {
    "pl_name": "Kepler-20 f",
    "pl_rade": 1.030,
    "pl_bmasse": 14.30000,
    "pl_disc": "2011",
    "rowupdate": "2014-05-14"
};

var ag = surfaceGravity(egExo["pl_bmasse"],egExo["pl_rade"]);
console.log(ag);
surfaceGravity(1,1,1); //

function surfaceGravity(planetMass, radius, newtonsPerMass){
    newtonsPerMass = 1; // Use a value of 1 for m2 and that'll give you how many newtons of force act on a 1kg mass.
    var mappedMass = planetMass*EM;
    var mappedRadius = radius*ER;
    var numerator = G*mappedMass*newtonsPerMass;
    var denominator = Math.pow(mappedRadius, 2);
    var gravForce = numerator/denominator;
    return gravForce;
}