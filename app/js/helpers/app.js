
define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/conf',
  'text!templates/modal.html',
  'text!templates/welcome.html'
], function($, _, Backbone, ConfHelper, ModalTemplate, WelcomeTemplate) {
  return {

    version: '',
    isExtension: true,
    urlPrefix: 'https://eksisozluk.com/',

    initialize: function(version) {
      this.version = version;

      if (document.domain.match(/(github\.io|eksi\.ninja)$/)) {
        this.isExtension = false;
        this.urlPrefix   = 'http://proxy.eksi.ninja/';
      }
    },

    modal: function(title, message) {

      $('#generic-modal').remove();
      $('body').append(_.template(ModalTemplate, { title: title,
                                                   message: message }));
      $('#generic-modal').modal('show');

    },


    welcome: function () {

      var welcome_page_version = [];
      var current_version = this.version.match(/(\d+)\.(\d+)\.(\d+)/);
      if (ConfHelper.options.welcome_page &&
          (welcome_page_version =
               ConfHelper.options.welcome_page.match(/(\d+)\.(\d+)\.(\d+)/)) &&
          current_version[1] <= welcome_page_version[1] &&
          current_version[2] <= welcome_page_version[2]) {
        return;
      }

      $('#welcome-modal').remove();
      $('body').append(_.template(WelcomeTemplate,
            { version: {
                          version_str: this.version,
                          current_version: current_version,
                          old_version: welcome_page_version
                        },
              isExtension: this.isExtension }));
      $('#welcome-modal').modal('show');

      // save version info in welcome_page option
      // we can show what's new in next version
      ConfHelper.options.welcome_page = this.version;
      ConfHelper.saveConf();

    }

  };

});
