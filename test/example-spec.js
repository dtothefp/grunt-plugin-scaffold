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
var taskConfig = require('../grunt/your-task');
var _ = require('lodash');

describe('testing all the targets', function() {
  var i = 0,
    // get the targets from the grunt config for your-task and omit the options key
    targets = Object.keys(taskConfig).filter(function(target) {
      if(target !== 'options') {
        return target;
      }
    });

  this.timeout(40000);

  beforeEach(function(done){
    var configObj = {},
      target = targets[i],
      config;

    clear('test/expected/');

    configObj[target] = taskConfig[target];
    config = {
      'your-task': taskConfig
    };

    runGruntTask({
      target: target,
      config: config,
      done: done
    });
    i += 1;
  });

  describe('test the globbing target', function() {

    it('the glob task contains JSON', function(done){
        var destContent = JSON.parse( fs.readFileSync('test/expected/globbing.js', {encoding: 'utf8'}) );
        expect(typeof destContent).to.equal('object');
        expect(destContent.options.message).to.equal('glob target');
        expect(destContent.srcFiles.length).to.equal(3);
        done();
    });

  });

  describe('test the compactFormat target', function() {
    it('the glob task contains JSON', function(done){
        var destContent = JSON.parse( fs.readFileSync('test/expected/compactFormat.js', {encoding: 'utf8'}) );
        expect(typeof destContent).to.equal('object');
        expect(destContent.options.message).to.equal('compact format target');
        expect(destContent.srcFiles.length).to.equal(3);
        done();
    });

  });

  describe('test the filesObjectFormat target', function() {
    it('the glob task contains JSON', function(done){
      for(var i = 0; i < 2; i++) {
        var destContent = JSON.parse( fs.readFileSync('test/expected/filesObjectFormat' + ( i ? i : '' ) + '.js', {encoding: 'utf8'}) );
        expect(typeof destContent).to.equal('object');
        expect(destContent.options.message).to.equal('files object target');
        expect(destContent.srcFiles.length).to.equal(i + 1);
      }
      done();
    });
  });

  describe('test the filesArrayFormat target', function() {
    it('the glob task contains JSON', function(done){
      for(var i = 0; i < 3; i++) {
        var destContent = JSON.parse( fs.readFileSync('test/expected/filesArrayFormat' + ( i ? i : '' ) + '.js', {encoding: 'utf8'}) );
        expect(typeof destContent).to.equal('object');
        expect(destContent.options.message).to.equal('files array target');
        expect(destContent.srcFiles.length).to.equal(i + 1);
      }
      done();
    });
  });

  describe('test the dynamicMapping target', function() {
    it('the glob task contains JSON', function(done){
      for(var i = 0; i < 2; i++) {
        var destContent = JSON.parse( fs.readFileSync('test/expected/dynamicMapping' + ( i ? i : '' ) + '.js', {encoding: 'utf8'}) );
        expect(typeof destContent).to.equal('object');
        expect(destContent.options.message).to.equal('default option');
        expect(destContent.srcFiles.length).to.equal(1);
      }
      done();
    });
  });

});
