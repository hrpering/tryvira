# Vira Üçüncü Taraf Hizmetler ve Alt Veri İşleyenler

**Son güncelleme:** 20 Kasım 2026  
**Sürüm:** 1.0  
**Hizmet:** https://tryvira.xyz ve alt alan adları  
**İletişim:** hello@tryvira.xyz

## 1. Kapsam ve Roller

Bu kayıt, Vira ile ilişkili üçüncü taraf hizmetleri, hangi amaçlarla bilgi işleyebileceklerini ve işleme sıfatlarının nasıl farklılaşabileceğini açıklar.

**Alt veri işleyen**, Vira'nın kurumsal müşteri adına işlediği kişisel verileri yine Vira adına işlemesi için görevlendirdiği sağlayıcıdır. Bir sağlayıcı belirli faaliyetlerde **bağımsız veri sorumlusu**, birlikte veri sorumlusu veya müşterinin doğrudan seçtiği hizmet sağlayıcı da olabilir. Sağlayıcı adının burada yer alması, bütün Vira hesaplarına veya konuşmalarına eriştiği anlamına gelmez.

Vira'nın ana müşteri verisi depolaması, ilgili barındırma yapılandırmaları kapsamında **Avrupa Birliği'ndedir**. Bu, bütün alıcıların verileri yalnızca AB içinde işlediği anlamına gelmez.

## 2. Altyapı, Kimlik, Analitik ve Güvenlik

| Sağlayıcı / hizmet | İşlev | İşlenebilecek veriler | Rol ve kullanım sınırı |
| --- | --- | --- | --- |
| **Supabase** | Yapılandırıldığı durumlarda veritabanı, kimlik doğrulama veya ilişkili barındırılan altyapı | Hesap/kuruluş kayıtları, çalışma alanı bilgileri, müşteri içeriği ve yetkili operasyonel kayıtlar | Yapılandırıldığı ve sözleşmeyle kapsandığı ölçüde Vira adına altyapı işlemesi |
| **Cloudflare** | Web analitiği ve yapılandırılmış ilgili web altyapısı/güvenlik hizmetleri | Web istekleri, teknik ağ bilgileri, toplu ölçüm olayları | Somut Cloudflare hizmetine ve sözleşmesine bağlı rol; Cloudflare Web Analytics kendine özgü ziyaretçi takip çerezi gerektirmez |
| **Sentry** | Hata takibi, tanılama ve hizmet güvenilirliği | Hata ve olay üst verileri; yapılandırılmış raporlamada varsa istek bağlamı | Ürün yapılandırması ve veri minimizasyonuna tabi operasyonel hizmet sağlayıcısı |
| **Google Analytics 4** | Web trafiği, etkileşim ve analitik | Cihaz/tarayıcı bilgileri, olay tanımlayıcıları, ziyaret edilen sayfalar, ölçüm verileri | İlgili Google şartlarına ve etkin veri paylaşım ayarlarına göre rolü değişen analitik hizmeti |
| **Google Tag Manager** | Web etiketlerinin çalıştırılması ve yönetimi | Teknik etiket çalışma bilgileri ve etkin etiketlerin aktardığı veriler | Etiket yönetimi; her etiketin alıcı sağlayıcısı ilgili işlemenin sıfatını belirler |
| **Meta Pixel** | Reklam atfı ve ölçümü | Sayfa olayları, tarayıcı tanımlayıcıları, reklam/dönüşüm sinyalleri | Uygulanabilir düzenlemelere göre bağımsız veya birlikte veri sorumlusu olabilen reklam alıcısı |
| **Microsoft Advertising** | Reklam atfı ve dönüşüm ölçümü | Tarayıcı, tıklama, kampanya ve olay tanımlayıcıları | Bağımsız veya ilgili diğer veri sorumluluğu düzenlemelerinde hareket edebilen reklam alıcısı |
| **Google ile giriş** | Google üzerinden hesap kimlik doğrulaması | OAuth kimlikleri, ad, e-posta, izin verilen hesap bilgileri | Google hesap hizmeti bakımından bağımsız veri sorumlusu olabilir |
| **GitHub ile giriş** | GitHub üzerinden hesap kimlik doğrulaması | OAuth kimlikleri, ad, e-posta, izin verilen hesap bilgileri | GitHub hesap hizmeti bakımından bağımsız veri sorumlusu olabilir |

