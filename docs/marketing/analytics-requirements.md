# Analytics Requirements (M3)

> **Last Updated:** 2026-01-17
>
> Analytics framework for tracking marketing performance and user behavior.

---

## 1. Analytics Platform Recommendation

### 1.1 Primary Stack

| Tool | Purpose | Cost |
|------|---------|------|
| **Google Analytics 4** | Web analytics, user behavior | Free |
| **Google Ads** | Campaign performance | (Ad spend) |
| **Google Tag Manager** | Tag management | Free |
| **Google Looker Studio** | Dashboards & reporting | Free |

### 1.2 Rationale

- **Integrated ecosystem:** Seamless data flow between GA4, Ads, and Looker
- **Cost-effective:** Core tools are free
- **Industry standard:** Easy to find documentation and support
- **Attribution:** Cross-channel attribution with GA4 + Ads linking

### 1.3 Optional Enhancements

| Tool | Purpose | When to Add |
|------|---------|-------------|
| Mixpanel | Product analytics | When optimizing dashboard UX |
| Hotjar | Session recordings, heatmaps | When conversion rate <2% |
| Amplitude | Advanced cohort analysis | When >1,000 users/month |

---

## 2. Metrics by Position

### 2.1 Core Marketing Metrics

Track these metrics for each landing page position:

| Metric | Definition | Target |
|--------|------------|--------|
| **Impressions** | Times ad was shown | - |
| **Clicks** | Ad clicks to landing page | - |
| **CTR** | Clicks / Impressions | >3% |
| **CPC** | Cost / Clicks | <$5 |
| **Sessions** | Landing page visits | - |
| **Bounce Rate** | Single-page sessions | <50% |
| **Avg. Session Duration** | Time on site | >2 min |
| **Conversions** | Purchases | - |
| **Conversion Rate** | Conversions / Sessions | >2% |
| **CPA** | Cost / Conversions | <$50 |
| **Revenue** | Total sales | - |
| **ROAS** | Revenue / Cost | >3x |

### 2.2 Position-Level Dashboard

| Position | Daily Budget | Target CPA | Target ROAS |
|----------|-------------|------------|-------------|
| Google SWE | $15 | $40 | 4x |
| Amazon SWE | $15 | $40 | 4x |
| McKinsey Consultant | $15 | $50 | 3.5x |
| Goldman Sachs IB | $10 | $55 | 3x |
| Meta PM | $10 | $45 | 3.5x |

### 2.3 Micro-Conversion Metrics

| Event | Definition | Target Rate |
|-------|------------|-------------|
| Scroll Depth 50% | Scrolled halfway | >60% |
| Scroll Depth 90% | Scrolled to pricing | >40% |
| Pricing View | Clicked pricing section | >30% |
| FAQ Expand | Opened FAQ accordion | >15% |
| Module Hover | Hovered on module card | >20% |
| CTA Click | Clicked purchase button | >5% |
| Dashboard Visit | Visited /dashboard | >3% |

---

## 3. Funnel Visualization

### 3.1 Primary Conversion Funnel

