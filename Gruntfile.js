'use strict';

module.exports = function (grunt) {

  /* Task configuration */

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: [ '.grunt/', '_SpecRunner.html', 'coverage/', 'dist/' ]
    },

    watch: {

      src: {
        files: [ 'Gruntfile.js', 'src/**/*.js' ],
        tasks: [ 'jshint:src', 'build' ]
      },

      spec: {
        files: 'spec/**/*.js',
        tasks: 'jshint:spec'
      }
    },

    concat: {

      dist: {
        src: 'src/**/*.js',
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
        options: {
          separator: ';'
        }
      }
    },

    uglify: {

      dist: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>-min.js': 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
        }
      }
    },

    jshint: {

      src: {
        src: [ 'Gruntfile.js', 'src/**/*.js' ],
        options: {
          jshintrc: 'jshint.json'
        }
      },

      spec: {
        src: 'spec/**/*.js',
        options: {
          jshintrc: 'spec/jshint.json'
        }
      }
    },

    jscs: {
      src: [ 'Gruntfile.js', 'spec/**/*.js', 'src/**/*.js' ],
      options: {
        config: 'jscs.json'
      }
    },

    jasmine: {
      src: 'src/**/*.js',
      options: {
        specs: 'spec/**/*-spec.js',
        template: require('grunt-template-jasmine-istanbul'),
        templateOptions: {
          coverage: 'coverage/coverage.json',
          report: 'coverage/'
        }
      }
    }
  });

  /* Load tasks */

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  /* Register tasks */

  grunt.registerTask('test', [ 'jshint', 'jscs', 'jasmine' ]);
  grunt.registerTask('build', [ 'concat', 'uglify' ]);
  grunt.registerTask('default', [ 'clean', 'test', 'build' ]);
}
