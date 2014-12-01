module.exports = {
  options: {
    message: 'default option'
  },
  globbing: {
    options: {
      message: 'glob target'
    },
    src: ['<%= grunt.config.get("src") %>/*.{js,txt}'],
    dest: '<%= grunt.config.get("dest") %>/<%= grunt.task.current.target %>.js'
  },
  compactFormat: {
    options: {
      message: 'compact format target'
    },
    src: ['<%= grunt.config.get("src") %>/example.txt', '<%= grunt.config.get("src") %>/example2.js', '<%= grunt.config.get("src") %>/example3.js'],
    dest: '<%= grunt.config.get("dest") %>/<%= grunt.task.current.target %>.js'
  },
  filesObjectFormat: {
    options: {
      message: 'files object target'
    },
    files: {
      '<%= grunt.config.get("dest") %>/<%= grunt.task.current.target %>.js': ['<%= grunt.config.get("src") %>/example.txt'],
      '<%= grunt.config.get("dest") %>/<%= grunt.task.current.target %>1.js': ['<%= grunt.config.get("src") %>/example2.js', '<%= grunt.config.get("src") %>/example3.js'],
    }
  },
  filesArrayFormat: {
    options: {
      message: 'files array target'
    },
    files: [
      {src: ['<%= grunt.config.get("src") %>/example.txt'], dest: '<%= grunt.config.get("dest") %>/<%= grunt.task.current.target %>.js', nonull: true},
      {src: ['<%= grunt.config.get("src") %>/example2.js', '<%= grunt.config.get("src") %>/example3.js'], dest: '<%= grunt.config.get("dest") %>/<%= grunt.task.current.target %>1.js', filter: 'isFile'},
      {src: '<%= grunt.config.get("src") %>/*.{js,txt}', dest: '<%= grunt.config.get("dest") %>/<%= grunt.task.current.target %>2.js'}
    ]
  },
  dynamicMapping: {
    files: [
      {
        expand: true,     // Enable dynamic expansion.
        cwd: 'test/fixtures/',      // Src matches are relative to this path.
        src: ['*.js'], // Actual pattern(s) to match.
        dest: '<%= grunt.config.get("dest") %>/',   // Destination path prefix.
        rename: function(dest, src) {
          if(global.iterator === 0) {
            global.iterator += 1;
          } else {
            global.iterator = 0;
          }
          return dest + '<%= grunt.task.current.target %>' + (global.iterator ? global.iterator : '') + '.js';
        }
      },
    ]
  }
};
