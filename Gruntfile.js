module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			build : {
				files : [{
						expand : true,
						cwd : 'src',
						src : '**/*.js',
						dest : 'dest'
					}
				]
			}
		},
		jshint : {
			all : ['src/**/*.js']
		},
		bower: {
    install: {
      options: {
        targetDir: './lib',
        layout: 'byType',
        install: true,
        verbose: false,
        cleanTargetDir: false,
        cleanBowerDir: false,
        bowerOptions: {}
      }
    }
  }
	});

	// Load the plugin that provides the "uglify" task.
	// Default task(s).
	grunt.registerTask('default', ['uglify','bower']);

};
