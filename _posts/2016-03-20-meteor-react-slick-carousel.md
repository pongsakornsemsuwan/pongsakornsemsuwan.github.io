---
layout: post
title: Using slick carousel with Meteor React
---

This post is about using slick carousel https://github.com/akiran/react-slick
with Meteor React framework. It also can apply with other React component that relies on CommonJS.

### What you'll need
* [browserify](https://atmospherejs.com/cosmos/browserify)
* [meteorhacks:npm](https://atmospherejs.com/meteorhacks/npm)
* [react-slick](https://github.com/akiran/react-slick) npm package
* [externalify](https://www.npmjs.com/package/externalify) a browserify transformer
* [bower](https://github.com/mquandalle/meteor-bower) bower package for meteor


### So, let's get started.
I'm learning meteor framework with react.js and trying to put a carousel to my website. I decide to go with slick carousel http://kenwheeler.github.io/slick/ react port which seems easy to use.

Problem is react-slick component made an assumption that we'll use CommonJS module, like this:

{% highlight javascript %}
	var React = require('react');
	var Slider = require('react-slick');
{% endhighlight %}

which make sense because the carousel comes before meteor see the world.

So, in order to make use or existing react component that relies on CommonJS, I need to add this meteor package : `meteor add cosmos:browserify`

this browserify will make the `require('modulename')` things work on client side.

*the `require` is a module loader command which originally is made for node.js server side. Browserify will make this command works on client side*

Let's create a file name */lib/app.browserify.js* -- the browserify.js suffix is required. Then put this code in it.

{% highlight javascript %}
//app.browserify.js
//we do not required 'react' here because we will use meteor version
Slider = require('react-slick');
{% endhighlight %}

This will make Slider available in global scope so you can use it in your react component.

<blockquote>I'm not sure if lib is a right place to put the browserify file because lib is shared to both server and client whereas browserify is meant to be used for client only. I might move it later</blockquote>

### But we don't have react-slick module yet
Now that we have browserfiy ready in Meteor side, let's start making use of node package by first adding `meteor add meteorhacks:npm` and then `npm install react-slick`. This should list a react-slick module (that we require in previous step) in your package.json.
If you run `npm list` now, You'll see react-slick as well as react in its dependency.

Now go to your browser and run your code, hopefully there will not be an error like `ReferenceError: require is not defined` because we already add browserify package.

What you will get is an error : *you have multiple copies of React loaded*. This is because we already have react package in meteor and it conflicts with npm react that is in dependency or react-slick.

### You have multiple copies of React loaded
To solve this, we need to use npm package `externalify`. Go run `npm install externalify` in your console. Once it is installed, create a file called */lib/app.browserify.options.json* and put this config in it

{% highlight json %}
    {
      "transforms": {
        "externalify": {
          "global": true,
          "external": {
            "react": "React.require",
            "react-dom": "React.require"
          }
        }
      }
    }
{% endhighlight %}

This is a browserify *transformer* which will transfer 'react' and 'react-dom' require to use meteor's react version. This will solve *you have multiple copies of React loaded* error.

Go back to browser and run your code, it should work now but not so nice.

### Adding stylesheet for slick carousel
You will need one more component in order to make it work. It's a stylesheet. To install it, the author suggest us to use *bower*. Meteor also has a bower package so let's add it `meteor add mquandalle:bower` once you install it. create a file *.bowerrc* in your root folder and put below code it in. This will enable bower command in your command line.

    {
      "directory": ".meteor/local/bower"
    }

Now run `bower init` to create a bower.json file. You can spam enter to use default value. After that, `bower install --save slick-carousel` to install slick-carousel stylesheet. It will be list in bower dependency as well so that other dev can install it.

*You'll need git in your PATH in order to install slick-carousel*

### THAT'S IT.
Hopefully, your slick carousel should work now. It seems tiredsome for just a carousel but browserify, npm and bower are actually a common tool and can be used for other package/component that you might need in future.

Hope this blog post help you!
