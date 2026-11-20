# Vira AB Yurt Dışı Veri Aktarımı SCC Çerçevesi

**Son güncelleme:** 20 Kasım 2026  
**Sürüm:** 1.0  
**Hizmetler:** https://tryvira.xyz ve alt alan adları  
**İletişim:** hello@tryvira.xyz

## 1. Amaç

Bu belge, Avrupa Birliği Genel Veri Koruma Tüzüğü'nün (**GDPR**) Bölüm V hükümleri kapsamında yurt dışına kişisel veri aktarımında uygun güvence gerektiğinde **Standart Sözleşme Maddeleri ("SCC")** yaklaşımını açıklar.

[AB GDPR Ek Hükümleri'ni](eu-gdpr-addendum.tr.md), [Gizlilik Politikası'nı](privacy.tr.md), [Veri İşleme Ek Sözleşmesi'ni](dpa.tr.md) ve [Sağlayıcılar Kaydı'nı](subprocessors.tr.md) tamamlar.

**Bu herkese açık belge, Avrupa Komisyonunun resmî Standart Sözleşme Maddelerini kendiliğinden kurmaz, onların yerine geçmez veya onları değiştirmez.** SCC güvencesi, ilgili tarafların uygun resmî maddeleri geçerli biçimde kabul etmesine, gerekli ekleri tamamlamasına ve diğer hukuki aktarım şartlarını yerine getirmesine bağlıdır.

## 2. Uygulanabilir AB Düzenlemeleri

Temel düzenlemeler:

1. **Komisyon Uygulama Kararı (AB) 2021/914**: GDPR Madde 46 kapsamında üçüncü ülkelere uygun nitelikteki kişisel veri aktarımlarına ilişkin SCC'ler. [Resmî EUR-Lex metni](https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj).
2. **Komisyon Uygulama Kararı (AB) 2021/915**: GDPR Madde 28 kapsamında veri sorumlusu-veri işleyen ilişkileri için kullanılabilecek standart sözleşme maddeleri. Bunlar **Bölüm V aktarım SCC'lerinin yerine geçmez**. [Resmî EUR-Lex metni](https://eur-lex.europa.eu/eli/dec_impl/2021/915/oj).
3. Alıcı ve somut koşullara uygun olduğu ölçüde GDPR **Madde 45 yeterlilik kararları** veya diğer hukuka uygun aktarım mekanizmaları.

Vira'nın kurumsal DPA'sı, müşterinin talimatlarına dayanan veri işlemeyi düzenler. Tarafların ayrıca **2021/914 aktarım SCC'sine** ihtiyaç duyup duymadığı gerçek sınır ötesi aktarım ilişkisine bağlıdır.

## 3. SCC Ne Zaman Gerekebilir?

Vira'nın ana müşteri depolaması **Avrupa Birliği'nde** yapılandırılmıştır. Bununla birlikte AI sağlayıcıları, destek hizmetleri, altyapı işletmecileri, analitik/reklam alıcıları veya müşterinin seçtiği entegrasyonlar üzerinden AEA dışındaki alıcılara veri aktarımı ya da uzaktan erişim gerçekleşebilir.

AB'de veri saklanması tek başına uluslararası aktarım olup olmadığını, veri aktaran/alıcı tarafı, gerekli hukuki mekanizmayı veya seçilecek mekanizmanın hangisi olduğunu belirlemez.

Değerlendirmede örneğin şu konular dikkate alınır:
- GDPR'a tabi bir kuruluşun ayrı bir üçüncü ülke alıcısına kişisel veri açıklaması veya erişime açması.
- Alıcının ve ülkenin ilgili yeterlilik kararından yararlanıp yararlanmadığı.
- Alıcının veri sorumlusu veya veri işleyen sıfatı.
- İlgili işlem için geçerli SCC'lerin gerçekten kabul edilip edilmediği ya da başka hukuki dayanağın bulunması.
- Uzaktan erişim, sonraki aktarımlar, kamu makamı erişimleri ve yerel hukuk.

Bir AI sağlayıcısının desteklenmesi, kişisel verileri almaya otomatik olarak yetkili olduğu anlamına gelmez.

## 4. (AB) 2021/914 Kapsamındaki Modüller

Uygun **resmî modül**, tarafların gerçek sıfatlarına uygun seçilmelidir:

| Modül | Veri aktaran | Veri alıcısı |
| --- | --- | --- |
| Modül Bir | Veri sorumlusu | Veri sorumlusu |
| Modül İki | Veri sorumlusu | Veri işleyen |
| Modül Üç | Veri işleyen | Veri işleyen |
| Modül Dört | Veri işleyen | Veri sorumlusu |

Modül, web sitesindeki varsayılan bir tercihe göre değil, gerçek veri akışına göre belirlenir.

Örneğin, kurumsal müşteriyle Vira'nın veri sorumlusu-veri işleyen ilişkisi ve Vira'nın başka bir veri işleyene sonraki aktarımı farklı modüller gerektirebilir. Bağımsız reklam alıcısı farklı sıfata sahip olabilir. Kendi AI sağlayıcısı erişim bilgilerini kullanan kurumsal müşterinin sağlayıcıyla doğrudan ilişkisi de bulunabilir.

## 5. Taraflar ve Aktarımın Açıklanması

Resmî SCC'ye dayanılan her aktarım için veri aktaran ve alıcı tarafların hukuki kimliği, adresleri, iletişim bilgileri, faaliyetleri ve sözleşmesel sıfatları belirtilmelidir. Vira'nın mevcut işleticisi **Esad Türkel, İstanbul, Türkiye**, iletişim **hello@tryvira.xyz**'dir. Diğer taraflar ve kanunen gereken ek kimlik bilgileri somut aktarıma özgüdür.

