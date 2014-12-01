module.exports = {
  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  dev: [
    'Gruntfile.js',
    'tasks/**/*.js'
  ],
  test: [
    'test/*-spec.js'
  ]
};
