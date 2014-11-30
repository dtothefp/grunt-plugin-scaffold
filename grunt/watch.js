module.exports = {
  options: {
    spawn: false,
  },
  dev: {
    files: [
      './tasks/**/*.js',
      'Gruntfile.js'
    ],
    tasks: ['jshint:dev']
  }
};
