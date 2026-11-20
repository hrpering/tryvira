# Vira Third-Party Services and Sub-processors

**Last updated:** November 20, 2026  
**Version:** 1.0  
**Service:** https://tryvira.xyz and its subdomains  
**Contact:** hello@tryvira.xyz

## 1. Scope and Roles

This register describes third-party services associated with Vira, the purposes for which they may process information, and how their roles may differ.

A **sub-processor** is a provider engaged by Vira to process an organizational customer's personal data on Vira's behalf. A provider can instead be an **independent controller**, a joint controller for particular activities, or a direct service provider chosen by the customer. Using a provider's name in this register does not mean it accesses every Vira account or every conversation.

Vira's primary customer data storage is located in the **European Union** under its configured hosting arrangements. This does not establish that every recipient processes data only in the EU.

## 2. Infrastructure, Identity, Analytics, and Security

| Provider / service | Function | Data potentially involved | Role and usage boundary |
| --- | --- | --- | --- |
| **Supabase** | Database, authentication or associated hosted infrastructure where configured | Account and organization records, workspace metadata, customer content and authorized operational records | Infrastructure processing on Vira's behalf to the extent configured and contractually covered |
| **Cloudflare** | Web analytics and relevant configured web infrastructure/security services | Website requests, technical network information and aggregate measurement events | Processing role depends on the particular Cloudflare service and agreement; Cloudflare Web Analytics does not require its own visitor-tracking cookie |
| **Sentry** | Error tracking, diagnostics, and service reliability | Error and event metadata; request context if present in configured reporting | Operational service provider, subject to product configuration and data minimization |
| **Google Analytics 4** | Website traffic, engagement and analytics | Device/browser information, event identifiers, pages visited, measurement metadata | Analytics service; processing role depends on the relevant Google terms and enabled data-sharing settings |
| **Google Tag Manager** | Deployment and management of website tags | Technical tag-execution information and data transmitted by enabled tags | Tag management; the underlying receiving vendor determines the role for each tag's processing |
| **Meta Pixel** | Advertising attribution and measurement | Page events, browser identifiers, advertising and conversion signals | Advertising recipient; may act as an independent or joint controller under applicable arrangements |
| **Microsoft Advertising** | Advertising attribution and conversion measurement | Browser, click, campaign, and event identifiers | Advertising recipient; may act independently or under other applicable controller arrangements |
| **Google sign-in** | Account authentication through Google | OAuth identifiers, name, email address, authorized account details | External identity provider; Google may be an independent controller for its account service |
| **GitHub sign-in** | Account authentication through GitHub | OAuth identifiers, name, email address, authorized account details | External identity provider; GitHub may be an independent controller for its account service |

Advertising, analytics, and sign-in providers listed here are **not automatically authorized sub-processors of enterprise customer conversation data**. Their activities depend on the specific service, consent, and configuration.

## 3. AI Model and Inference Providers

Vira supports configuration-dependent external AI providers for inference, embeddings, semantic analysis, evaluation, and Teach AI. The possible providers are under evaluation and the provider selected for an actual request may vary.

We do **not** publish a universal list claiming that every evaluated model provider is active or receives customer data. A provider may receive content only for operations in which it is configured and permitted to participate.

For business customers, the active provider(s), relevant processing role, and any required international-transfer arrangements should be identified in the accepted order, connection settings, or related agreement before their use with Customer Personal Data.

Enterprise customers may also use their own model-provider credentials where offered. In that arrangement, the provider's terms and data processing role may be governed by the customer's direct relationship with the provider.

## 4. Geographic Processing and International Transfers

The main customer database/storage configuration is EU-based. Website measurement, OAuth, error tracking, model inference, or remote support may involve processing or access in other countries.

Where an international transfer requires a lawful transfer mechanism, such as an applicable adequacy decision or appropriate contractual safeguards, that mechanism must be established under the relevant law. The [Data Processing Addendum](dpa.en.md) is separate from any mandatory international transfer standard clauses.

Provider data location can vary by product, account configuration, and processing purpose. A service advertised as EU-hosted does not guarantee EU-only processing for all connected providers.

## 5. Sub-processor Authorization and Changes

For engagements adopting the [DPA](dpa.en.md), Vira's use of providers as sub-processors is subject to the DPA's authorization, contractual safeguards, and change-notice provisions.

Material additions or replacements of a relevant sub-processor will be communicated through an appropriate customer contact channel where required. Customers may raise documented data-protection objections by writing to **hello@tryvira.xyz**.

A provider used solely for Vira's own website advertising, rather than for Customer Personal Data under processor instructions, is not designated a DPA sub-processor simply because it appears in this register.

## 6. Related Documents and Contact

- [Privacy Policy](privacy.en.md): personal information, lawful purposes and data subject rights.
- [Cookie Policy](cookies.en.md): analytics/advertising tracking and consent.
- [Data Processing Addendum](dpa.en.md): contractual processing obligations where adopted.

For information about the providers configured for your enterprise environment, contact **hello@tryvira.xyz**.

---

© 2026 Vira.
