
define([
  'jquery',
  'collections/debe',
  'views/debe'
], function($, DebeCollection, DebeView) {

  describe("DebeCollection", function() {

    beforeEach(function() {
      this.collection = new DebeCollection();
    });

    it('must have a valid url', function() {
      expect(this.collection.url).toMatch(/^https:\/\/eksisozluk.com/);
    });

    it('must fetch entries from server', function(done) {
      this.collection.fetch({
        success: function(entries_) {
          entries = entries_;
          expect(entries.length).toBeGreaterThan(0);
          done();
        }
      });
    });

    describe('entries', function() {

      beforeEach(function(done) {
        var that = this;
        this.collection.fetch({
          success: function(entries_) {
            that.entries = entries_;
            done();
          }
        });
      });


      it("must have entry ids", function() {
        for (var i = 0; i < this.entries.length; ++i) {
          expect(this.entries.models[i].get('eid')).not.toBeUndefined();
        }
      });

      it("must have titles", function() {
        for (var i = 0; i < this.entries.length; ++i) {
          expect(this.entries.models[i].get('title')).not.toBeUndefined();
        }
      });

      it("must have valid authors", function() {
        for (var i = 0; i < this.entries.length; ++i) {
          expect(this.entries.models[i].get('author')).not.toBeUndefined();
        }
      });

    });

  });


  describe("DebeView", function() {

    beforeEach(function (done) {
      var debeView = new DebeView()
      debeView.render();
      var wait = function () {
        console.log("WAITING");
        if (!debeView.isLoading)
          done();
        else
          setTimeout(wait, 1000);
      };
      wait();
    });

    it("must render entries", function() {
      expect($('#main div.entry')).toExist();
      expect($('#main div.entry').length).toBeGreaterThan(1);
    });

    describe("rendered entries", function() {

      it("must have valid fields", function() {
        expect($('#main div.entry h4.panel-title')).toExist();
        expect($('#main div.entry h4.panel-title a').attr('href')).not.toBeUndefined();
        expect($('#main div.entry h4.panel-body').text()).not.toBeUndefined();
        expect($('#main div.entry h4.panel-footer').text()).not.toBeUndefined();
      });

      it("must have valid urls", function() {
        expect($('#main div.entry h4.panel-title a').attr('href')).toMatch(/^#t\/\d+\/.*?--\d+$/);
      });

    });

  });
});
