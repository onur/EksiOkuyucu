
define([
  'collections/sidebar',
], function(SidebarCollection) {

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

  });

});
