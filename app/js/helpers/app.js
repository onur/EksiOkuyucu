
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/modal.html',
], function($, _, Backbone, ModalTemplate) {
  return {

    modal: function(title, message) {

      $('#generic-modal').remove();
      $('body').append(_.template(ModalTemplate, { title: title,
                                                   message: message }));
      $('#generic-modal').modal('show');

    }
  
  };
});
