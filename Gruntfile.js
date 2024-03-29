module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: false
                },
                files: {
                    "build/css/general_styles.css": "src/css/general_styles.less",
                    "build/css/max630px.css": "src/css/max630px.less",
                    "build/css/min631px.css": "src/css/min631px.less",
                    "build/css/min900px.css": "src/css/min900px.less"
                }
            }
        },

        autoprefixer: {
            no_dest: {
                src: ["build/css/general_styles.css", "build/css/max630px.css", "build/css/min631px.css", "build/css/min900px.css"]
            }
        },

        uglify: {
            dev: {
                options: {
                    beautify: true
                },
                files: {
                    'build/js/action.min.js': ['src/js/action.js']
                }
            }
        },

        htmlmin: {
            dev: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },

                files: {
                    'build/index.html': 'src/html/index.html'
                }
            }
        },

        watch: {
            less: {
                files: ['src/css/*.less'],
                tasks: ['less', 'autoprefixer']
            },

            htmlmin: {
                files: ['src/html/*.html'],
                tasks: ['htmlmin']
            },

            uglify: {
                files: ['src/js/*.js'],
                tasks: ['uglify']
            }
        },

        'gh-pages': {
            options: {
                base: 'build',
                repo: 'https://github.com/neverhood671/SmartHome.io.git',
                message: 'Auto-generated commit'
            },
            src: ['**/*']
        }
    });


    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-gh-pages');


    grunt.registerTask('default', ['watch']);
    grunt.registerTask('deploy', ['gh-pages']);
};