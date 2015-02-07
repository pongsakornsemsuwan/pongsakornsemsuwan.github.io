---
layout: post
title: Node.js learning progress 3 - Restify and Passport(Basic)
---

### I'm embarrassed to admit this but I've spent many hours to make this work
I'm still with node.js but not [Dr.Dave](http://drdave.herokuapp.com) this time. I'm working with my friend on a new idea of mobile application and I'm responsible for backend side.

My friend let me choose backend technology and obviously I chose Node.js (just for learning purpose). Anyways, since this is a mobile app, I don't really care much about view rendering so screw jade and ejs!
I searched for Node REST API stuff and ended up with [restify](http://mcavage.me/node-restify/). The author claims that it's just like express but more focus on web service which is exactly what I want.

I'm happy with restify so far until I start working on authorization part. I pick up [passport.js](http://passportjs.org/) as a package of choice and ues Bsic Strategy which implement [Basic Auth](http://en.wikipedia.org/wiki/Basic_access_authentication). Its reputation is great so why not?

I follow guides/tutorial both for restify and express but it does not seem to work. I cannot explain what's the problem but it just not work. I've tried many alternative routing until I get it to work with the following

{% highlight javascript %}
//server.js
var server = restify.createServer();

server.use(restify.bodyParser());
server.use(passport.initialize());

server.get('/users',
  passport.authenticate('basic',{ session: false}),
  function( req, res ){
      console.log('match');
      res.end('Authorized ja');
  }
);
{% endhighlight %}

Make sure you've require passport and passport-http first. You can define your strategy on the server.js or in a new file, whatever suit you but I prefer having authentication logic in its own file so I have auth.js and require it in server.js
Here's my auth.js

{% highlight javascript %}
//auth.js
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var user = require('./user.js');

passport.use(new BasicStrategy( {failureRedirect:'http://www.google.com'},
  function(username, password, done) {;
    if (username.valueOf() === 'validusername' &&
      password.valueOf() === 'validpassword')
      return done(null, true);
    else
      return done(null, false);
  }
));
{% endhighlight %}


I actually wish I could move passport.authenticate to auth.js, export it and just call 'auth.authenticate' or something but I cannot and I don't know why T_T
If anybody can tell me how to do it please do so. (But I don't have comment section here, hmm..)