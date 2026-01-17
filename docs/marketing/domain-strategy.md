# Domain Strategy

> **Last Updated:** 2026-01-17
>
> This document evaluates URL structure options for our interview prep landing pages and provides a recommendation.

---

## Executive Summary

**Recommendation: Path-based structure on a single domain**

Use `togtog.com/prep/[company]-[role]` (or similar branded domain) for all landing pages. This approach offers the best balance of SEO equity consolidation, operational simplicity, and cost efficiency for our current stage.

---

## Options Evaluated

### Option 1: Separate Domains

**Structure:** Individual domains per company/role
- `google-interview-prep.com`
- `amazon-swe-interview.com`
- `mckinsey-case-prep.com`

#### Pros
- Exact-match domains can rank well for specific queries
- Complete brand isolation (useful if targeting different audiences)
- Can sell individual domains later
- No risk of one page's penalty affecting others

#### Cons
- **High cost:** ~$12-15/year per domain × 100+ targets = $1,200-1,500/year minimum
- **SEO fragmentation:** Each domain starts with zero authority; no shared link equity
- **Management overhead:** Separate DNS, SSL certs, analytics, search console for each
- **Brand dilution:** No unified brand presence
- **Slower SEO growth:** Building authority across 100 domains is much harder than one

#### Verdict: **Not Recommended**
Cost and management overhead is prohibitive at scale. SEO benefits of exact-match domains have diminished significantly since Google's algorithm updates.

---

### Option 2: Subdomains

**Structure:** Company/role as subdomain of main domain
- `google-swe.togtog.com`
- `amazon-sde.togtog.com`
- `mckinsey.togtog.com`

#### Pros
- Single domain registration cost
- Can have separate analytics/tracking per subdomain
- Easier to isolate if one subdomain has issues
- Some brand consistency (main domain visible)

#### Cons
- **SEO treated as separate sites:** Google often treats subdomains as distinct entities
- **Link equity not fully shared:** Links to `google-swe.togtog.com` don't fully benefit `amazon-sde.togtog.com`
- **SSL complexity:** Need wildcard SSL or separate certs per subdomain
- **Analytics fragmentation:** Cross-subdomain tracking requires extra configuration
- **User confusion:** Different subdomains may feel like different products

#### Verdict: **Not Recommended**
Subdomains inherit most downsides of separate domains without the exact-match benefit. The SEO fragmentation alone makes this a poor choice.

---

### Option 3: Path-Based (Subdirectories)

**Structure:** All pages under paths on main domain
- `togtog.com/prep/google-software-engineer`
- `togtog.com/prep/amazon-software-engineer`
- `togtog.com/prep/mckinsey-consultant`

#### Pros
- **SEO equity consolidation:** All links benefit the entire domain
- **Single SSL certificate:** One cert covers everything
- **Unified analytics:** One GA property, simple funnel tracking
- **Unified Search Console:** One property to manage
- **Brand consistency:** Clear single brand
- **Lowest cost:** One domain, one SSL, one hosting config
- **Simplest management:** One codebase, one deployment
- **Cross-selling opportunities:** Easy to show related positions

#### Cons
- No exact-match domain benefit (minimal impact post-2012 algorithm updates)
- If domain is penalized, all pages affected (low risk with white-hat SEO)
- Less flexibility for dramatically different branding per position

#### Verdict: **Recommended**
Best balance of SEO, cost, and operational simplicity. Industry standard for content sites.

---

## Detailed Comparison

| Factor | Separate Domains | Subdomains | Path-Based |
|--------|-----------------|------------|------------|
| **Annual cost (100 pages)** | $1,200-1,500+ | $15-50 | $15-50 |
| **SEO equity sharing** | None | Partial | Full |
| **SSL complexity** | 100 certs | Wildcard or 100 | 1 cert |
| **Analytics setup** | 100 properties | 100 or complex | 1 property |
| **Management overhead** | Very High | High | Low |
| **Brand consistency** | None | Partial | Full |
| **Time to rank** | Slowest | Slow | Fastest |
| **Risk isolation** | Best | Good | Lowest |

---

## Recommendation Details

### Primary Domain

**Current:** Deployed at `togtog.com` (via Vercel)

**URL Pattern:** `/prep/[slug]`

**Slug Convention:** `[company]-[role]` in lowercase, hyphenated
- `google-software-engineer`
- `amazon-software-engineer`
- `mckinsey-consultant`
- `meta-product-manager`
- `goldman-sachs-investment-banking-analyst`

### 5 Test URLs (Currently Live)

| Position | URL |
|----------|-----|
| Google SWE | `togtog.com/prep/google-software-engineer` |
| Amazon SWE | `togtog.com/prep/amazon-software-engineer` |
| McKinsey Consultant | `togtog.com/prep/mckinsey-consultant` |
| (Planned) Meta PM | `togtog.com/prep/meta-product-manager` |
| (Planned) Goldman IB | `togtog.com/prep/goldman-sachs-investment-banking` |

