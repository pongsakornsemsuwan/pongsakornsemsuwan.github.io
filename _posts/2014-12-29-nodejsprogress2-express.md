---
layout: post
title: Node.js learning progress 2 - Express
---

### Here comes the polar express
As I mentioned in my [previous post](http://pongsakornsemsuwan.github.io/2014/12/25/nodejsprogress1/), I'm learning to write a Node.js web application using [MEAN](http://meanjs.org/) stack now.

Whereas it seems like MEAN.js provides all we want in single package, I prefer to learn a framework one by one. Also, from GitHub repository, if I want to use MEAN I'll need to use bower and grunt which I'm not familiar with. So, I'll just start with a simple [Express](http://expressjs.com/).

Express can be installed using

    $ npm install express --save

the --save command means that we want to add express to dependency list in package.json. There also is a express-generator which act like a scaffolding/skeleton helper to make it easier to create an app structure. You can follow the guide [here](http://expressjs.com/starter/generator.html).

From what I see, express is pretty simple and minimal, the only thing that I feel like I need to think is how should we route incoming requests. The site provide us [several ways](http://expressjs.com/starter/faq.html) of doing that. Though, sometimes it means more problems to have many options. However, since my app is pretty simple (about 5 pages), I'll go with [the simplest one](http://expressjs.com/starter/basic-routing.html). In the future, I might try the [Namespace routing](https://github.com/expressjs/express-namespace?_ga=1.134284273.1203864909.1418805304)

Here's how my directories looks like now.

![Structure]({{ site.baseurl }}public/images/express_structure.jpg)

Admittedly, this is not the best structure. Later I might consider creating a new directory and put 'views','model','service' there but I'll just leave if like this for now.

You can see the demo [here](http://drdave.herokuapp.com). It's not working yet, still need to implement Angular.js. and since Angular is on the edge of change, I'm considering waiting for Angular 2.0.

Next thing on my mind while I wait for new Angular is [Mongoose](http://mongoosejs.com/). Give me


### Node.js pitfall #1
1. For loop does not work the way you expect.