```
┌─────────────────────────────────────────────────────────────┐
│  STAGE 1: AWARENESS                                         │
│  ─────────────────                                          │
│  Impressions: 10,000                          (100%)        │
│  CTR Target: 3%                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 2: VISIT                                             │
│  ─────────────                                              │
│  Sessions: 300                                (3%)          │
│  Bounce Rate Target: <50%                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 3: ENGAGEMENT                                        │
│  ──────────────────                                         │
│  Scroll to Pricing: 120                       (40%)         │
│  Time on Page Target: >2 min                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 4: INTENT                                            │
│  ─────────────                                              │
│  CTA Clicks: 24                               (20%)         │
│  Add to Cart Rate Target: >5%                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STAGE 5: CONVERSION                                        │
│  ──────────────────                                         │
│  Purchases: 6                                 (25%)         │
│  Overall Conv Rate: 2%                                      │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Funnel Drop-off Analysis

| Stage Transition | Target Rate | Alert If Below |
|------------------|-------------|----------------|
| Impression → Click | 3% | 2% |
| Click → Engaged Session | 50% | 40% |
| Engaged → Pricing View | 40% | 30% |
| Pricing View → CTA Click | 20% | 15% |
| CTA Click → Purchase | 25% | 15% |

### 3.3 Funnel by Campaign

Create separate funnel views for:
- Campaign (Tech-SWE, Consulting, etc.)
- Device (Desktop vs Mobile)
- Geography (US vs UK vs CA)
- Time (Weekday vs Weekend)

---

## 4. Alert Thresholds

### 4.1 Critical Alerts (Immediate Action)

| Metric | Threshold | Action |
|--------|-----------|--------|
| Daily spend | >150% of budget | Pause campaigns, investigate |
| CPA | >2x target for 3 days | Review keywords, pause poor performers |
| Conversion rate | <1% for 7 days | Audit landing page, check tracking |
| Bounce rate | >70% for 3 days | Review ad-landing page match |
| Zero conversions | 48 hours | Check tracking, review ads |

### 4.2 Warning Alerts (Monitor Closely)

| Metric | Threshold | Action |
|--------|-----------|--------|
| CTR | <2% for 7 days | Refresh ad copy |
| CPC | >$6 for 7 days | Review bid strategy |
| ROAS | <2x for 14 days | Evaluate position profitability |
| Impression share | <50% | Consider budget increase |
| Quality Score | <6 | Improve landing page relevance |

### 4.3 Opportunity Alerts (Positive Signals)

| Metric | Threshold | Action |
|--------|-----------|--------|
| ROAS | >5x for 7 days | Scale budget 20% |
| Conv rate | >4% for 7 days | Consider expanding keywords |
| CTR | >5% for 7 days | Test similar ad copy on other positions |
| CPA | <50% target for 14 days | Scale aggressively |

### 4.4 Alert Configuration

**Email Alerts:**
- Critical: Immediate
- Warning: Daily digest at 9am
- Opportunity: Weekly digest on Monday

**Slack Integration (Optional):**
```
#marketing-alerts channel
- Critical: @channel mention
- Warning: No mention
- Opportunity: No mention
```

---

## 5. Export Requirements

### 5.1 Automated Reports

| Report | Frequency | Format | Recipients |
|--------|-----------|--------|------------|
| Daily Performance | Daily 8am | Email | Founder |
| Weekly Summary | Monday 9am | PDF | Founder |
| Monthly Deep Dive | 1st of month | Google Sheets | Founder |
| Position P&L | Monthly | CSV | Founder |

### 5.2 Daily Performance Report

```
─────────────────────────────────────────
DAILY PERFORMANCE REPORT - [DATE]
─────────────────────────────────────────

OVERVIEW
  Spend:        $XXX (Budget: $170)
  Conversions:  X
  Revenue:      $XXX
  ROAS:         X.Xx

TOP PERFORMERS
  1. [Position] - X conv, $XXX CPA
  2. [Position] - X conv, $XXX CPA
  3. [Position] - X conv, $XXX CPA

NEEDS ATTENTION
  - [Position] - High CPA ($XX vs $XX target)
  - [Position] - Low CTR (X.X% vs 3% target)

7-DAY TREND
  [Sparkline visualization]

