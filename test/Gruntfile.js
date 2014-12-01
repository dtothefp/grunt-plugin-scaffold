var _ = require('lodash');

module.exports = function(grunt) {
  var parsedConfig = JSON.parse(grunt.option("config" || {})),
    devConfig = {config: require('../grunt/config')};

  grunt.initConfig(_.assign(parsedConfig, devConfig));

  grunt.loadNpmTasks('grunt-config');

  grunt.registerTask('test', function(target) {
    var task = 'your-task';
    if (target) task += ':' + target;

    grunt.task.run([
      'config:dev',
      task
    ]);
  });
};
