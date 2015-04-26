define([
  'jquery',
  'underscore',
  'backbone',
  'collections/topic',
  'helpers/conf',
  'helpers/nav'
], function($, _, Backbone, TopicCollection, ConfHelper, NavHelper) {
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


    hidePopover: function () {
      if (this.currentPopover) {
        $(this.currentPopover).popover ('hide');
        this.currentPopover = 0;
      }
    },
  
    // FIXME: this is a complete mess. needs serious refactoring
    popover: function (ev) {

      var that = this;
      var link = $(ev.currentTarget).attr ('href');


      if (this.isLoading) {
        return false;
      }

      if (this.currentPopover == ev.currentTarget) {
        if ($(ev.currentTarget).attr ('data-content-url')) {
          location.href = $(ev.currentTarget).attr ('href');
          return true;
        } else {
          return false;
        }
      }

      this.hidePopover ();

      // external link

      // FIXME: this is shitty code I've ever written
      //        code repeats, hard to read etc.
      //        need to refactor ASAP

      if (link.match (/^http(s)*:\/\//)) {

        // do nothing if content is already loaded
        if ($(ev.currentTarget).attr ('data-loaded')) {
          return false;
        }


        if ((youtube_id = this.parseYoutubeUrl (link)) != false) {
          if (ConfHelper.getOption ('youtube')) {
            $(ev.currentTarget).after ('<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" ' +
                   'src="https://www.youtube.com/embed/' + youtube_id +
                   '" frameborder="0" allowfullscreen></div>');
            $(ev.currentTarget).attr ('data-loaded', 'true');
          } else {
            window.open (link);
          }
          return false;
        }

        // check if its image
        // FIXME: 80+
        if (link.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:jpg|gif|png))(?:\?([^#]*))?(?:#(.*))?/i)) {

          if (ConfHelper.getOption ('images')) {
            
            $(ev.currentTarget).after ('<div><blockquote><img src="' + 
                                       link +
                                       '" alt="" class="img-responsive" /></blockquote></div>');
            $(ev.currentTarget).attr ('data-loaded', 'true');
          } else {
            window.open (link);
          }

          return false;

        }

        if (!ConfHelper.getOption ('readability')) {
          window.open (link);
          return false;
        }

        // get content from readability if external url is not an image
        NavHelper.loader(true);
        $.ajax ('https://readability.com/api/content/v1/parser?url=' +
                escape (link) + '&token=' +
                // token supposed to be secret but who cares
                'd83f7c87d05f46dcff11e87cbe4b278268f30132'
               ).done (function (data) {

                 $(ev.currentTarget).after ('<div><blockquote>' + 
                                            data.content +
                                            '</blockquote></div>');
                 $(ev.currentTarget).attr ('data-loaded', 'true');

                 NavHelper.loader(false);

               }).error (function () {
                 NavHelper.loader(false);
                 window.open (link);
               });

        return false;
      }

      if ($(ev.currentTarget).attr ('data-content')) {
        that.currentPopover = ev.currentTarget;
        $(ev.currentTarget).popover ('show');
        return false;
      }

      NavHelper.loader(this.isLoading = true);

      var topicCollection = new TopicCollection ();
      topicCollection.external_url = link;
      topicCollection.order = 0;
      topicCollection.fetch ({
        success: function (entries) {

          NavHelper.loader(that.isLoading = false);

          if (!ConfHelper.getOption ('popover')) {
            location.href = '#t/0/' + topicCollection.external_url;
            return;
          }

          $(ev.currentTarget).attr ('data-content',
                   $('<p>' + entries.at (0).get ('content') + '</p>').text ());
          $(ev.currentTarget).popover ({ placement: 'auto right',
                                         trigger: 'manual' });
          $(ev.currentTarget).popover ('show');

          $(ev.currentTarget).attr ('data-content-url', 'true');
          $(ev.currentTarget).attr ('href', "#t/0/" + topicCollection.external_url);

          that.currentPopover = ev.currentTarget;
        },

        error: function () {
          $(ev.currentTarget).attr ('data-content',
            '404 böyle bir başlık/entry yok')
          $(ev.currentTarget).popover ({ placement: 'auto right',
                                         trigger: 'manual' });
          $(ev.currentTarget).popover ('show');

          NavHelper.loader(that.isLoading = false);

          that.currentPopover = ev.currentTarget;
        }
      });


      return false;

    },


    trigger: function (ev) {

      if (this.currentPopover) {
        this.hidePopover ();
      }

      return false;
    },


    reset: function () {
      this.currentPopover = false;
    }
  
  };
});
