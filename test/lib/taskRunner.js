var spawn = require('child_process').spawn;

module.exports = function (opts){
  var task = 'test';
  if(opts.target) task += ':' + opts.target;

  var cp = spawn(
    'grunt',

    [ task,
      '--config', JSON.stringify(opts.config),
      '--tasks', 'tasks',
      '--gruntfile', 'test/Gruntfile.js',
      '--base', process.cwd()
    ],

    {
      cwd: process.cwd(),
      stdio: 'inherit'
    }
  );

  cp.on('exit', function(code) {
    opts.done();
  });
};
