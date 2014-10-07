module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          "dist/ng-quick-date.js": ["src/*.coffee"]
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          "dist/ng-quick-date.min.js": "dist/ng-quick-date.js"
        }
      }
    },
    less: {
      compile: {
        files: {
          "dist/ng-quick-date.css": ["src/ng-quick-date.less"],
          "dist/ng-quick-date-default-theme.css": ["src/ng-quick-date-default-theme.less"],
          "dist/ng-quick-date-plus-default-theme.css": ["src/ng-quick-date.less", "src/ng-quick-date-default-theme.less"]
        }
      }
    },
    watch: {
      scripts: {
        files: ['**/*.coffee', '**/*.less'],
        tasks: ['coffee', 'uglify', 'less', 'karma:unit'],
        options: {
          debounceDelay: 250
        }
      }
    },
    karma: {
      options: {
        files: [
          'bower_components/angular/angular.js',
          'bower_components/angular-mocks/angular-mocks.js',
          'bower_components/jquery/jquery.js',
          'vendor/browserTrigger.js',
          'src/*.coffee',
          'spec/*.coffee'
        ],
        plugins: [
          'karma-spec-reporter',
          'karma-failed-reporter',
          'karma-jasmine',
          'karma-phantomjs-launcher',
          'karma-chrome-launcher',
          'karma-coffee-preprocessor'
        ],
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        preprocessors: {
          '**/*.coffee': ['coffee']
        },
        coffeePreprocessor: {
          options: {
            bare: true,
            sourceMap: false
          },
          transformPath: function (path) {
            return path.replace(/\.coffee$/, '.js');
          }
        },
        reporters: ['spec', 'failed'],
        reportSlowerThan: 500
      },
      unit: {
        singleRun: true,
        background: false

      },
      debug: {
        singleRun: false,
        background: false,
        browsers: ['Chrome']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', ['coffee', 'uglify', 'less']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('debug_test', ['karma:debug']);
  grunt.registerTask('default', ['build', 'test', 'watch']);
};
