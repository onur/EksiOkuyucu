
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

    initialize: function () {

      if (!this.has ('htmlDoc'))
        return;

      var htmlDoc = this.get ('htmlDoc');

      this.set ('rawContent', $(htmlDoc).find ('div.content').html ());
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
