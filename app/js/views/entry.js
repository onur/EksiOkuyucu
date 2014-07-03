
define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/popover',
], function ($, _, Backbone, PopoverHelper) {

  var EntryView = Backbone.View.extend ({
    el: '#main',

    events: {
      'click div.entry p.content a': 'popover',
      'click div.entry p.content': 'click'
    },

    popover: function (ev) {
      return PopoverHelper.popover (ev);
    },

    click: function (ev) {
      return PopoverHelper.trigger (ev);
    }

  });

  return EntryView;

});
