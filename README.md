# speedy-static
Serve your static files with an high-speed middleware

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status](https://coveralls.io/repos/github/weisse/speedy-static/badge.svg?branch=master)](https://coveralls.io/github/weisse/speedy-static?branch=master)

speedy-static is an high-speed middleware that allows you to serve files statically.
It provides some useful options in order to make itself as near as possible to your needs.

### How it works

speedy-static is fully optimized to reach the best performance in serving static resources.

The server side optimizations:
* use a LRU cache in order to limit as more as possible I/O waits generated by filesystem calls
* compress and minimize to reduce up to 70% the size of your source files
* stores already compressed and minimized source files into LRU to save CPU and memory
* can prepare cache to make the middleware start with the most of resources already loaded in memory
* allow the programmer to ignore some resources or an entire tree in order to prevent useless filesystem calls or wasting of cache space

The client side optimizations:
* use conditional headers to prevent the server send multiple times the same resources payload
* prevent the browser to frequently ask the server to validate resources using a validation time


### How to install
```bash
    npm install speedy-static
```


### How to use it
```javascript
    var express = require("express");
    var app = express();

    var speedyStatic = require("speedy-static");

    // if you don't want to prepare cache it returns the middleware
    var middleware = speedyStatic("/path/to/mount");
    app.use("/mount/point", middleware);

    // if you want to prepare cache before having the middleware,
    // it will return you a promise in order to give you the middleware
    // as soon as the cache is prepared
    speedyStatic("/path/to/mount", {"prepare-cache":true})
                .then(function(middleware){
                    app.use("/mount/point", middleware);
                });
```


### API

#### speedyStatic(pathToMount[, options]);
The path to mount is the root path of the static files you want to serve.
The options allows you to make your tuning.


### Options

Name | Description | Default
---|---|---
index | It allows you to define your index files (it works for all the directories) | ["index.html", "index.htm"]
compression | It allows you to serve files compressing them when possible | true
compression-level | It defines the level of the compression [*0=BEST_SPEED,1=DEFAULT_COMRESSION,2=BEST_COMPRESSION*] | 1
minify | It allows you to minimize source files when possibile [*.js,.css,.json*] | false
minify-mangle | It allows you to also mangle minimized source files | true
etag | It produces and sends to the client the ETag header in order to validate further requests of the same resource | true
last-modified | It reads the last modification date and sends to the client the Last-Modified header in order to validate further requests of the same resource | true
content-type | It writes the Content-Type header referred to the requested resource | true
max-cache-size | It defines the size limit (in bytes) of the LRU cache (it supports numeraljs formats) | 104857600 (100MB)
max-cache-age | It defines the expiration time (in milliseconds) of the LRU cache elements | 0 (never expire)
prepare-cache | It prepares the LRU cache before giving the middleware | false
browser-cache | It allows you to use the browser cache to optimize the amount of calls and data | true
browser-cache-max-age | It defines the expiration time (in seconds) of the browser cache resources | 300
browser-cache-s-maxage | It allows you to override the intermediary (such as CDNs) max-age and expires headers | 300
hide-dotfiles | It allows you to hide dotfiles | true
ignore | It allows you to ignore resources. It works with an entire path or a single resource name | [ ]
ignoreRegExp | It allows you to ignore resources defining regular expressions. It works only on file names | [ ]
continue | It allows you to pass the request to the next middleware instead of ending it | false
ignore-errors | It allows you to ignore server errors hiding them with a 404 | false


### Unit testing

To test speedy-static be sure that mocha and istanbul were installed, otherwise you can install them typing

```bash
    npm install -g mocha
    npm install -g istanbul
```

Be also sure that devDependencies was installed, otherwise you can install them jumping into speedy-static directory and typing

```bash
    npm install
```

Then, inside speedy-static directory type the following command.

```bash
    npm test
```

[npm-url]: https://www.npmjs.com/package/speedy-static
[npm-image]: https://img.shields.io/npm/v/speedy-static.svg

[downloads-image]: https://img.shields.io/npm/dm/speedy-static.svg

[travis-url]: https://travis-ci.org/weisse/speedy-static
[travis-image]: https://img.shields.io/travis/weisse/speedy-static.svg