### Additional URL Patterns to Support

```
/prep/[slug]              # Main landing pages (current)
/prep/[slug]/questions    # Free question preview (Chunk 11)
/prep/[slug]/modules      # Module breakdown (future)
/learn/[topic]            # Educational content / SEO pages (future)
/blog/[post-slug]         # Content marketing (future)
```

---

## SSL Requirements

### Current State
- **Vercel provides automatic SSL** via Let's Encrypt
- All `*.vercel.app` deployments include HTTPS
- Custom domain SSL is automatic when configured

### Requirements
1. **Force HTTPS:** All HTTP requests redirect to HTTPS (Vercel default)
2. **HSTS header:** Enable Strict-Transport-Security (configure in `next.config.js` or `vercel.json`)
3. **No mixed content:** Ensure all assets load over HTTPS

### Implementation (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains"
        }
      ]
    }
  ]
}
```

---

## Redirect Strategy

### Current Redirects Needed
None currently—we're starting fresh with path-based URLs.

### Future Redirect Scenarios

#### Scenario 1: Company Name Change
If a company rebrands (e.g., Facebook → Meta):
```
/prep/facebook-software-engineer → /prep/meta-software-engineer (301)
```

#### Scenario 2: URL Restructure
If we change slug format in future:
```
/prep/google-software-engineer → /prep/google/software-engineer (301)
```

#### Scenario 3: Position Consolidation
If we merge similar positions:
```
/prep/google-swe-l3 → /prep/google-software-engineer (301)
/prep/google-swe-l4 → /prep/google-software-engineer (301)
```

### Redirect Implementation

**Next.js redirects (next.config.js):**
```javascript
module.exports = {
  async redirects() {
    return [
      {
        source: '/prep/facebook-software-engineer',
        destination: '/prep/meta-software-engineer',
        permanent: true, // 301 redirect
      },
      // Add more as needed
    ]
  },
}
```

### Redirect Best Practices
1. **Always use 301 (permanent)** for SEO equity transfer
2. **Redirect to most specific relevant page** (not homepage)
3. **Update internal links** to point directly to new URLs (don't rely on redirects)
4. **Monitor 404s** in Search Console to catch needed redirects
5. **Document all redirects** in a central location

---

## SEO Considerations

### URL Best Practices (Already Implemented)
- [x] Lowercase URLs
- [x] Hyphens as separators (not underscores)
- [x] Descriptive slugs with keywords
- [x] Short but meaningful paths
- [x] Static, consistent URLs (no query parameters for main content)

### Canonical URLs
Each page should specify its canonical URL to prevent duplicate content issues:
```html
<link rel="canonical" href="https://togtog.com/prep/google-software-engineer" />
```

**Implementation:** Already handled by Next.js `generateMetadata` function.

### Sitemap Strategy
Generate XML sitemap including all `/prep/[slug]` pages:
```
https://togtog.com/sitemap.xml
```

**Implementation:** Use `next-sitemap` package or custom generation.

---

## Future Considerations

### Custom Domain Options
If/when we want a more branded domain:
- `interviewprep.io`
- `prepfor.tech`
- `acethe.interview`

**Migration approach:**
1. Purchase new domain
2. Configure as primary in Vercel
3. Set up 301 redirects from old domain
4. Update all marketing materials
5. Keep old domain active for 6-12 months for redirect coverage

### Multi-Region Expansion
If expanding internationally:
- Use subdirectories: `togtog.com/uk/prep/...`, `togtog.com/de/prep/...`
- Avoid ccTLDs (`.co.uk`, `.de`) unless significant local presence
- Implement hreflang tags for language/region targeting

---

## Checklist

- [x] Evaluated separate domains option
- [x] Evaluated subdomains option
- [x] Evaluated path-based option
- [x] Selected path-based as recommendation
- [x] Documented URL patterns
- [x] Defined 5 test URLs
- [x] Specified SSL requirements
- [x] Defined redirect strategy
- [x] Documented SEO best practices

---

## Appendix: Domain Cost Analysis

### Separate Domains (100 positions)
| Item | Unit Cost | Quantity | Annual Cost |
|------|-----------|----------|-------------|
| Domain registration | $12/year | 100 | $1,200 |
| Premium domains (some) | $50/year | 20 | $1,000 |
| SSL certs (if not free) | $0-100/year | 100 | $0-10,000 |
| DNS management time | 2 hrs/month | 12 | 24 hrs |
| **Total** | | | **$2,200+ + 24 hrs** |

### Path-Based (Current)
| Item | Unit Cost | Quantity | Annual Cost |
|------|-----------|----------|-------------|
| Domain registration | $12/year | 1 | $12 |
| Vercel hosting (Pro) | $20/month | 12 | $240 |
| SSL | Included | 1 | $0 |
| DNS management time | 0.5 hrs/month | 12 | 6 hrs |
| **Total** | | | **$252 + 6 hrs** |

**Savings: ~$2,000/year + 18 hours of management time**
