# Ekşi Okuyucu

<https://eksisozluk.com/> okumayı kolaylaştırmak ve gündemi daha verimli
takip etmek için geliştirilmiş tarayıcı eklentisi. Ekşi Sözlük'ün üstünü
yamalamak yerine, HTML çıktısını işleyip önünüze sunar.

### Temel özellikleri:

* Reklamsızdır ve reklamsız kalacaktır. Kâr amacı güdmeden
  geliştirildiğinden, reklam alanları tasarlanmamıştır.
* Bukalemun gibi her gün farklı bir renk almaz. Hangi renk temasını
  seçerseniz sürekli onda kullanırsınız.
* Mahremiyete önem verir. Sadece eksisozluk.com üzerinden veri alış verişi
  yapar. Google analytics bile kullanılmamıştır. Ekşi Sözlük'ün reklam
  scriptlerini önemsemez.
* Ekrandaki boşluğu verimli kullanacak şekilde tasarlanmıştır. Bootstrap
  kullandığından, responsive tasarımı çok geniş ekranlardan, çok dar
  ekranlara kadar uygun şekilde çalışır.


### Gösterim özellikleri:

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
* Entry içerisinde yer alan ekşi içerisindeki dahili linkleri, başlığın
  ilk entrysi ile birlikte link üzerinde gösterir.
* Resim linkleri tıklandıktan sonra direkt sayfa içerisinde gösterilir.
* Youtube videolarını sayfa içerisinde oynatmanızı sağlar.
* Başlık içerisindeyken, çeşitli sitelerde başlık adını kolayca aramanızı
  sağlayan dış bağlantıları sunar.
* Dış bağlantıları domainadi.com haline getirir. Her zaman linke
  tıkladığınızda hangi domaine gideceğinizi bilirsiniz.

Hepsi bu kadar değil! Tüm özellikleri görmek için eklentiyi test etmenizi
öneririm.


## Geliştirme

Ekşi Okuyucu requirejs ve backbonejs ile tamamen modüler olarak
geliştirilmektedir. Arayüz için bootstrap kullanılmıştır.

Uygulamayı geliştirmeye katkıda bulunmak istiyorsanız Chrome ile
çalışmanızı öneririm. Depoyu klonladıktan sonra, Chrome eklentiler
sayfasında bulunan geliştirici modunu aktif ederek eklentiyi yükleyebilir
ve üzerinde değişiklikler yapabilirsiniz.

Her türlü pull request, görüş ve önerilerinizi eklentinin github
sayfasına gönderebilirsiniz.


### Testler

Ekşi Okuyucu BDD (behaviour driven development) prensibi ile
geliştirilmektedir. Eklentiyi geliştirici modunda kurduktan sonra eklendi
URL'nizin souna `/tests/SpecRunner.html` koyarak testleri
çalıştırabilirsiniz. Testler `jasmine` ile geliştirilmiştir. Ekşi
Okuyucu'nun yeni sürümü, tüm tesler başarılı bir şekilde geçerse
dağıtılmaktadır. Bir çok durum testlere dahil edilmiştir. `tests/spec`
dizininde yapılan testleri görebilirsiniz.

Testler aynı zamanda ileride ekşi sözlük url yapılarını veya HTML
çıktılarını değiştirirse, sorunu kolayca tesbit etmeye yarar. Sizde
yaptığınız değişikliklerin ardından, uygulamanın testleri geçtiğinden emin
olun.


### Derleme

Eksi Okuyucu r.js (requirejs optimizer) kullanılarak derlenmektedir. GNU
Make dosyaları ile derleme işlemi kolaylaştırılmıştır. Tam derleme işlemini
gerçekleştirebilmeniz için gerekenler:

* gnu make
* nodejs
* r.js
* chromium
* scss
* firefox-addon-sdk


### Lisans

Ekşi Okuyucu MIT lisansı altında dağıtılmaktadır. Lisans içeriğini
`COPYING` içerisinde bulabilirsiniz. MIT lisansı şartları altında
istediğiniz gibi değiştirebilir ve dağıtabilirsiniz.


### Yazar

Copyright (C) 2015  Onur Aslan  <onuraslan@gmail.com>
