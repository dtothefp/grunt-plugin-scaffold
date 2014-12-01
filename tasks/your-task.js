/*
 * grunt-your-task
 * https://github.com/ron-jeremy/grunt-your-task
 *
 * Copyright (c) 2014 ronJ
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');
var fs = require('fs');
var spawn = require('child_process').spawn;

module.exports = function(grunt) {

  grunt.registerMultiTask('your-task', 'The best Grunt plugin ever.', function() {
    var spawnChildProcess = false,
      // if you wanna do some child process ish
      opts = {
        cwd: process.cwd(),
        stdio: 'inherit'
      },
      // your grunt options
      options = this.options({
        /* default options here */
      }),
      args = spawnChildProcess ? [ path.join(__dirname, '..', 'node_modules', '/* path to your executable file */') ] : null,
      done = this.async(),
      sourceFiles = [],
      srcFiles = this.filesSrc || this.files.src || this.files[0].orig.src;

    this.files.forEach(function(file){
      /* do stuff with your file mappings */
      // seems like this file.src is some sort of immutable 'Getter' structure
      // this is a weird problem for Stack O, filter works on the getter but not when run through the child process
      var fileSrc = file.src.length > 0 ? file.src : file.orig.src;
      fileSrc.filter(function(f) {
        var exampleText = options.message + ' ' + fs.readFileSync(path.join(process.cwd(), '/', f), {encoding: 'utf8'});
        fs.writeFileSync(file.dest, exampleText);
      });
    });

    if(spawnChildProcess) {
      var cp = spawn('node', args, opts);

      cp.on('close', function (code) {
        console.log('child process finished: ' + code);

        done();
      });
    } else {
      done();
      /* do stuff here */
    }

  });

};
