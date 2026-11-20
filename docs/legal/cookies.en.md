# Vira Cookie Policy

**Last updated:** November 20, 2026  
**Version:** 1.0  
**Website:** https://tryvira.xyz  
**Studio:** https://studio.tryvira.xyz  
**Contact:** hello@tryvira.xyz

## 1. Scope

This Cookie Policy describes cookies and similar tracking technologies used on **tryvira.xyz and its subdomains**, including **studio.tryvira.xyz**, as part of Vira-operated websites and browser-based Services.

Vira is operated by **Esad Türkel**, an independent individual operator based in Istanbul, Türkiye. Questions and privacy requests can be sent to **hello@tryvira.xyz**.

For the processing of personal information more generally, see our [Privacy Policy](privacy.en.md). The [Terms of Service](terms.en.md) govern use of the Services.

## 2. What Are Cookies and Similar Technologies?

Cookies are small pieces of information that a website may store in a browser or receive with subsequent requests. They can support authentication, maintain a session, remember preferences, measure traffic, or support advertising.

Related technologies include browser local storage, pixels, tags, event beacons, and server-side measurement. Some collect or send information without setting a conventional cookie. Whether a technology is used can depend on the page, consent choice, browser settings, and service configuration.

**First-party cookies** are set for a domain associated with Vira. **Third-party technologies** are provided by outside services and may set their own identifiers or receive event information. A cookie set on a Vira domain is not necessarily processed only by Vira if a third-party measurement provider receives its identifier.

## 3. Categories of Technologies

| Category | Purpose | Choice |
| --- | --- | --- |
| Strictly necessary | Sign-in, session integrity, authentication, request protection, essential security, and remembering cookie preferences | Used when necessary to deliver a requested service; cannot generally be disabled through the optional-cookie panel |
| Functional preferences | Remembering optional display, language, or experience preferences where implemented | Controlled by the relevant setting or consent where required |
| Analytics and performance | Measuring visits, use of pages, errors, and performance to understand how a site functions | Subject to consent where required by applicable law |
| Advertising and measurement | Recording advertising interactions, attribution, conversion measurement, and permitted audience-related functions | Subject to prior consent where required by applicable law |

Not all categories are present on every page or in every deployment. Certain technical diagnostics can be processed without a browser cookie; their legal treatment depends on the actual data collected and purpose.

## 4. Essential Authentication and Session Cookies

Vira's Studio authentication implementation includes the following first-party session cookies:

| Cookie | Purpose | Duration |
| --- | --- | --- |
| `vira_session` | Identifies the active authenticated session | Until the configured session expiration or earlier sign-out/revocation |
| `vira_session_token` | Supports verification of the authenticated session | Until the configured session expiration or earlier sign-out/revocation |
| `vira_session_csrf` | Supports protection against cross-site request forgery (CSRF) | Until the configured session expiration or earlier sign-out/revocation |

These cookies are associated with the Vira service domain according to the application's session configuration. They are not advertising cookies. The session and session-token cookies are configured with `HttpOnly` in the relevant Studio implementation; the CSRF cookie must be available for the application's request-protection flow.

Other essential cookies or browser storage may be used by security, authentication, hosting, or consent-management infrastructure, depending on the part of the Services accessed.

Blocking or deleting essential session cookies can prevent sign-in or interrupt a session.

## 5. Analytics and Advertising Providers

The following technologies are used in Vira's website and measurement environment. The identifiers listed are **provider identifiers that may be created when the associated feature or tag is enabled**; they are not a statement that every identifier is always present on every Vira page or device.

