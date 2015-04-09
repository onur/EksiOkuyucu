
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {

  return {

    userTags: {},

    // ak troll list taken from:
    // https://eksisozluk.com/3-dakikada-sumeyye-trolllerinden-kurtulma-rehberi--4282832
    akTrolls: [
      'yenilikci dervis',
      'fikir muhendisi fikri',
      'patla emi sizofrengi',
      't0mmy',
      'hepiniz oleceksiniz',
      'esekten dusmus at',
      'sayiylabindokuzyuzyedi',
      'samatya',
      'sick city',
      'writer on the water',
      'i see',
      'xer0',
      'ozzo27',
      'ittihad',
      'salih bulut',
      'yusufnalkesen',
      'ormanci',
      'drittes reich',
      'sekendiz',
      'yazar olmam engellenemez',
      'kavaga cikan hamsi',
      'kapiyi calan yabanci',
      'redlack',
      'hepimizin kafasi karisik',
      'iqm',
      'mest ustune mesh',
      'iett 99 806',
      '30 temmuz 2011 karnımın acıkması',
      'buraya kadar gelmek',
      'proust',
      'mr and mrs brown ',
      'onthebass',
      'real salakoza',
      'simurg anka',
      'brazersdaki kel adam',
      'gauldoth',
      'kasimi severiz biz o baska bir guzeldir',
      'bu saatte',
      'parisa',
      'marcelius',
      'mezara giden yol',
      'peder hose',
      'seriatigarraimuhammediye',
      'iyimserpesimist',
      'bdeveci',
      'atmaa',
      'derisik hcl',
      'iyi biri',
      'cunciko',
      'bynewyorker',
      'kardanadam7853',
      'pagan papagan',
      'xxxsb',
      'saint jimmy',
      'ic benim icin',
      'tos ba ga',
      '20 13',
      'edwardscissorhand',
      'in sun see can',
      'yenidengelseydimhayata',
      'varak gidek bir karpuz alak yarak yiyek',
      'afrocubanbebop',
      'yurtsevenfive',
      'detroitli kizil',
      'mahna mahna',
      'beyaz adam',
      'dont let it get to you',
      'idontgiveafuck',
      'insaniyaratik',
      'kimmugirl',
      'kuzeysanrisigibidirgeceyibesefilanboler',
      'karisik meyve aromali gazoz',
      'speranza',
      'parabola',
      'buzz',
      'pureldeo',
      'odiolestate',
      'don kulot',
      'b3458',
      'chonsfe',
      'emin',
      'mftf',
      'amy lee nin piercingi',
      'sirra kadem basti',
      'grandprix',
      'liberalim',
      'ajan',
      'noxan',
      'tatar kemal',
      'multiple intelligentiis',
      'orange boy',
      'adam tesla beyler',
      'cornivolk ',
      'frankchris',
      'rampris',
      'cenikli',
      'kayipkentindelisi',
      '100. troll özel ödülü: debdebelidememeli',
      'auer',
      'cok bilinmeyenli denklem',
      'katilolabilirim',
      'ne nicki be',
      'nevi sahsina munhasir44',
      'dafaiss',
      'ed statik',
      'musanelka',
      'dudayeva',
      'rachelbrown',
      'postedby',
      'ben hic terlemem',
      'kaptan maydanoz',
      'elektrikli soba',
      'aziz vefa',
      'sebasteia sebasteia',
      'pinkblue',
      'paegan mushroom',
      'said kotan',
      'fagam',
      'what can i doooo',
      'geceleri uyanip cokokremi goturen adam',
      'enoz',
      'polyneikes',
      'nula',
      'strangermoon',
      'quantumfluctuations',
      'neminarin',
      'baso',
      'bynpass',
      'vincent ugurlu',
      'yvzerg',
      'metafili',
      'airmag',
      'at yalani sikeyim inanani',
      'stackoverblow',
      'kamusal adamin oglu',
      'tavsancikharry',
      'demeliyim bu durumda',
      'yeqzek',
      'nukleer sizinti',
      'bir gurultu aninda',
      'hasbelicab',
      'seven seas of rhye',
      'reis beyefendi',
      'sonyablade',
      'kemnam',
      'bana jacob diyolar',
      'jean valjean',
      'arbino',
      'scottish',
      'daral han',
      'filho',
      'efrasiyab khan',
      '7 harfli',
      'aadbkr eensfdria nnodigre uutml nuusm',
      'albertknox',
      'noktanoktabiiiiiiiiiipnokta',
      'sahin23',
      'aksakkirkayak',
    ],

    loadUserTags: function() {
      this.userTags = JSON.parse(localStorage.getItem('eksi_okuyucu_usertags'))
                      || {};
    },


    saveUserTags: function() {
      localStorage.setItem('eksi_okuyucu_usertags',
                           JSON.stringify(this.userTags));
    },

    getUserTags: function(username) {

      var tags = this.userTags[username] || [];

      // check if user is aktroll
      for (var i = 0; i < this.akTrolls.length; ++i) {
        if (username == this.akTrolls[i]) {
          tags.push('ak troll');
          break;
        }
      }

      return tags;
    },

    addUserTag: function(username, tag) {
      if (!this.userTags[username])
        this.userTags[username] = [];
      this.userTags[username].push(tag);
      this.saveUserTags();
    },

    removeUserTag: function(username, tag) {
      if (!this.userTags[username])
        return;

      var that = this;
      var changed = false;
      _.map(this.userTags, function(tags, username_) {
        var i = 0;
        _.each(tags, function(tag_) {
          if (username_ == username && tag == tag_) {
            that.userTags[username].splice(i, 1);
            changed = true;
          }
          i++;
        });
      });

      if (changed)
        this.saveUserTags();

    }

  };

});
