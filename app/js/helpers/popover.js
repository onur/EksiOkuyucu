define([
  'jquery',
  'underscore',
  'backbone',
  'collections/topic',
], function($, _, Backbone, TopicCollection){
  return {
  
    popover: function (ev) {

      var that = this;
      var link = $(ev.currentTarget).attr ('href');


      if (this.isLoading) {
        return false;
      }

      // TODO: expand this
      var position = function (context, source) {
        var position = $(source).position ();
        var main_position = $(that.el).width ();

        if ($(window).width () < 767) {
          return "auto";
        }

        if (position.top < 100)
          return "bottom";

        if (position.left < 300)
          return "auto left";

        return "auto top";
      };

      // external link
      if (link.match (/^http(s)*:\/\//)) {
        window.open (link);
        return false;
      }

      if ($(ev.currentTarget).attr ('data-content')) {
        return false;
      }

      this.isLoading = true;

      var topicCollection = new TopicCollection ();
      topicCollection.external_url = link;
      topicCollection.order = 0;
      topicCollection.fetch ({
        success: function (entries) {
          $(ev.currentTarget).attr ('data-content',
                   $('<p>' + entries.at (0).get ('content') + '</p>').text ());
          $(ev.currentTarget).popover ({ placement: position });
          $(ev.currentTarget).popover ('show');

          that.isLoading = false;
        },

        error: function () {
          $(ev.currentTarget).attr ('data-content',
            '404 böyle bir başlık/entry yok')
          $(ev.currentTarget).popover ({ placement: position });
          $(ev.currentTarget).popover ('show');

          that.isLoading = false;
        }
      });


      return false;

    }
  
  };
});
