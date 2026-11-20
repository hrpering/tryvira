# Vira EU International Data Transfer SCC Framework

**Last updated:** November 20, 2026  
**Version:** 1.0  
**Services:** https://tryvira.xyz and its subdomains  
**Contact:** hello@tryvira.xyz

## 1. Purpose

This document explains how Vira addresses **Standard Contractual Clauses ("SCCs")** when an international transfer of personal data requires safeguards under **Chapter V of the EU General Data Protection Regulation (GDPR)**.

It supplements the [EU GDPR Addendum](eu-gdpr-addendum.md), [Privacy Policy](privacy.en.md), [Data Processing Addendum](dpa.en.md), and [Provider Register](subprocessors.en.md).

**This public document does not itself execute, replace, or modify official European Commission Standard Contractual Clauses.** SCCs protect a particular transfer only when the appropriate parties validly enter into the relevant official clauses, complete the applicable annexes, and meet any other legal transfer requirements.

## 2. Applicable EU Instruments

The key EU legal instruments are:

1. **Commission Implementing Decision (EU) 2021/914**, covering SCCs for qualifying transfers of personal data to third countries under GDPR Article 46. [Official EUR-Lex text](https://eur-lex.europa.eu/eli/dec_impl/2021/914/oj).
2. **Commission Implementing Decision (EU) 2021/915**, providing optional standard contractual clauses for controller-to-processor relationships under GDPR Article 28. This is **not a substitute for the Chapter V transfer SCCs**. [Official EUR-Lex text](https://eur-lex.europa.eu/eli/dec_impl/2021/915/oj).
3. The GDPR's **Article 45 adequacy decisions** and other lawful transfer mechanisms, where applicable to the particular recipient and circumstances.

Vira's customer DPA addresses data processing on a customer's instructions. Whether the parties also need the separate **2021/914 transfer SCCs** depends on their actual cross-border transfer.

## 3. When SCCs May Be Needed

Vira's primary customer storage is configured in the **European Union**. Nevertheless, personal information may be remotely accessed or processed by recipients outside the EEA, including AI providers, connected support services, infrastructure vendors, analytics/advertising recipients, or customer-selected integrations.

EU storage alone does not establish whether an international transfer occurs, who the data exporter/importer is, whether a Chapter V mechanism is needed, or which mechanism applies.

A transfer assessment considers, among other things:
- Whether an entity subject to the GDPR discloses or makes personal data available to a separate recipient in a third country.
- Whether that recipient and destination benefit from an applicable adequacy decision.
- The recipient's legal role, including controller or processor status.
- Whether the intended processing is governed by appropriate and valid SCCs or another permitted basis.
- The requirements associated with remote access, onward transfers, government access, and local law.

Merely listing an AI provider as supported does not mean Vira has authorized it to receive personal information.

## 4. Modules Under Decision (EU) 2021/914

The correct **official module** must match the parties' actual roles:

| Module | Exporter | Importer |
| --- | --- | --- |
| Module One | Controller | Controller |
| Module Two | Controller | Processor |
| Module Three | Processor | Processor |
| Module Four | Processor | Controller |

The selected module is determined by the real data flow, not a default setting on the website.

For example, an organizational customer's controller-to-Vira processor relationship may also involve onward processor-to-processor transfers, but an independent advertising recipient may operate under a different controller role. An enterprise customer using its own provider credentials can also have a direct relationship with that provider.

## 5. Contracting Parties and Transfer Details

For each transfer relying on the official SCCs, the executed package must identify the data exporter and importer, their relevant legal identities, addresses, contacts, activities, and contractual capacity. Vira's current operator is **Esad Türkel, Istanbul, Türkiye**, with contact **hello@tryvira.xyz**. The other parties and any legally required further identification are specific to the transfer.

Relevant SCC annexes must accurately describe the real data flow. Information can include:

| SCC annex | Information |
| --- | --- |
| **Annex I.A** | Identities, roles, contact details and applicable signatures/adhesion of data exporter and importer |
| **Annex I.B** | Data subject categories, personal-data categories, sensitive data where relevant, transfer frequency, processing operations, purposes, duration, retention, recipients and onward transfers |
| **Annex I.C** | Competent supervisory authority where required |
| **Annex II** | Technical and organizational security measures applicable to the actual processing |
| **Annex III** | Sub-processors, where the relevant module/option requires this annex |

No supplier, module, destination country, transfer frequency, regulator, signature, date, or technical measure is presumed from this public document. Those elements must be established for the concrete transfer in the executed materials.

## 6. Official Text and Permitted Changes

When SCCs are used, the contracting parties adopt the **unaltered operative text** of the relevant 2021/914 clauses, selecting the suitable modules and legally permitted options and completing the annexes.

The parties may add supplemental protections or commercial provisions only if they do not contradict the SCCs or undermine the rights of data subjects. A Vira-generated paraphrase or link is not equivalent to an executed copy of the official clauses.

The governing law and forum choices required by the applicable module must be completed in accordance with the official SCCs, not automatically replaced by the general governing-law clause in Vira's Terms.

## 7. Transfer Impact Assessment and Supplementary Measures

Before relying on SCCs, relevant parties evaluate the circumstances of the transfer and the ability to comply with the clauses in light of the destination country's laws and practices.

The assessment may consider:
- Data type, sensitivity, volume, and frequency.
- Whether the recipient processes readable content or only pseudonymized/limited data.
- Encryption in transit and at rest, access controls, and key management as actually implemented.
- Government-access requests and legally available remedies.
- Onward transfers, support access, provider/sub-processor contracts, and incident response.

Technical, organizational, or contractual supplementary measures are selected based on risk and feasibility. **This document does not certify that a particular encryption, key custody, or transfer-impact assessment is already in place for every provider.**

## 8. Onward Transfers and Sub-processors

Where a recipient may engage additional providers or transfer information further, the applicable SCC provisions and customer DPA govern notices, authorization, equivalent safeguards, and onward-transfer requirements.

The [Provider Register](subprocessors.en.md) identifies known service types and differentiates infrastructure, independent controllers, and optional AI providers. A provider's appearance in that list is not automatic permission for a new transfer.

## 9. Türkiye KVKK Transfers Are Separate

Where personal data processing or transfers are subject to **Türkiye's KVKK Article 9**, EU SCCs alone do not automatically meet Turkish transfer requirements.

Türkiye has its own official standard contract models and notification procedures. The **Turkish Personal Data Protection Authority (KVKK)** explains that the applicable Turkish standard contract must follow the approved official form and must be notified to the authority **within five business days after signing**, where that mechanism is used.

See the [KVKK International Transfers page](https://www.kvkk.gov.tr/Icerik/2053/Yurtdisina-Aktarim) and [KVKK standard-contract guidance](https://www.kvkk.gov.tr/Icerik/8170/Yurt-Disina-Kisisel-Veri-Aktariminda-Kullanilacak-Standart-Sozlesmelerde-Dikkat-Edilmesi-Gereken-Hususlara-Iliskin-Kamuoyu-Duyurusu).

## 10. Customer-Specific Arrangements and Contact

The transfer mechanism applicable to a specific Vira customer or AI provider is established through the relevant parties' accepted contracts and the actual technical configuration. Where a customer selects an external model provider, the customer's direct contractual arrangements may also be relevant.

To request the transfer safeguards applicable to your enterprise configuration, contact **hello@tryvira.xyz**.

For legal interpretation, the **official European Commission text**, not this explanatory framework, governs any executed SCCs.

---

© 2026 Vira.