Burada belirtilen reklam, analitik ve giriş sağlayıcıları, **kurumsal müşterinin konuşma verilerinin otomatik olarak yetkilendirilmiş alt veri işleyenleri değildir**. İşleme, somut hizmete, izne ve yapılandırmaya bağlıdır.

## 3. AI Model ve Inference Sağlayıcıları

Vira; inference, embedding, anlamsal analiz, değerlendirme ve Teach AI için yapılandırmaya bağlı haricî AI sağlayıcılarını destekler. Olası sağlayıcılar değerlendirilmektedir; gerçek bir istekte seçilen sağlayıcı farklılık gösterebilir.

Değerlendirilen her model sağlayıcısının aktif olduğunu veya müşteri verilerini aldığını iddia eden genel bir liste yayımlamıyoruz. Bir sağlayıcı yalnızca yapılandırılmış ve katılmasına izin verilmiş işlemlerde içerik alabilir.

Kurumsal müşteriler için aktif sağlayıcılar, ilgili işleme sıfatları ve gerekli yurt dışı aktarım düzenlemeleri, Müşteri Kişisel Verileri işlenmeden önce kabul edilen sipariş, bağlantı ayarları veya ilişkili sözleşmede belirlenmelidir.

Kurumsal müşterilere sunulduğu durumlarda kendi model sağlayıcısı erişim bilgilerini kullanma imkânı verilebilir. Bu düzenlemede sağlayıcının koşulları ve işleme sıfatı, müşterinin sağlayıcıyla doğrudan ilişkisi üzerinden belirlenebilir.

## 4. Coğrafi İşleme ve Yurt Dışına Aktarımlar

Ana müşteri veritabanı/depolama yapılandırması AB'dedir. İnternet sitesi ölçümü, OAuth, hata takibi, model inference veya uzaktan destek başka ülkelerde işleme veya erişim gerektirebilir.

Bir aktarımın uygun hukuki mekanizma gerektirdiği durumlarda yeterlilik kararı veya uygun sözleşmesel güvence gibi mekanizmalar ilgili mevzuat uyarınca kurulmalıdır. [Veri İşleme Ek Sözleşmesi](dpa.tr.md), zorunlu yurt dışı aktarım standart sözleşmelerinden ayrıdır.

Sağlayıcının veri konumu ürüne, hesap yapılandırmasına ve işleme amacına bağlı olarak değişebilir. AB'de barındırılan hizmet, bütün bağlı sağlayıcılar bakımından yalnızca AB'de işleme garantisi değildir.

## 5. Alt Veri İşleyen Yetkilendirmesi ve Değişiklikler

[DPA'yı](dpa.tr.md) kabul eden kurumsal müşteriler açısından sağlayıcıların alt veri işleyen sıfatıyla kullanımı; DPA'daki yetkilendirme, sözleşmesel koruma ve değişiklik bildirimi koşullarına tabidir.

İlgili alt veri işleyenin önemli ölçüde eklenmesi veya değiştirilmesi, hukuken gerektiğinde uygun müşteri iletişim kanalı üzerinden bildirilir. Müşteriler belgeli veri koruma itirazlarını **hello@tryvira.xyz** adresine iletebilir.

Yalnızca Vira'nın kendi web sitesi reklamında kullanılan ve veri işleyen sıfatıyla Müşteri Kişisel Verisi işlemeyen sağlayıcı, bu kayıtta yer aldığı için DPA alt veri işleyeni sayılmaz.

## 6. İlgili Belgeler ve İletişim

- [Gizlilik Politikası](privacy.tr.md): kişisel veriler, işleme amaçları ve ilgili kişi hakları.
- [Çerez Politikası](cookies.tr.md): analitik/reklam takibi ve izin.
- [Veri İşleme Ek Sözleşmesi](dpa.tr.md): kabul edildiğinde uygulanan sözleşmesel veri işleme yükümlülükleri.

Kurumsal ortamınızda yapılandırılmış sağlayıcılar hakkında bilgi için **hello@tryvira.xyz** adresine başvurabilirsiniz.

---

© 2026 Vira.
