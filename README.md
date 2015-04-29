# Ekşi Okuyucu

[eksisozluk.com](https://eksisozluk.com/) okumayı kolaylaştırmak ve gündemi
daha verimli takip etmek için geliştirilmiş tarayıcı eklentisi. Ekşi
Sözlük'ün üstünü yamalamak yerine, HTML çıktısını işleyip önünüze sunar.

![Ekşi Okuyucu](http://eksi.ninja/screenshots/01.png)

Adından da anlaşılacağı gibi sadece okumayı kolaylaştırmak için
tasarlanmıştır. Kullanıcı girişi, favorileme ve sukela butonları
sonradan eklenmiştir. İleride başlık takip etme ve entry yollama
özellikleri *muhtemelen* eklenecektir.

#### İndir

* [Chrome](https://chrome.google.com/webstore/detail/nihndelpipkdjpacfpgpailghcnglimj)
* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/eksi-okuyucu/)
* [Standalone](http://eksi.ninja/) *(proxy ile çalışır)*
* Android, iOS ve Windows Phone hazır olduğunda yayımlanacak.

### Temel özellikleri

* Reklamsızdır ve reklamsız kalacaktır.
* Mahremiyete önem verir. Sadece eksisozluk.com üzerinden veri alış verişi
  yapar. Google analytics bile kullanılmamıştır. Ekşi Sözlük'ün reklam
  scriptlerini önemsemez.
* Ekrandaki boşluğu verimli kullanacak şekilde tasarlanmıştır. Bootstrap
  kullandığından, responsive tasarımı çok geniş ekranlardan, çok dar
  ekranlara kadar uygun şekilde çalışır.


### Gösterim özellikleri

* Başlıkları, normal gösterim seçeneklerinine ek olara, son atılan
  entryden, ilk atılan entrye göre gösterebilir. Gündemi takip etmeyi
  kolaylaştırmayı amaçlamıştır.
* Sayfa geçisleri yoktur, mevcut sayfayı kaydırdıkça bir sonraki sayfa
  yüklenir.
* Gündemi, bugün atılmış entryleri, dünün en beğenilen entrylerini ve
  kanalları; başlık ve ilk entrysi ile gösterir.
* Kullanıcılarin son entrylerini, en beğenilen entrylerini, en çok
  favorilenen entrylerini, son oylanan entrylerini, favori entrylerini
  başlık ve entry içeriği ile birlikte gösterir. 
* Entry içerisinde yer alan ekşi içerisindeki dahili linkleri, başlığın ilk
  entrysi ile birlikte link üzerinde gösterir.
* Resim linkleri tıklandıktan sonra direkt sayfa içerisinde gösterilir.
* Youtube videolarını sayfa içerisinde oynatmanızı sağlar.
* Kullanıcıları fişlemenizi sağlar. Ak-troller otomatikmen fişlenmiştir.
  Aslında bu etiketleme ama fişleme kelimesi daha çok hoşuma gittiğinden
  fişleme olarak adlandırdım.
* Başlık içerisindeyken, çeşitli sitelerde başlık adını kolayca aramanızı
  sağlayan dış bağlantıları sunar.
* Dış bağlantıları domainadi.com haline getirir. Her zaman linke
  tıkladığınızda hangi domaine gideceğinizi bilirsiniz.
* [Readablity](https://readability.com/) ile dış bağlantıların içerinin
  yalın halde entry içerisinde görebilme. Readability Türk standartlarına
  göre hazırlanmış web siteleriyle pek uyumlu çalışmıyor, varsayılan olarak
  aktif değil.

Hepsi bu kadar değil! Tüm özellikleri görmek için eklentiyi test etmenizi
öneririm.


## Geliştirme

Ekşi Okuyucu requirejs ve backbonejs ile tamamen modüler olarak
geliştirilmektedir. Arayüz için bootstrap kullanılmıştır.

Uygulamayı geliştirmeye katkıda bulunmak istiyorsanız Chrome ile
çalışmanızı öneririm. Depoyu klonladıktan sonra, Chrome eklentiler
sayfasında bulunan geliştirici modunu aktif ederek eklentiyi yükleyebilir
ve üzerinde değişiklikler yapabilirsiniz.

Her türlü pull request, görüş ve önerilerinizi eklentinin github sayfasına
gönderebilirsiniz.


### Temalar

Uygulama bootstrap kullanılarak geliştirildiğinden bootstrapwatch.com da
yer alan temalar kullanılmıştır. Siz de bootstrap magic gibi araçlar
kullanarak kendi temanızı yapabilir ve projeye gönderebilirsiniz.


### Testler

Ekşi Okuyucu BDD (behaviour driven development) prensibi ile
geliştirilmektedir. Eklentiyi geliştirici modunda kurduktan sonra
`tests.html` sayfasını açarak testleri çalıştırabilirsiniz. Testler
`jasmine` ile geliştirilmiştir. Ekşi Okuyucu'nun yeni sürümü, tüm tesler
başarılı bir şekilde geçerse dağıtılmaktadır. Bir çok durum testlere dahil
edilmiştir. `app/js/tests/` dizininde yapılan testleri görebilirsiniz.

Testler aynı zamanda ileride ekşi sözlük url yapılarını veya HTML
çıktılarını değiştirirse, sorunu kolayca tesbit etmeye yarar. Sizde
yaptığınız değişikliklerin ardından, uygulamanın testleri geçtiğinden emin
olun.

Testlerin tamamlanması uzun sürebilir, sabırlı olun.


### Bilinen Sorunlar

Bilinen sorunların bir listesi, aşağıda listelenmiş sorunlar için yeni bir
hata kaydı oluşturmanıza gerek yok. Listelenmiş sorunlar dışında bir hata
ile karşılaşırsanız yeni bir hata kaydı oluşturun.

* Bir view yüklenirken, sidebar veya navbardan farklı bir linke tıklanırsa,
  mevcut view yüklenmeye devam ediyor ve 2 view aynı anda renderlenmeye
  çalışıyor.
* Navigasyon menüsü, dar ekranlarda pek stabil değil. Bu da uygulamayı çoğu
  zaman dar ekranlarda kullanılmaz hâle getirebiliyor. Bu nedenden dolayı
  akıllı telefon desteği ilk sürümde yer almamaktadır.


### Planlanan Özellikler

İleride uygulamaya eklemeyi düşündüğüm özellikler:

* Başlık içerisinde cevap yazmayı kolaylaştıracak bir form.
* Başlıkları listelerken başlık adını google images üzerinde arayıp ilk
  sonucu gösterme. Bunun için 3. parti bir sunucu kullanmayı planlıyorum.


### Derleme

Eksi Okuyucu r.js (requirejs optimizer) kullanılarak derlenmektedir. GNU
make dosyaları ile derleme işlemi kolaylaştırılmıştır. Tam derleme işlemini
gerçekleştirebilmeniz için gerekenler:

* GNU make
* nodejs
* r.js
* scss
* firefox-addon-sdk


### Kodlama Stili

`vim:ts=4:sw=2:et`

Uygulamayı geliştirmeye ilk başladığımda, GNU stilinde olduğu gibi
fonksiyon adından sonra ve parantezlerden önce bir boşluk kullanıyordum
(örn: `foo ();`). Fakat bu alışkanlığımdan bir süredir vazgeçtim, coğu
fonksiyondan sonra boşluk bulunsa da, olmaması sorun değil.


### Lisans

Ekşi Okuyucu MIT lisansı altında dağıtılmaktadır. Lisans içeriğini
`COPYING` içerisinde bulabilirsiniz. MIT lisansı şartları altında
istediğiniz gibi değiştirebilir ve dağıtabilirsiniz.


### Yazar

Copyright (C) 2015  Onur Aslan  <onuraslan@gmail.com>