SCC ekleri gerçek veri akışını doğru açıklamalıdır:

| SCC eki | Gerekli içerik |
| --- | --- |
| **Ek I.A** | Veri aktaran ve alıcının kimlikleri, sıfatları, iletişim bilgileri ve gerekli imza/katılım |
| **Ek I.B** | İlgili kişi ve veri kategorileri, hassas veriler, sıklık, işleme işlemleri, amaç, süre, saklama, alıcı ve sonraki aktarım |
| **Ek I.C** | Gerektiğinde yetkili denetim otoritesi |
| **Ek II** | Gerçek işleme ortamında uygulanan teknik ve idari güvenlik tedbirleri |
| **Ek III** | İlgili modül/seçeneğin gerektirdiği durumlarda alt veri işleyenler |

Bu herkese açık belgede sağlayıcı, modül, ülke, sıklık, otorite, imza, tarih veya güvenlik önlemi varsayılmamıştır. Bunlar imzalanan gerçek aktarım belgelerinde somut olarak belirlenir.

## 6. Resmî Metin ve İzin Verilen Değişiklikler

SCC uygulanıyorsa taraflar, **(AB) 2021/914'ün ilgili resmî maddelerini değiştirmeden**, uygun modül ve hukuken izin verilen seçenekleri seçerek, ekleri tamamlayarak kabul eder.

Tamamlayıcı güvenlik veya ticari hükümler, SCC ile çelişmemeli ve ilgili kişilerin haklarını zayıflatmamalıdır. Vira tarafından hazırlanmış bir açıklama veya bağlantı, resmî maddelerin gerçekten kabul edilmiş kopyasının yerini tutmaz.

Resmî SCC'nin gerektirdiği uygulanacak hukuk ve yetkili mahkeme seçenekleri, ilgili modüle uygun belirlenir; Vira Kullanım Koşullarındaki genel yetki veya hukuk hükmü otomatik olarak bunun yerine geçmez.

## 7. Aktarım Etki Değerlendirmesi ve Ek Önlemler

SCC'ye dayanılmadan önce ilgili taraflar, aktarıma ilişkin koşulları ve alıcı ülke hukuku ile uygulamaları çerçevesinde sözleşmeye uyulabilirliği değerlendirir.

İlgili konular:
- Verinin türü, hassasiyeti, miktarı ve aktarım sıklığı.
- Alıcının okunabilir içerik mi yoksa sınırlı/takma adlı veri mi işlediği.
- Gerçekte uygulanmış aktarım ve saklama şifrelemesi, erişim ve anahtar yönetimi.
- Kamu makamı erişim talepleri ve mevcut hukuki başvuru yolları.
- Sonraki aktarımlar, destek erişimi, alt işleyen sözleşmeleri ve ihlal müdahalesi.

Risk ve uygulanabilirliğe göre teknik, idari veya sözleşmesel ek tedbirler belirlenir. **Bu belge her sağlayıcı için belirli şifreleme, anahtar yönetimi veya aktarım etki değerlendirmesinin tamamlandığını iddia etmez.**

## 8. Sonraki Aktarımlar ve Alt Veri İşleyenler

Veri alıcısı başka sağlayıcıları kullanabilir veya verileri tekrar aktarabilirse uygulanabilir SCC hükümleri ve müşteri DPA'sı bildirim, yetkilendirme, eşdeğer güvence ve sonraki aktarım kurallarını belirler.

[Sağlayıcılar Kaydı](subprocessors.tr.md), bilinen hizmet türlerini ve altyapı, bağımsız veri sorumlusu veya isteğe bağlı AI sağlayıcısı ayrımını gösterir. Bir sağlayıcının listede bulunması, yeni aktarıma otomatik izin değildir.

## 9. Türkiye'deki KVKK Aktarımları Ayrıdır

Kişisel verilerin işlenmesi veya aktarımı **KVKK Madde 9** kapsamında ise AB SCC'si tek başına Türkiye'nin yurt dışına aktarım şartlarını otomatik olarak karşılamaz.

Türkiye'nin kendi resmî standart sözleşme türleri ve bildirim usulü bulunur. **Kişisel Verileri Koruma Kurumu**, ilgili standart sözleşmenin Kurulun ilan ettiği resmî metne uygun kullanılmasını ve bu mekanizmanın uygulanması hâlinde **imzadan itibaren beş iş günü içinde Kuruma bildirilmesini** açıklar.

Bkz. [KVKK Yurt Dışına Aktarım](https://www.kvkk.gov.tr/Icerik/2053/Yurtdisina-Aktarim) ve [KVKK standart sözleşme açıklaması](https://www.kvkk.gov.tr/Icerik/8170/Yurt-Disina-Kisisel-Veri-Aktariminda-Kullanilacak-Standart-Sozlesmelerde-Dikkat-Edilmesi-Gereken-Hususlara-Iliskin-Kamuoyu-Duyurusu).

## 10. Müşteriye Özgü Düzenlemeler ve İletişim

Belirli Vira müşterisi veya AI sağlayıcısına uygulanacak aktarım mekanizması, ilgili tarafların kabul edilmiş sözleşmeleri ve gerçek teknik yapılandırmayla belirlenir. Müşteri haricî model sağlayıcısını seçiyorsa doğrudan sağlayıcı sözleşmesi de önem kazanabilir.

Kurumsal ortamınızda uygulanacak aktarım güvenceleri için **hello@tryvira.xyz** adresine başvurabilirsiniz.

Herhangi bir imzalanmış SCC'nin hukuki yorumunda, bu açıklama yerine **Avrupa Komisyonunun resmî metni** esas alınır.

---

© 2026 Vira.
