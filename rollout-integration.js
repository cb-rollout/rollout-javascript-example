const Rox = require('rox-browser');

const flags = {
    enableFeatureOne : new Rox.Flag(),
    enableFeatureJavaScript : new Rox.Flag(),

};

async function initRollout() {
    const options = {  }
    console.log('initRollout');
    // Register the flags with Rollout
    Rox.register('default', flags);
    console.log('register.....');
    // Setup the Rollout key
    await Rox.setup('5e95ad1fa6de03e3b693732d', options);
    console.log('setup done.....');
    // Boolean flag example
    if (flags.enableFeatureJavaScript.isEnabled()) {
        console.log('enableFeatureJavaScript flag is true');
        // TODO:  Put your code here that needs to be gated
        var los = document.getElementById('los');
        los.addEventListener('click', Quadrat, true);
    }else {
        console.log('enableFeatureJavaScript is disabled');
    }
}

initRollout().then(function() {
    console.log('Done loading Rollout');
});


function Quadrat() {
    var Eingabe  = document.getElementById('Eingabe');
    var Ergebnis = Eingabe.value * Eingabe.value;
    alert("Das Quadrat von " + Eingabe.value + " = " + Ergebnis);
    Eingabe.value = 0;
}


//var los = document.getElementById('los');
//los.addEventListener('click', Quadrat, true);
