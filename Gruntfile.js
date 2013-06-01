module.exports = function (grunt) {

    /* Task configuration */

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {

            src: {

                files: 'src/**/*.js',
                tasks: ['jshint:src', 'build'],
                options: {

                    nospawn: true

                }
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

                },

                options: {

                    report: 'min'

                }
            }
        },

        jshint: {

            src: {

                src: ['Gruntfile.js', 'src/**/*.js'],
                options: {

                    jshintrc: 'jshint.json'

                }
            },

            tests: {

                src: 'spec/**/*.js',
                options: {

                    jshintrc: 'spec/jshint.json'

                }
            }
        },

        jasmine: {

            src: 'src/**/*.js',
            options: {

                specs: 'spec/**/*-spec.js'

            }
        }
    });

    /* Load tasks */

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    /* Register tasks */

    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('default', ['test', 'build']);
}
