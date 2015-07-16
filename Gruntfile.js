module.exports = function(grunt) {
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
          "public/build/style.css": "public/src/css/style.less"
        }
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
        src: ['public/src/js/*.js', 'public/src/views/*.jsx'],
        dest: 'public/build/bundle.js'
      },
      production: {
        options: {
          debug: false
        },
        src: '<%= browserify.dev.src %>',
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
        files: 'public/src/views/*.jsx',
        tasks: ['browserify:dev']
      }
    }
  });
  
  grunt.registerTask('default', ['less', 'browserify:dev', 'watch']);
  grunt.registerTask('package', ['less', 'browserify:production']);
  
};