/*
 * grunt-injector
 * https://github.com/dfox-powell/grunt-injector
 *
 * Copyright (c) 2014 dtothefp
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  //jit-grunt loads only the npm tasks required for the grunt task.
  require('load-grunt-config')(grunt, {
    jitGrunt: {
        staticMappings: {
          mochaTest: 'grunt-mocha-test'
        },
        customTasksDir: 'tasks'
    },
    init: true
  });

  grunt.registerTask('default', ['jshint:dev', 'your-task']);

  grunt.registerTask('dev', ['jshint:dev', 'watch:dev']);

  grunt.registerTask('test', ['jshint:test', 'mochaTest']);

};
