# Goal
This is an example of how [CloudBees Rollout](https://docs.cloudbees.com/docs/cloudbees-rollout/latest/getting-started-guide/)  can be integrated into your plain JavaScript code. (Plain means: without using modern JS Frameworks such as REACT, NodeJS, AngualrJS etc.)  

The [CloudBees Rollout](https://docs.cloudbees.com/docs/cloudbees-rollout/latest/getting-started-guide/) integration code can be adopted by using NodeJS and browserify to bake a single javascript file which can be executed in a standalone web browser 

By doing this the instruction from [CloudBees Rollout Client-Side JavaScript SDK ](https://docs.cloudbees.com/docs/cloudbees-rollout/latest/getting-started-guide/javascript-sdk) was followed


Other integration approaches are supported by Rollout (such as REACT f.e , see Rollout docu) 


This simple  [JavaScript  Example](default.rollout-integration.js) demonstrates different behaviors of the index.html page depending on how the related feature flag "enableFeatureJavaScript" in Rollout is adjusted  (true or false (or killed) )

The samples in the [default.rollout-integration.js](default.rollout-integration.js) and [index.html](index.html)  illustrates how the Rollout glue code (which is CommonJS/AMD confirm) can be integrated into your custom JS code.
With the help of NodeJS, pm, and browserify we can call a working rollout feature flag example on a local index.html at the end. 


## Run and test it!

* [Register to Rollout](https://app.rollout.io/) and get your [ROLLOUT_APP_KEY](https://app.rollout.io/) for the application you have created there.  
* Follow the requirements below and bake your ROLLOUT_APP_KEY  in a rollout-integration-bundle.js file
* Login to rollout UI, search and switch the `enableFeatureJavaScript` experiment from true to false. Create a Rollout account and an experiment with the enableFeatureJavaScript if not already done. 
* Reload the index.html in your browser to see:
  * *true*:  the JavaScript "Quadrat" function is registered as an event listener to the UI elements. You are able to click and test the enabled JavaScript behavior (defined in the Quadrat function). 
  * *false*: the JavaScript "Quadrat" function will not be registered as an event listener. The UI has not javascript to execute for the UI elements
  
 See the `function Quadrat() ` in [default.rollout-integration.js](default.rollout-integration.js) to get an understanding of this "Quadrat" function. . 

# Pre requirements

Install Node.js
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

Checkout this repostory and go the project root dir

```

cd rollout-javascript-example/
npm init
```

from https://docs.cloudbees.com/docs/cloudbees-rollout/latest/getting-started-guide/javascript-sdk
## Add Rollout JavaScript SDK package as your application dependency

```
 npm -i rox-browser --save
```

## Rename default file to rollout-integration.js 
See this https://medium.com/jeremy-keeshin/hello-world-for-javascript-with-npm-modules-in-the-browser-6020f82d1072
to learn how to bake CommonJS/AMD  integration code in your application.js if not stay on modern JS Frameworks such as REACT , AngularJS, NodeJS etc. 

```
cp default.rollout-integration.js rollout-integration.js
```

NOTE: adjust your ROLLOUT_APP_KEY in  .rollout-integration.js

```
  await Rox.setup('<YOUR_ROLLOUT_APP_KEY>', options);
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

Keep in your mind that the `rollout-integration-bundle.js`  is refernced in the `index.html` file

```
 <script src="rollout-integration-bundle.js"></script>
```

```
open index.html 
```


