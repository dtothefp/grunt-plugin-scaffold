module.exports = {
  options: {
    message: 'I\'ve found'
  },
  compactFormat1: {
    src: ['test/fixtures/example.txt'],
    dest: 'test/fixtures/something.js'
  },
  compactFormat2: {
    src: ['test/fixtures/example.txt', 'test/fixtures/example2.js', 'test/fixtures/example3.js'],
    dest: 'test/fixtures/something.js'
  },
  filesObjectFormat: {
    files: {
      'dest/a.js': ['test/fixtures/example.txt'],
      'dest/a1.js': ['test/fixtures/example2.js', 'test/fixtures/example3.js'],
    }
  },
  filesArrayFormat: {
    files: [
      {src: ['test/fixtures/example.txt'], dest: 'dest/b/', nonull: true},
      {src: ['test/fixtures/example2.js', 'test/fixtures/example3.js'], dest: 'dest/b1/', filter: 'isFile'},
      {src: 'text/fixtures/example.txt', dest: 'build/a.min.js'}
    ]
  },
  dynamicMapping: {
    files: [
      {
        expand: true,     // Enable dynamic expansion.
        cwd: 'test/',      // Src matches are relative to this path.
        src: ['fixtures/*.js'], // Actual pattern(s) to match.
        dest: 'build/',   // Destination path prefix.
        ext: '.min.js',   // Dest filepaths will have this extension.
        extDot: 'first'   // Extensions in filenames begin after the first dot
      },
    ]
  }
};
