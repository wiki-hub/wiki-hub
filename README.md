Wikihub
=======

Wikihub is a small library that allows GitHub to be used as a wiki. It provides two methods, `load` which loads the text from a file on GitHub and `save` which commits changes to a file, creating a fork for the repository if necessary, and submits a pull request to the repo's origin.

Usage
-----

Copy the [`wikihub.min.js`](http://raw.githubusercontent.com/mushishi78/wikihub/master/dist/wikihub.min.js) file from the dist folder into your project.

This exposes the `wikihub` object globally.

### Load

``` javascript
wikihub
  .load({
    token: 'h38d8h48fj49fji39903kfg84hhf84994jff8940',
    owner: 'jake-cool-user',
    repo: 'awesome-wiki',
    branch: 'master',
    path: '_posts/2015-08-01-whatever-happened-happened.md'
  })
  .then(function(text) {
    /* ...do something with text */
  })
  .catch(function(err) {
    /* ...something went wrong */
  });
```

### Save

``` javascript
wikihub
  .save({
    token: 'h38d8h48fj49fji39903kfg84hhf84994jff8940',
    owner: 'jake-cool-user',
    repo: 'awesome-wiki',
    branch: 'master',
    path: '_posts/2015-08-01-whatever-happened-happened.md',
    text: 'This is what this post should really be about.',
    message: 'Changed the begining to be clearer'
  })
  .then(function() {
    /* ...changes have been commited and a PR made */
  })
  .catch(function(err) {
    /* ...something went wrong */
  });
```

Contributing
------------

1. [Fork it](https://github.com/mushishi78/wikihub/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request