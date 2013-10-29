module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          "build/test/specs.js": ["test/*.coffee"],
          "build/src/ngQuickDatepicker.js": ["src/aaDatepicker.coffee"],
          "build/demo/demo.js": ["demo/*.coffee"]
        }
      }
    },
    watch: {
      scripts: {
        files: '**/**/*.coffee',
        tasks: ['coffee'],
        options: {
          debounceDelay: 250,
        },
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['coffee', 'watch']);
};