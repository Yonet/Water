// Generated on 2014-09-22 using generator-angular 0.9.8
'use strict';

//Using exclusion patterns slows down Grunt significantly
//instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
//this method is used to create a set of inclusive patterns for all subdirectories
//skipping node_modules, bower_components, dist, and any .dirs
//This enables users to create any directory structure they desire.
var createFolderGlobs = function(fileTypePatterns) {
	fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
	var ignore = ['node_modules','bower_components','dist','temp'];
	var fs = require('fs');
	return fs.readdirSync(process.cwd())
					.map(function(file){
						if (ignore.indexOf(file) !== -1 ||
								file.indexOf('.') === 0 ||
								!fs.lstatSync(file).isDirectory()) {
							return null;
						} else {
							return fileTypePatterns.map(function(pattern) {
								return file + '/**/' + pattern;
							});
						}
					})
					.filter(function(patterns){
						return patterns;
					})
					.concat(fileTypePatterns);
};///createFolderGlobs

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Load grunt tasks automatically on your dependencies/dev-dependencies
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);


	//Concatenate files and generate a source map file. For more info: https://www.npmjs.org/package/grunt-concat-sourcemap
	// grunt.loadNpmTasks('grunt-concat-sourcemap');

	// Configurable paths for the application
	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist'
	};

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: appConfig,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['<%= yeoman.app %>/**/{,*/}*.js'],
				tasks: ['newer:jshint:all', 'feedback'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			jsTest: {
				files: ['<%= yeoman.app %>/**/{,*/}*-spec.js'],
				tasks: ['newer:jshint:test', 'karma']
			},
			compass: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['compass:server', 'autoprefixer']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/*/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},///watch

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					middleware: function (connect) {
						return [
							connect.static('.tmp'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},
			test: {
				options: {
					port: 9001,
					middleware: function (connect) {
						return [
							connect.static('.tmp'),
							connect.static('test'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= yeoman.dist %>'
				}
			}
		},///connect

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'<%= yeoman.app %>/**/{,*/}*.js'
				]
			},
			test: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: ['<%= yeoman.app %>/**/{,*/}*-spec.js']
			}
		},///jshint

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/{,*/}*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},///clean

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},///autoprefixer

		// Automatically inject Bower components into the app
		wiredep: {
			app: {
				src: ['<%= yeoman.app %>/index.html'],
				ignorePath:  /\.\.\//
			},
			sass: {
				src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
				ignorePath: /(\.\.\/){1,2}bower_components\//
			}
		},///wiredep

		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/styles',
				cssDir: '.tmp/styles',
				generatedImagesDir: '.tmp/images/generated',
				imagesDir: '<%= yeoman.app %>/images',
				javascriptsDir: '<%= yeoman.app %>',
				fontsDir: '<%= yeoman.app %>/styles/fonts',
				importPath: './bower_components',
				httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				httpFontsPath: '/styles/fonts',
				relativeAssets: false,
				assetCacheBuster: false,
				raw: 'Sass::Script::Number.precision = 10\n'
			},
			dist: {
				options: {
					generatedImagesDir: '<%= yeoman.dist %>/images/generated'
				}
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},///compass

		// Renames files for browser caching purposes
		filerev: {
			dist: {
				src: [
					'<%= yeoman.dist %>/**/{,**/}*.js',
					'<%= yeoman.dist %>/styles/{,*/}*.css',
					'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= yeoman.dist %>/styles/fonts/*'
				]
			}
		},///filerev

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>',
				flow: {
					html: {
						steps: {
							js: ['concat'],//, 'uglifyjs'
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},///useminprepare

		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/images']
			}
		},///usemin

		// The following *-min tasks will produce minified files in the dist folder
		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//   dist: {
		//     files: {
		//       '<%= yeoman.dist %>/styles/main.css': [
		//         '.tmp/styles/{,*/}*.css'
		//       ]
		//     }
		//   }
		// },
		uglify: {
			options: {
				mangle: false,
				sourceMap: true,
				sourceMapIncludeSources: true,
				ASCIIOnly:true,
				preserveComments: false
			},
			dist: {
				files: {
					'<%= yeoman.dist %>/**/{,**/}*.js': [
						'<%= yeoman.app %>/**/{,**/}*.js'
					]
				}
			}
		},///uglify

		concat: {
		  dist: {
			  options: {
					sourceMap: true,
					sourceMapStyle: 'embed',
					sourceMapName: '<%= yeoman.dist %>vs.min.js.map',
				} 
		  }
		},///concat

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},///imagemin

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},///svgmin

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeComments: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: ['*.html', '**/{,*/}*.html'],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},///htmlmin

		// ng-annotate tries to make the code safe for minification automatically
		// by using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/*',
					src: ['*.js', '!oldieshim.js'],
					dest: '.tmp/concat/*'
				}]
			}
		},///ngAnnotate

		// Replace Google CDN references
		cdnify: {
			dist: {
				html: ['<%= yeoman.dist %>/*.html']
			}
		},///cdnify

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'**/{,*/}*.html',
						'images/{,*/}*.{webp}',
						'fonts/*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/images',
					src: ['generated/*']
				}, {
					expand: true,
					cwd: '.',
					src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
					dest: '<%= yeoman.dist %>'
				}]
			},///dist
			styles: {
				expand: true,
				cwd: '<%= yeoman.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},///copy

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'compass:server'
			],
			test: [
				'compass'
			],
			dist: [
				'compass:dist',
				'imagemin',
				'svgmin'
			]
		},///concurrent

		// Test settings
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		}///karma
	});///grunt.initConfig

	grunt.registerTask('feedback', function() {
		grunt.log.writeln('You are doing GREAT!')
	})///feedback

	grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}
		grunt.task.run([
			'clean:server',
			'wiredep',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});///serve

	grunt.registerTask('test', [
		'clean:server',
		'concurrent:test',
		'autoprefixer',
		'connect:test',
		'karma'
	]);///test

	grunt.registerTask('build', [
		'clean:dist',
		'wiredep',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		'concat',
		'ngAnnotate',
		'copy:dist',
		'cdnify',
		'cssmin',
		// 'uglify',
		'filerev',
		'usemin',
		'htmlmin'
	]);///build

	grunt.registerTask('default', [
		'newer:jshint',
		'test',
		'build'
	]);///default
};///grunt function
