// http://brunch.readthedocs.org/en/latest/config.html
exports.config = {
  paths: {
    public: '.public'
  },
  modules:{
    wrapper: function(path, data){return "(function(){"+data+"})();"},
    definition: false
  },
  files: {
    javascripts: {
      joinTo: {
        'javascripts/app.js': /^app/,
        'javascripts/vendor.js':  /^vendor/
      },
      order: {
        before: [
          'vendor/jquery.js',
          'vendor/angular.js',
          'vendor/angular.sanitize.js',
          'vendor/lodash.js'
        ]
      }
    },
    stylesheets: {
      joinTo: {
        'stylesheets/app.css': /^app\/styles|^vendor\/.+css/
      }
    },
    templates: {
      joinTo: 'javascripts/.not-needed-templates.js'
    }
  }
}
