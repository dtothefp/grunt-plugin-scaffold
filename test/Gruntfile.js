module.exports = function(grunt) {
  console.log(grunt.option("config"));
  grunt.initConfig(JSON.parse(grunt.option("config" || {})));
};