| Provider or technology | Examples of cookie or tracking identifiers | Main purpose | Typical persistence |
| --- | --- | --- | --- |
| Google Analytics 4 | `_ga`, `_ga_<measurement-id>` | Distinguishing visits and measuring site activity | Depends on the Google Analytics property and cookie-expiration configuration |
| Google Tag Manager | No specific GTM cookie is required just to manage tags | Deploying and controlling the tags of other services | Determined by the tags it manages |
| Meta Pixel | `_fbp`; `_fbc` when an applicable ad-click identifier is available | Advertising attribution, conversion and campaign measurement | Depends on Pixel and browser settings; identifiers may persist across visits |
| Microsoft Advertising (UET) | `_uetsid`, `_uetvid`, and click-related identifiers where applicable | Advertising attribution, conversion and visit measurement | Session-based or persistent according to the particular identifier and UET settings |
| Cloudflare Web Analytics | No visitor-tracking cookie required by Cloudflare Web Analytics itself | Web traffic and performance measurement | Uses a cookie-free measurement mechanism |
| Sentry | No universal advertising cookie inherent to Sentry error monitoring | Error reporting and operational diagnostics; optional integrations may collect browser events | Depends on the enabled monitoring feature and its configuration |

The table describes product capabilities and example identifiers, not an exhaustive live browser-cookie inventory. Actual identifiers, domains, and expiry times may vary with consent, browser behavior, tag configuration, and provider changes. A tag can also send an event without setting a browser cookie.

More information is available in the providers' own documentation:

- [Google Analytics: cookies used by GA4](https://support.google.com/analytics/answer/11397207?hl=en)
- [Microsoft Advertising: Universal Event Tracking](https://help.ads.microsoft.com/apex/index/3/en-in/53056)
- [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/about/)
- [Meta privacy and cookies information](https://www.facebook.com/privacy/policies/cookies/)
- [Sentry documentation](https://docs.sentry.io/)

## 6. Your Cookie Choices

Vira's cookie preference interface offers **Accept**, **Reject**, and **Preferences** choices.

Where applicable law requires consent, optional analytics and advertising technologies are not activated until you give an affirmative choice. Refusing optional tracking does not prevent access to the essential functions of the requested Service.

You may revisit the website's **Cookie Preferences / Cookie Settings** controls to change or withdraw your choice. Preferences may need to be set again when changing browser, device, or relevant site storage.

Withdrawing consent affects subsequent consent-based tracking. It does not necessarily erase information lawfully collected before withdrawal. Where available, browser controls can be used to remove previously stored cookies.

A provider-specific setting or browser privacy protection may also restrict tracking independently of the Vira preference panel.

## 7. How to Manage Cookies in Your Browser

Most browsers let you inspect, block, or delete cookies and site data. You can also use private browsing, anti-tracking settings, or browser privacy features, subject to their limitations.

If you block necessary cookies, portions of Studio, authentication, or other account-based features may stop working.

Deleting cookies may also clear saved consent choices, requiring you to choose again.

## 8. Information Collected Through Tracking

Depending on the activated technology, processing may include device or browser identifiers, IP-derived location, pages visited, referral data, interaction events, advertising click references, timestamps, and diagnostic information.

Such data may be received by the relevant provider and processed in different countries according to its arrangements. More information about recipient categories, international transfers, legal bases, and privacy rights is provided in the [Privacy Policy](privacy.en.md).

We do not treat consent to optional website tracking as consent to use customer prompts, AI conversations, or Behavior Packs for general-purpose AI model training.

## 9. Retention

The lifespan of a cookie is different from the period for which information collected through that cookie is retained in a provider's systems.

Essential authentication cookies expire with the configured session or are cleared when appropriate. Other cookies may be session cookies or may persist for a period determined by the provider's configuration. Consent preferences may be remembered to respect your choices.

Analytics, advertising, and diagnostic providers may maintain records for periods governed by their settings and applicable legal requirements. For details concerning a particular identifier or an access/deletion request, contact **hello@tryvira.xyz**.

## 10. Children's Access

Vira accounts and Services are intended for users aged **18 or older**. We do not intentionally offer accounts to children.

## 11. Updates to this Policy

We may update this Cookie Policy if the Services, tracking technologies, providers, or legal requirements change. The latest version is available in Vira's legal documentation. Where a new processing activity requires consent, the relevant choice will be requested according to applicable law.

## 12. Contact

**Vira**  
**Operator:** Esad Türkel  
**Location:** Istanbul, Türkiye  
**Website:** https://tryvira.xyz  
**Studio:** https://studio.tryvira.xyz  
**Email:** hello@tryvira.xyz

---

© 2026 Vira.
