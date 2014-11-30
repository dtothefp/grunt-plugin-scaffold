var grunt = require('grunt');
var spawn = require('child_process').spawn;
var read = grunt.file.read;
var write = grunt.file.write;
var mkdir = grunt.file.mkdir;
var clear = grunt.file['delete'];
var expand = grunt.file.expand;
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var runGruntTask = require('./lib/taskRunner');
/* jshint ignore:start */
var should = require('chai').should();
var expect = require('chai').expect;
/* jshint ignore:end */
describe('testing your grunt task', function() {
  this.timeout(40000);

  describe('setup some options for your grunt task and run it in a child process', function() {

    var config;
    beforeEach(function(done){
      config = {
        'your-task': {
          sut: {
            options: {
              message: 'I\'ve found'
            },
            src: ['test/fixtures/example.txt'],
            dest: 'test/fixtures/dest.js'
          }
        }
      };

      runGruntTask('your-task', config, done);

    });

    it('checks stuff returned from your task', function(done){
        var destFileExists = fs.existsSync('test/fixtures/dest.js');
        expect(destFileExists).to.be.true;
        done();
    });

  });

});