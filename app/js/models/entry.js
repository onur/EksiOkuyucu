
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


    parseTime: function (time) {

      // replace entry id from time str
      var time = time.replace(/\#\d+ /, '');
      console.log(time);

      // 5 different time format used in eksisozluk
      // 1. for oldest entries:
      //   30.05.2004
      // 2. newest entries:
      //   30.05.2004 17:01
      // 3. oldest entries with edit time:
      //   20.02.1999 ~ 17.12.2000 13:37
      // 4. newest entries with edit time:
      //   05.03.2004 10:25 ~ 10:28
      // 5. newest entries with edit date and time:
      //   05.03.2004 10:28 ~ 23.12.2005 14:57
      // new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
      var date;
      var match;
      
      // TODO: edit time can also be parsed in here
      if (match = time.match(/^(\d+)\.(\d+)\.(\d+)$/)) {
        date = new Date(match[3], parseInt(match[2]) - 1, match[1]);
      } else if (match = time.match(/^(\d+)\.(\d+)\.(\d+) (\d+):(\d+)$/)) {
        date = new Date(match[3], parseInt(match[2]) - 1, match[1], match[4], match[5]);
      } else if (match = time.match(/^(\d+)\.(\d+)\.(\d+) ~ (\d+)\.(\d+)\.(\d+) (\d+):(\d+)$/)) {
        date = new Date(match[3], parseInt(match[2]) - 1, match[1], match[4], match[5]);
      } else if (match = time.match(/(\d+)\.(\d+)\.(\d+) (\d+):(\d+) ~ (\d+):(\d+)$/)) {
        date = new Date(match[3], parseInt(match[2]) - 1, match[1], match[4], match[5]);
      } else if (match = time.match(/(\d+)\.(\d+)\.(\d+) (\d+):(\d+) ~ (\d+)\.(\d+)\.(\d+) (\d+):(\d+)$/)) {
        date = new Date(match[3], parseInt(match[2]) - 1, match[1], match[4], match[5]);
      } else {
        date = new Date();
      }

      return date;
    },

    
    relativeTime: function (time) {

      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      // FIXME: need to check DST
      var current = new Date ();
      var elapsed = current - this.parseTime(time);

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

          // show picture glyphicon if link is image
          // show facetime-video glyphicon if domain is youtube
          var icon;
          if ($(this).attr('href').match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:jpg|gif|png))(?:\?([^#]*))?(?:#(.*))?/i)) {
            icon = '<span class="glyphicon glyphicon-picture"></span> ';
          } else if (domain == 'youtube.com') {
            icon = '<span class="glyphicon glyphicon-facetime-video"></span> ';
          } else {
            icon = '<span class="glyphicon glyphicon-globe"></span> ';
          }

          $(this).html (icon + domain);

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
                  $(htmlDoc).find ('a.entry-date').text()));
      this.set ('id', $(htmlDoc).find ('footer').attr ('data-id'));
      this.set ('isFavorite',
                $(htmlDoc).find ('footer').attr ('data-isfavorite') == 'true'
                    ? true : false );
      this.set ('favoriteCount',
                parseInt (
                  $(htmlDoc).find ('footer').attr ('data-favorite-count'))
                );
      this.set ('author', $(htmlDoc).find ('a.entry-author').text ());
      this.set ('author_tags', UserTagHelper.getUserTags(this.get('author')));

    }

  });

  return Entry;

});
