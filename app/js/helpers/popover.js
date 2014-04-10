define([
  'jquery',
  'underscore',
  'backbone',
  'collections/topic',
], function($, _, Backbone, TopicCollection){
  return {

    parseYoutubeUrl: function (url) {
      // FIXME: 80+
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = url.match (regExp);
      if (match && match[7].length == 11){
        return match[7];
      } else {
        return false;
      }
    },
  
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

      // FIXME: this is shitty code I've ever written
      //        code repeats, hard to read etc.
      //        need to refactor ASAP

      if (link.match (/^http(s)*:\/\//)) {

        // do nothing if we already show content
        if ($(ev.currentTarget).attr ('data-loaded')) {
          return false;
        }


        if ((youtube_id = this.parseYoutubeUrl (link)) != false) {
          $(ev.currentTarget).after ('<div><blockquote><iframe width="560" height="315" ' +
                 'src="https://www.youtube.com/embed/' + youtube_id +
                 '" frameborder="0" allowfullscreen></blockquote></div>');
          $(ev.currentTarget).attr ('data-loaded', 'true');
          return false;
        }

        // check if its image
        // FIXME: 80+
        if (link.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:jpg|gif|png))(?:\?([^#]*))?(?:#(.*))?/i)) {
            
          $(ev.currentTarget).after ('<div><blockquote><img src="' + 
                                     link +
                                     '" alt="" /></blockquote></div>');
          $(ev.currentTarget).attr ('data-loaded', 'true');

          return false;

        }

        // get content from readability if external url is not an image
        $.ajax ('https://readability.com/api/content/v1/parser?url=' +
                escape (link) + '&token=' +
                // token supposed to be secret but who cares
                'd83f7c87d05f46dcff11e87cbe4b278268f30132'
               ).done (function (data) {

                  $(ev.currentTarget).after ('<div><blockquote>' + 
                                             data.content +
                                             '</blockquote></div>');
                  $(ev.currentTarget).attr ('data-loaded', 'true');

               });

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

    },


    dropdown: function (ev) {

      var entry = $(ev.currentTarget).attr ('id').replace (/^entry-/, '');
      if (this.currentDropdown) {
        $('#entry-drop-' + this.currentDropdown).dropdown ('toggle');
        this.currentDropdown = 0;
      } else {
        $('#entry-dropdown-' + entry).css ('left', ev.offsetX - 50)
                                     .css ('top', ev.offsetY);
        $('#entry-drop-' + entry).dropdown ('toggle');
        this.currentDropdown = entry;
      }

      return false;
    }
  
  };
});
