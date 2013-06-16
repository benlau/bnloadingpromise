
module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            loadingPromise: {
              files: {
                'dest/bnloadingpromise.js': ['src/bnloadingpromise.js']
              }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('dist', ['uglify']);

};
