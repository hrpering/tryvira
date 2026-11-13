# vira

**Yapay zekânın nasıl yanıt verdiğini, karar verdiğini ve araç kullandığını tanımlayın, test edin ve yönetin.**

Vira; mevcut AI uygulamalarının ve agent'ların davranışlarını modelden ve tek bir uzun prompt'tan bağımsız, yönetilebilir bir katmanda ele almak için geliştiriliyor. Göreve özgü gereksinimleri tanımlamayı, değişiklikleri değerlendirmeyi, sürümlemeyi, yetkili biçimde yayımlamayı ve çalışma anında neyin uygulandığını incelemeyi hedefliyor.

**Geliştirme aşamasında:** SDK ve örnekler herkese açık. Ancak Vira hizmetine ve Studio iş akışlarına genel erişim henüz açık değil. Ürün erişimi olmadan chatbot örneğinin **Vira OFF** tarafını, kendi model sağlayıcı anahtarınızla çalıştırabilirsiniz. **Vira ON** için Vira hesabı, yetkili bağlantı ve yayımlanmış uygun davranış gerekiyor.

## Neden Vira?

Bir asistanın verdiği yanlış cevabı düzeltmek kolay. Aynı düzeltmenin farklı modellerde, agent'larda ve sürümlerde **hangi kapsamda geçerli olduğunu**, **test edilip edilmediğini** ve **gerçekte uygulanıp uygulanmadığını** yönetmek zor.

Vira davranışı bir prompt parçası olmaktan çıkarıp gözden geçirilebilen ve sürümlenebilen bir ürün bileşeni hâline getirmeyi amaçlıyor:

- **Tanımla:** Semantic Task, Behavior Point, Behavior Program ve Strategy.
- **Değerlendir:** Örnekler, karşı örnekler, inceleme ve onay kapıları.
- **Yayımla:** Yetkili ve kapsamı belirlenmiş sürümü ayrı bir kararla etkinleştir.
- **Uygula ve izle:** Entegrasyonun desteklediği runtime kimliği, yanıt ve trace bilgilerini incele.
- **İyileştir:** İzinli gerçek kullanım verilerinden Teach önerileri oluştur; değerlendirme olmadan otomatik canlıya geçirme.

**Örnek:** Bir retail-media asistanı iki kampanyanın ROAS değerini karşılaştırırken farklı attribution window veya satış kapsamlarını aynı kabul etmemeli. Vira'da bu kontrol, göreve ait açık bir davranış olarak tanımlanıp değerlendirilebilir. Bu bir ürün senaryosudur; kanıtlanmış bir performans artışı iddiası değildir.

## Başlayın

| Amacınız | Bağlantı |
| --- | --- |
| Ne işe yaradığını öğrenmek | [Ürün anlatımı (EN)](docs/what-is-vira.md) |
| Yerel OFF/ON chatbot örneğini denemek | [Next.js örneği (EN)](examples/frameworks/node-next/README.md) |
| JavaScript, Python veya MCP ile bağlanmak | [Geliştirici rehberi (EN)](docs/developer-guide.md) |
| Davranış paketi / Teach sürecini anlamak | [Packs](docs/packs.md) · [Teach](docs/teach.md) |
| Agent Skills kullanmak | [Skills](skills/README.md) |
| Müşteri olarak değerlendirmek | [Ekipler için rehber (EN)](docs/for-teams.md) |

**Lisans ayrımı:** Bu herkese açık dokümantasyon deposunun lisansı proprietary'dir. Ayrı dağıtılan SDK/MCP paketleri kendi MIT lisanslarına tabidir. [Ayrıntılar](docs/published-packages.md).

[English README](README.md) · [Dokümantasyon](docs/README.md) · [Sorun bildir](https://github.com/hrpering/tryvira/issues)
