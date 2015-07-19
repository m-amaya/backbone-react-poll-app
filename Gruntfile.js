module.exports = function (grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "public/build/style.min.css": "public/src/css/*.less"
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! Grunt Uglify <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      build: {
        src: 'public/build/bundle.js',
        dest: 'public/build/bundle.min.js'
      }
    },

    browserify: {
      options: {
        transform: ['reactify', 'debowerify']
      },
      dev: {
        options: {
          debug: true
        },
        src: [
              'public/src/js/collection/*.js',
              'public/src/js/model/*.js',
              'public/src/js/router/*.js',
              'public/src/js/util/*.js',
              'public/src/js/view/*.js',
              'public/src/js/view/*.jsx',
              'public/src/js/*.js',
              'public/src/js/*.jsx' ],
        dest: 'public/build/bundle.js'
      },
      production: {
        options: {
          debug: false
        },
        src: [
          '<%= browserify.dev.src %>'
        ],
        dest: 'public/build/bundle.js'
      }
    },

    watch: {
      styles: {
        files: ['public/src/css/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      browserify: {
        files: [
              'public/src/js/collection/*.js',
              'public/src/js/model/*.js',
              'public/src/js/router/*.js',
              'public/src/js/util/*.js',
              'public/src/js/view/*.js',
              'public/src/js/view/*.jsx',
              'public/src/js/*.js',
              'public/src/js/*.jsx' ],
        tasks: ['browserify:dev']
      }
    }
  });

  grunt.registerTask('default', ['less', 'browserify:dev', 'watch']);
  grunt.registerTask('package', ['less', 'browserify:production', 'uglify']);

};
