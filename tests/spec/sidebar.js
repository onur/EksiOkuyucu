
define([
  'jquery',
  'collections/sidebar',
  'views/sidebar',
  'jasmine-jquery'
], function($, SidebarCollection, SidebarView) {

  describe("SidebarCollection", function() {

    var entries;

    beforeEach(function() {
      this.collection = new SidebarCollection();
    });

    it("must have page and page count", function () {
      expect(this.collection.page).toBe(1);
      expect(this.collection.pageCount).toBe(1);
    });

    it("must have a channel", function() {
      expect(this.collection.channel).toEqual('basliklar/populer');
    });

    it("must have a valid url", function() {
      expect(this.collection.url()).toMatch(/^https:\/\/eksisozluk.com/);
    });


    it('must fetch entries from server', function (done) {    
      this.collection.fetch({
        success: function(entries_) {
          entries = entries_;
          expect(entries.length).toBeGreaterThan(0);
          done();
        }
      });
    });

    describe("entries", function() {

      beforeEach(function(done) {
        this.collection.fetch({
          success: function(entries_) {
            entries = entries_;
            done();
          }
        });
      });


      it("must have titles", function() {
        for (var i = 0; i < entries.length; ++i) {
          expect(entries.models[i].get('title')).not.toBeUndefined();
        }
      });

      it("must have valid urls", function() {
        for (var i = 0; i < entries.length; ++i) {
          expect(entries.models[i].get('url')).toMatch(/^\/[\w-]+--\d+$/);
        }
      });

      it("must have valid counts", function() {
        for (var i = 0; i < entries.length; ++i) {
          expect(entries.models[i].get('count')).toBeGreaterThan(0);
        }
      });

    });


    // this test is a good example of bad design of SidebarCollection
    describe("channels", function () {

      var channel_urls = {
        'Gündem': 'basliklar/populer',
        'Bugün': 'basliklar/bugun',
        '#anket': 'basliklar/kanal/anket',
        '#bilim': 'basliklar/kanal/bilim',
        '#edebiyat': 'basliklar/kanal/edebiyat',
        '#ekşi-sözlük': 'basliklar/kanal/ekşi-sözlük',
        '#ilişkiler': 'basliklar/kanal/ilişkiler',
        '#müzik': 'basliklar/kanal/müzik',
        '#oyun': 'basliklar/kanal/oyun',
        '#programlama': 'basliklar/kanal/programlama',
        '#sanat': 'basliklar/kanal/sanat',
        '#sinema': 'basliklar/kanal/sinema',
        '#siyaset': 'basliklar/kanal/siyaset',
        '#spor': 'basliklar/kanal/spor',
        '#tarih': 'basliklar/kanal/tarih',
        '#teknoloji': 'basliklar/kanal/teknoloji',
        '#tv': 'basliklar/kanal/tv'
      };


      var keys = $.map(channel_urls, function(url, title) {
        it("must fetch " + title, function(done) {
          this.collection.channel = url;
          this.collection.fetch({
            success: function(entries_) {
              expect(entries_.length).toBeGreaterThan(0);
              done();
            }
          });
        });
      });

    });

  });



  // sidebar view
  describe("SidebarView", function() {
    beforeEach(function (done) {
      var sidebarView = new SidebarView()
      sidebarView.render();
      var wait = function () {
        if (!sidebarView.isLoading)
          done();
        else
          setTimeout(wait, 1000);
      };
      wait();
    });


    it("must generate sidebar items list", function() {
      expect($('#sidebar ul.sidebar-items')).toExist();
    });

    it("must generate sidebar list items", function() {
      expect($('#sidebar ul.sidebar-items li')).toExist();
    });

    describe("SidebarItems", function() {
      it("must be a link", function() {
        expect($('#sidebar ul.sidebar-items li a')).toExist();
        expect($('#sidebar ul.sidebar-items li a')).toHaveAttr('href');
      });
      it("must have a valid url", function() {
        expect($('#sidebar ul.sidebar-items li a').attr('href')).toMatch(/^#t\/\d+\/.*?--\d+/);
      });
      it("must have a title", function() {
        expect($('#sidebar ul.sidebar-items li a div.title')).toExist();
      });
      it("must have unread count by default", function() {
        expect($('#sidebar ul.sidebar-items li a div.count')).toExist();
      });
    });
  });

});
