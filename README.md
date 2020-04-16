This is an example on how CloudBees Rollout can be integrated in your javascript code.

The CloudBees Rollout integration code can be adopted by using NodeJS and browserify to bake a single javascript file which can be executed in a standalone webbrowser, 

Other integration aproaches are suported by Rollout (such as REACT f.e , see Rollout docu) 


This simple JavaScript  Example demonstrates different behaviors of the index.html page depending on how the related feature flag "enableFeatureJavaScript" in Rollout is adjusted  (true or false (or killed) )

To test it:

* Register to rollout and get your Appkey  
* Follow the prerequiremnts below and bake your ROLLOUT_APP_KEY  in a rollout-integration-bundle.js file
* Login to rollout UI, search and switch the `enableFeatureJavaScript` experiment from true to false . 
* Reload the index.html in your browser to see:
  * true:  the JavaScript "Quadrat" method is registered as an event listener to the ui elements. You  click and test the behavior. 
  * false: the JavaScript "Quadrat" method will not be registered as an event listener . The UI has not JavaAScript to execute for the UI elements

# PRE-REQUIREMENTS

Install Node3js
```
brew install node

```

Install browserify with 
```
npm install -g browserify
```

Install watchify with 
```
npm install -g watchify
```

# SET UP

```
npm init
```

from https://docs.cloudbees.com/docs/cloudbees-rollout/latest/getting-started-guide/javascript-sdk
## Add Rollout JavaScript SDK package as your application dependency
```
 npm i rox-browser --save
```

## Rename default file to rollout-integration.js 
See this https://medium.com/jeremy-keeshin/hello-world-for-javascript-with-npm-modules-in-the-browser-6020f82d1072
to learn how to bake CommonJS/AMD  integration code in your application.js

NOTE: adjust your ROLLOUT APPLICATION KEY in  .rollout-integration.js
```
...
  await Rox.setup('<YOUR_ROLLOUT_APP_KEY>', options);
...
```

## and write your rollout intgeration code there

Example
.rollout-integration.js
```
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
    await Rox.setup('XXXX', options);
    console.log('setup done.....');
    
     if (flags.enableFeatureJavaScript.isEnabled()) {
        console.log('enableFeatureJavaScript flag is true');
        // TODO:  Put your code here that needs to be gated
        var los = document.getElementById('los');
        los.addEventListener('click', Quadrat, true);
    }else {
        console.log('enableFeatureJavaScript is disabled');
    }
  ....
}
```

## Bake it to a bundle which enables a WebBrowser to execute the resulting JS code. 
```
#or watchify 
 browserify --debug  rollout-integration.js -o rollout-integration-bundle.js
```

## open and test  

```
open index.html 
```


