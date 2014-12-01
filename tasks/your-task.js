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
var _ = require('lodash');

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
      done = spawnChildProcess ? this.async() : null,
      // double check that ish, depending upon source mappings in config this can get weird
      srcFiles = this.filesSrc || this.files.src || this.files[0].orig.src;

    this.files.forEach(function(file){
      /* do stuff with your file mappings */
      // seems like this file.src is some sort of immutable 'Getter' structure
      // this is a weird problem for Stack O, filter works on the getter but not when run through the child process
      var fileSrc = file.src.length > 0 ? file.src : file.orig.src,
        contents = fileSrc.filter(function(filepath) {
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        }).map(function(filepath) {
          var contentObj = {},
            filename = filepath.substr(filepath.lastIndexOf('/') + 1, filepath.length),
            split = filename.split('.')[0];

          // Read and return the file's source.
          contentObj[split] = filename;
          srcFiles.push(filename);
          grunt.file.write(filepath, filename);
          //return contentObj;
          return filename;
        });

      var parsedConfig = {
        srcFiles: contents,
        options: options
      };

      //contents.push({options: options});
      //grunt.file.write(file.dest, JSON.stringify( _.assign.apply(_, contents) ));
      grunt.file.write(file.dest, JSON.stringify(parsedConfig));
      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
      });

      if(spawnChildProcess) {
        var cp = spawn('node', args, opts);

        cp.on('close', function (code) {
          console.log('child process finished: ' + code);

          done();
        });
      }
    });

};