─────────────────────────────────────────
```

### 5.3 Monthly Deep Dive Contents

1. **Executive Summary**
   - Total spend, revenue, ROAS
   - Month-over-month comparison

2. **Campaign Performance**
   - Performance by campaign
   - Best/worst ad groups
   - Keyword analysis

3. **Funnel Analysis**
   - Conversion funnel by stage
   - Drop-off analysis
   - Device/geo breakdown

4. **Position P&L**
   - Revenue and cost per position
   - Profitability ranking
   - Recommendations for scaling/cutting

5. **Competitive Insights**
   - Auction insights
   - Impression share trends
   - New competitor activity

6. **Next Month Plan**
   - Budget adjustments
   - New positions to test
   - Ad copy tests planned

### 5.4 Data Retention

| Data Type | Retention Period |
|-----------|------------------|
| Raw event data | 14 months (GA4 default) |
| Aggregated reports | Indefinite |
| User-level data | 26 months |
| Conversion data | Indefinite |

---

## 6. Implementation Checklist

### 6.1 GA4 Setup

- [ ] Create GA4 property
- [ ] Configure data stream for togtog.com
- [ ] Enable enhanced measurement
- [ ] Set up custom events (pricing_view, cta_click, etc.)
- [ ] Configure conversions
- [ ] Link to Google Ads
- [ ] Set up audiences for remarketing

### 6.2 Google Tag Manager

- [ ] Create GTM container
- [ ] Install GTM snippet
- [ ] Create GA4 configuration tag
- [ ] Create event tags for micro-conversions
- [ ] Create conversion tags for Google Ads
- [ ] Set up triggers (scroll depth, clicks, etc.)
- [ ] Test in preview mode
- [ ] Publish container

### 6.3 Google Ads Linking

- [ ] Link GA4 to Google Ads
- [ ] Import conversions to Google Ads
- [ ] Enable auto-tagging
- [ ] Set up remarketing audiences
- [ ] Verify conversion tracking

### 6.4 Looker Studio Dashboard

- [ ] Connect GA4 data source
- [ ] Connect Google Ads data source
- [ ] Build funnel visualization
- [ ] Create position-level scorecards
- [ ] Set up date range controls
- [ ] Add campaign comparison charts
- [ ] Configure scheduled email delivery

---

## 7. KPI Summary Dashboard

### 7.1 Dashboard Layout

```
┌────────────────────────────────────────────────────────────────┐
│  INTERVIEW PREP MARKETING DASHBOARD           [Date Range ▼]   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  SPEND   │  │  REVENUE │  │   ROAS   │  │   CPA    │       │
│  │  $4,532  │  │  $18,450 │  │   4.1x   │  │   $42    │       │
│  │  ▲ 12%   │  │  ▲ 18%   │  │  ▲ 0.3x  │  │  ▼ $5    │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  CONVERSION FUNNEL                                       │  │
│  │  [Visual funnel chart]                                   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌──────────────────────────┐  ┌──────────────────────────┐  │
│  │  PERFORMANCE BY POSITION │  │  DAILY TREND             │  │
│  │  [Bar chart]             │  │  [Line chart]            │  │
│  └──────────────────────────┘  └──────────────────────────┘  │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  POSITION DETAIL TABLE                                   │  │
│  │  Position | Spend | Conv | CPA | ROAS | Status          │  │
│  │  ─────────────────────────────────────────────────────   │  │
│  │  Google SWE | $450 | 12 | $38 | 4.3x | ● Scaling       │  │
│  │  Amazon SWE | $420 | 10 | $42 | 3.9x | ● On Track      │  │
│  │  McKinsey   | $380 | 7  | $54 | 3.2x | ○ Monitor       │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 7.2 Status Indicators

| Status | Criteria | Color |
|--------|----------|-------|
| Scaling | ROAS >4x, CPA <80% target | Green |
| On Track | ROAS 3-4x, CPA within target | Blue |
| Monitor | ROAS 2-3x or CPA 100-120% target | Yellow |
| Action Needed | ROAS <2x or CPA >120% target | Red |

---

## 8. Privacy & Compliance

### 8.1 Cookie Consent

- Implement cookie consent banner
- Only fire analytics tags after consent
- Provide opt-out mechanism

### 8.2 Data Collection

- No PII in custom dimensions
- Hash user IDs if used
- Comply with GDPR/CCPA

### 8.3 GA4 Privacy Settings

- Enable IP anonymization
- Set appropriate data retention (14 months)
- Configure user data deletion requests
