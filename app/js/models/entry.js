
define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/usertag'
], function ($, _, Backbone, UserTagHelper) {

  var Entry = Backbone.Model.extend ({

    defaults: {
      content: '',
      rawContent: '',
      creationTime: '',
      modifyTime: '',
      author: '',
      isFavorite: false,
      favoriteCount: 0,
    },

    
    relativeTime: function (time) {
      var current = new Date ();

      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      // FIXME: need to check DST
      var elapsed = current - new Date (time) + (3*60*60*1000);

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


    parseContent: function (content) {

      var that = this;

      var contentObj = $.parseHTML ('<p>' + content + '</p>');

      $(contentObj).find ('a').each (function () {


        // EXTERNAL LINKS
        if ($(this).attr ('href').match (/^https?\:\/\//)) {

          var matches = $(this).attr ('href')
                               .match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
          var domain = matches && matches[1];
          domain = domain.replace (/^[^.]*\.(?=\w+\.\w+$)/, '');
          $(this).html ('<span class="glyphicon glyphicon-globe"></span> ' +
                        domain);

        }

      });

      // remove sups
      // sups causes problem with popovers
      $(contentObj).find ('sup').each (function () {
        $(this).after ($(this).html ());
        $(this).remove ();
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
      this.set ('isFavorite',
                $(htmlDoc).find ('footer').attr ('data-isfavorite') == 'true'
                    ? true : false );
      this.set ('favoriteCount',
                parseInt (
                  $(htmlDoc).find ('footer').attr ('data-favorite-count'))
                );
      this.set ('author', $(htmlDoc).find ('address a').text ());
      this.set ('author_tags', UserTagHelper.getUserTags(this.get('author')));

    }

  });

  return Entry;

});
