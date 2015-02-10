---
layout: post
title: Node.js 4 - Passport custom callback
---

In my [previous post](http://pongsakornsemsuwan.github.io/2015/02/06/restify-with-passport/), I wrote about how to use passport authentication with Basic Strategy. One thing that bugged me was I cannot return a result right from passport callback.
Below is the code from my previous post.

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

You can see that after we authenticate user, we proceed to the function(req,res){ block. In this block, we have to query information for user again which is redundant work.
We can avoid this by using Passport custom callback as below

{% highlight javascript %}
//passport custom callback
server.post('/auth',
  function(req, res, next) {
    passport.authenticate('basic', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.send({ status:"error" , message: 'Incorrect username/password'});
        return res.end();
      }
      res.send(user);
      res.end();

    })(req, res, next);
  }
);
{% endhighlight %}

{% highlight javascript %}
passport.use(new BasicStrategy(
  function(username, password, done) {

    userService.login(username,password, function(err, user, info){
      return done(null, user);
    });
  }
));
{% endhighlight %}

With this, we can authenticate user and return the result to respond at the same time.
However, this might not be your desired behavior for Passport Strategy because it's against [Single responsibility principle](http://en.wikipedia.org/wiki/Single_responsibility_principle).

In the end, it's up to you to decide which one suits you most.
Until next time!