// Write your JavaScript code here!
var planets = [ 
        ['Pluto', 0.06], 
        ['Neptune', 1.148], 
        ['Uranus', 0.917], 
        ['Saturn', 1.139], 
        ['Jupiter', 2.640], 
        ['Mars', 0.3895], 
        ['Moon', 0.1655], 
        ['Earth', 1], 
        ['Venus', 0.9032], 
        ['Mercury', 0.377], 
        ['Sun', 27.9] 
    ];

//get the <select> element from HTML
const planetSelect = document.getElementById("planets");

//reverse planets array
const planetsReversed = planets.reverse();

//populate the HTML <select> element with options from the "planets" array
planetsReversed.forEach(function(planet) {
    var planetList = document.createElement("option");
    planetList.value = planet[0];
    planetList.text = planet[0];
    planetSelect.appendChild(planetList);
});

function calculateWeight(weight, planetName) {
    //takes users weight from HTML input
    //takes selected planet from HTML dropdown        
    //find the planet in the "planets" array and return gravity factor?
    for (var i = 0; i < planets.length; i++) {
        if (planets[i][0] === planetName) {
            var gravityFactor = planets[i][1];
            return gravityFactor * weight
        }
        
    }
}

//possibility to disable calculate button unless weight and planet are filled in?

function handleClickEvent(e) {
    //get user weight from html input field
    var userWeight = document.getElementById("user-weight").value;
    //get selected planet from dropdown
    var selectedPlanet = document.getElementById("planets").value;
    //calculate weight on selected planet
    var result = calculateWeight(userWeight, selectedPlanet);
    //display result in HTML
    var resultDisplay = document.getElementById("output");
resultDisplay.innerHTML = `
  If you were on <span class="planet-name">${selectedPlanet}</span>, you would weigh <span class="planet-weight">${result.toFixed(2)}lbs</span>!
`;


}

document.getElementById("calculate-button").onclick = handleClickEvent;

