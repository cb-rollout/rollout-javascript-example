
#PRE-REQUIREMENTS

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

#SET UP

```
npm init
```

from https://docs.cloudbees.com/docs/cloudbees-rollout/latest/getting-started-guide/javascript-sdk
# Add Rollout JavaScript SDK package as your application dependency
```
 npm i rox-browser --save
```

# Write your rollout intgeration code
See this https://medium.com/jeremy-keeshin/hello-world-for-javascript-with-npm-modules-in-the-browser-6020f82d1072
to learn how to bake CommonJS/AMD  integration code in your application.js

NOTE: adjust your ROLLOUT APPLICATION KEY in  .rollout-integration.js
```
...
  await Rox.setup('<YOUR_ROLLOUT_APP_KEY>', options);
...
```


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
    await Rox.setup('5e95ad1fa6de03e3b693732d', options);
    console.log('setup done.....');
  ....
}
```

# Bake it to a bundle which enables a WebBrowser to execute the resulting JS code. 
```
#or watchify 
 browserify --debug  rollout-integration.js -o rollout-integration-bundle.js
```

# open and test 

```
open index.html 
```

-> Login to rollout UI, search and switch the enableFeatureJavaScript  experiment from true to false . reload the index.html in your browser to see:

* true:  the JavaScript "Quadrat" method is registered as an event listener to the ui elements. You  click and test the behavior. 
* false: the JavaScript "Quadrat" method will not be registered as an event listener . The UI has not JavaAScript to execute for the UI elements
