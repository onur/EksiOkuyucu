
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
      'click div.entry p.content': 'click',
      'click div.entry a[data-button-type="favorite"]': 'favorite',
      'click div.entry a[data-button-type="sukela"]': 'sukela',
    },

    popover: function (ev) {
      return PopoverHelper.popover (ev);
    },

    click: function (ev) {
      return PopoverHelper.trigger (ev);
    },


    favorite: function (ev) {

      var favorite_count =
              parseInt($(ev.currentTarget).attr('data-favorite-count')),
          is_favorite = 
              $(ev.currentTarget).attr('data-is-favorite');

      $.ajax ({
          url: 'https://eksisozluk.com/entry/favori',
          type: 'POST',
          data:    { entryId: $(ev.currentTarget).attr('data-id') },
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });


      if (is_favorite === 'false') {
        favorite_count++;
        is_favorite = true;
        $(ev.currentTarget).removeClass('btn-default').addClass('btn-primary');
      } else {
        favorite_count--;
        is_favorite = false;
        $(ev.currentTarget).removeClass('btn-primary').addClass('btn-default');
      }

      $(ev.currentTarget).attr('data-favorite-count', favorite_count);
      $(ev.currentTarget).find('span.favorite-count')
                         .text(favorite_count ? ' ' + favorite_count : '');
      $(ev.currentTarget).attr('data-is-favorite', is_favorite);

      return false;
    },

    sukela: function (ev) {

      var rate = $(ev.currentTarget).hasClass('btn-primary') ? -1 : 1;

      $.ajax ({
          url: 'https://eksisozluk.com/entry/vote',
          type: 'POST',
          data:    { id: $(ev.currentTarget).attr('data-id'),
                     rate: rate },
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
      });

      if (rate > 0) {
        $(ev.currentTarget).removeClass('btn-default').addClass('btn-primary');
      } else {
        $(ev.currentTarget).removeClass('btn-primary').addClass('btn-default');
      }

      return false;
    }

  });

  return EntryView;

});
