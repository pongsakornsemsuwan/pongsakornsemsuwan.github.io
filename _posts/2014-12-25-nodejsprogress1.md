---
layout: post
title: Node.js learning progress 1 - Basic stuff + Locomotive
---

### Merry Christmas!  
Lately I've been busy with learning Node.js and javascript stuff. So I think it might be a good idea to share the progress of my learning.  

I've been working with Java as a Web App developer since I graduated. So, when I step into Node.js world I tend to follow the same old project structure of Java. I first tried to search for an MVC framework which I end up with [locomotive](http://locomotivejs.org/) which is based on Express.  

I like to learn by experience so I create a website called SongAnalyzer for this project. The web site is really simple. It has only 2 features. The first one is Keyfinder. The site will take chords as input and try to analyze it and return the most compatible key of those chords. The second one is Analyze Chord Progression. It also takes chords as input but this time it will try to analyze the chord progression and see if it's one of the common chord progressions or not.  

In order to analyze chord progression, we have to know the key first which we can retrieve by using our own keyfinder. The second thing to decide is how should we store common chord progression data. Since I'm very new to Node.js and never had an experience with MongoDB/Mongoose, I choose to store chord progression in a properties file using [this module](https://github.com/gagle/node-properties).
Once the program read the properties file, it will create a [tree](https://github.com/joaonuno/tree-model-js) and keep that tree in memory. Then we do travese and split chords in to progression..

You can see the demo [here](http://songanalyzer.herokuapp.com). It's on heroku.

Now that I gain some knowledge and basic stuff of Node.js. Next thing I wanna do is to improve this site. However, while I was working on locomotive, I somehow felt that this is not the way Node.js is supposed to be used. Node.js should not be used as a Servlet and render html. Instead, it should be used as web service that contain many services and expose those little services to frontend. If we're going to make website using Node.js, it's supposed to be full AJAX. Again, this is purely my opinion and I might be wrong. The concept of full AJAX seems to go well with [MEAN.JS](http://meanjs.org/). This stack encourages me to decide that the next thing I gonna do is to ditch this locomotive and simply use Express + Angular instead!

### Things I hate about Node.js so far
1. Asynchronous.
Asynchronous is good but there're times that I wish there is another option. Some Node.js core such as readFile give us an option to choose asyn/syn but third-party sometimes does not provide such option.
