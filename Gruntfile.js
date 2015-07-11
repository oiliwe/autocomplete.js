'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    version: grunt.file.readJSON('package.json').version,

    buildDir: 'dist',

    banner: [
      '/*!',
      ' * typeahead.js <%= version %>',
      ' * https://github.com/twitter/typeahead.js',
      ' * Copyright 2013-<%= grunt.template.today("yyyy") %> Twitter, Inc. and other contributors; Licensed MIT',
      ' */\n\n'
    ].join('\n'),

    browserify: {
      options: {
        banner: '<%= banner %>'
      },
      typeahead: {
        src: 'src/typeahead/plugin.js',
        dest: '<%= buildDir %>/typeahead.jquery.js'
      },
      typeaheadMinified: {
        options: {
          plugin: [['minifyify', {map: false}]]
        },
        src: 'src/typeahead/plugin.js',
        dest: '<%= buildDir %>/typeahead.jquery.min.js'
      }
    },

    sed: {
      version: {
        pattern: '%VERSION%',
        replacement: '<%= version %>',
        recursive: true,
        path: '<%= buildDir %>'
      }
    },

    eslint: {
      options: {
        config: '.eslintrc'
      },
      src: ['src/**/*.js', 'Gruntfile.js']
    },

    watch: {
      js: {
        files: 'src/**/*',
        tasks: 'build'
      }
    },

    clean: {
      dist: 'dist'
    },

    connect: {
      server: {
        options: {port: 8888, keepalive: true}
      }
    },

    concurrent: {
      options: {logConcurrentOutput: true},
      dev: ['server', 'watch']
    },

    step: {
      options: {
        option: false
      }
    }
  });

  // aliases
  // -------

  grunt.registerTask('default', 'build');
  grunt.registerTask('build', ['browserify', 'sed:version']);
  grunt.registerTask('server', 'connect:server');
  grunt.registerTask('lint', 'eslint');
  grunt.registerTask('dev', 'concurrent:dev');

  // load tasks
  // ----------

  grunt.loadNpmTasks('grunt-sed');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-step');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-eslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-minifyify');
};
