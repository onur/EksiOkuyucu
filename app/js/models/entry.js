
define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {

  var Entry = Backbone.Model.extend ({

    defaults: {
      content: '',
      rawContent: '',
      creationTime: '',
      modifyTime: '',
      author: '',
    },

    
    relativeTime: function (time) {
      var current = new Date ();

      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = current - new Date (time) + (2*60*60*1000);

      if (elapsed < msPerMinute) {
        return Math.round (elapsed/1000) + ' saniye';   
      }

      else if (elapsed < msPerHour) {
        return Math.round (elapsed/msPerMinute) + ' dakika';   
      }

      else if (elapsed < msPerDay ) {
        return Math.round (elapsed/msPerHour ) + ' saat';   
      }

      else if (elapsed < msPerMonth) {
        return Math.round (elapsed/msPerDay) + ' gün';   
      }

      else if (elapsed < msPerYear) {
        return Math.round (elapsed/msPerMonth) + ' ay';   
      }

      else {
        return Math.round (elapsed/msPerYear ) + ' yıl';   
      }
    },


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


    parseContent: function (content) {

      var that = this;

      var contentObj = $.parseHTML ('<p>' + content + '</p>');

      $(contentObj).find ('a').each (function () {


        // EXTERNAL LINKS
        if ($(this).attr ('href').match (/^https?\:\/\//)) {

          var matches = $(this).attr ('href')
                               .match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
          var domain = matches && matches[1];
          domain = domain.replace (/^[^.]+\./g, '');
          $(this).html ('<span class="glyphicon glyphicon-globe"></span> ' +
                        domain);
          $(this).click (function () {
            window.open ($(this).attr ('href'));
            return false;
          });

          // show youtube videos
          var youtube_id = that.parseYoutubeUrl ($(this).attr ('href'));
          if (youtube_id != false) {
            $(this).after ('<br /><iframe width="560" height="315" ' +
                 'src="https://www.youtube.com/embed/' + youtube_id +
                 '" frameborder="0" allowfullscreen></iframe><br />');
          }
        }

        // INTERNAL LINKS
        else {

          $(this).click (function () {
            return that.popover (this);
          });

        }
      });

      return $(contentObj).html ();

    },

    initialize: function () {

      if (!this.has ('htmlDoc'))
        return;

      var htmlDoc = this.get ('htmlDoc');

      this.set ('rawContent', $(htmlDoc).find ('div.content').html ());
      this.set ('content', this.parseContent (this.get ('rawContent')));
      this.set ('creationTime',
                this.relativeTime(
                  $(htmlDoc).find ('time[itemprop="commentTime"]')
                            .attr ('datetime')));
      this.set ('id', $(htmlDoc).find ('footer').attr ('data-id'));
      this.set ('author', $(htmlDoc).find ('address a').text ());

    }

  });

  return Entry;

});
