# Voice Mock Interview Feasibility Report (F1)

> **Last Updated:** 2026-01-17
>
> Technical and commercial feasibility assessment for AI-powered voice mock interviews.

---

## Executive Summary

**Recommendation:** Proceed with MVP development using **ElevenLabs Conversational AI** as the primary platform, with OpenAI Realtime API as a backup option.

| Factor | Assessment |
|--------|------------|
| Technical Feasibility | ✅ High - Multiple mature platforms available |
| Cost per Session | ⚠️ Moderate - $0.50-2.00 per 15-min session |
| User Value | ✅ High - Significant differentiation from competitors |
| Development Effort | ⚠️ Moderate - 2-4 weeks for MVP |
| Risk Level | ⚠️ Medium - Cost management critical |

**Estimated MVP Cost:** $5,000-10,000 (development) + $500-1,000/month (operating)

---

## 1. Platform Evaluation

### 1.1 Comparison Matrix

| Platform | Per-Minute Cost | Latency | Voice Quality | LLM Included | Ease of Integration |
|----------|----------------|---------|---------------|--------------|---------------------|
| **ElevenLabs** | $0.08-0.10 | 200-400ms | Excellent | No (separate) | ⭐⭐⭐⭐⭐ |
| **OpenAI Realtime** | $0.30 | 300-500ms | Very Good | Yes (GPT-4o) | ⭐⭐⭐⭐ |
| **Sesame CSM-1B** | $0.03-0.07 | 200-400ms | Excellent | No (separate) | ⭐⭐⭐ |
| **PlayHT** | $0.05-0.10 | 300-600ms | Good | No (separate) | ⭐⭐⭐⭐ |
| **Retell AI** | $0.07 | 250-500ms | Good | Optional | ⭐⭐⭐⭐⭐ |

### 1.2 Detailed Platform Analysis

#### ElevenLabs Conversational AI
**Recommendation: PRIMARY CHOICE**

**Pros:**
- Industry-leading voice quality and naturalness
- Recently reduced pricing to $0.08-0.10/minute
- Native WebSocket API with JS, React, Python, iOS SDKs
- Supports Claude, GPT, and Gemini as backend LLM
- 15 free minutes for testing
- Low latency (200-400ms)

**Cons:**
- LLM costs not included (must add separately)
- Business plan required for best rates ($1,320/month)

**Pricing:**
| Plan | Monthly Cost | Minutes Included | Overage Rate |
|------|-------------|------------------|--------------|
| Free | $0 | 15 min | N/A |
| Creator | $22 | ~200 min | $0.11/min |
| Business | $1,320 | 13,750 min | $0.08/min |

#### OpenAI Realtime API
**Recommendation: BACKUP OPTION**

**Pros:**
- Integrated LLM (GPT-4o) - no separate AI costs
- Native voice understanding and generation
- Consistent quality from single provider
- Good documentation and support

**Cons:**
- Higher per-minute cost (~$0.30/min total)
- Audio output is expensive ($0.24/min)
- Silence counts as billable time
- Less natural voice than ElevenLabs

**Pricing:**
| Component | Cost |
|-----------|------|
| Audio Input | $0.06/min (~$100/1M tokens) |
| Audio Output | $0.24/min (~$200/1M tokens) |
| Text Tokens | Standard GPT-4o rates |
| **Total Estimated** | **~$0.30/min** |

#### Sesame CSM-1B
**Recommendation: FUTURE CONSIDERATION**

**Pros:**
- Exceptional voice naturalness (experts can't distinguish from human)
- Open source (Apache 2.0 license)
- Can self-host for cost control
- Ultra-low latency (200-400ms)
- Audio watermarking included

**Cons:**
- No official hosted API from Sesame
- Must use third-party hosts (Vogent, DeepInfra, fal.ai)
- Text-to-speech only - need separate STT and LLM
- No built-in conversational memory
- Requires more integration work

**Third-Party Hosting Options:**
| Provider | Estimated Cost | Notes |
|----------|---------------|-------|
| Vogent | ~$0.07/min | Best latency, voice cloning beta |
| DeepInfra | ~$0.05/min | Good for scale |
| fal.ai | ~$0.03-0.05/min | Budget option |

#### PlayHT
**Recommendation: BUDGET ALTERNATIVE**

**Pros:**
- Lower cost at scale
- Real-time streaming support
- Instant voice cloning
- Good commercial terms

**Cons:**
- Voice quality slightly below ElevenLabs
- Higher latency (300-600ms)
- No integrated LLM

**Pricing:**
| Plan | Monthly Cost | Words/Characters |
|------|-------------|------------------|
| Creator | $39 | 50,000 words |
| Pro | $99 | 200,000 words |
| Unlimited | Custom | 2.5M chars/month |

---

## 2. MVP Voice Experience Design

### 2.1 User Journey

```
1. User selects "Practice Interview" from dashboard
          ↓
2. User chooses interview type:
   - Behavioral (STAR questions)
   - Technical (coding discussion)
   - Case Study (consulting)
          ↓
3. User clicks "Start Voice Session"
          ↓
4. AI interviewer introduces itself
   "Hi, I'm your AI interviewer today. I'll be asking you
    behavioral questions about your experience. Ready to begin?"
          ↓
5. AI asks first question
   "Tell me about a time when you had to deal with a
    difficult team member. What was the situation?"
          ↓
6. User responds verbally (2-3 minutes)
          ↓
7. AI provides follow-up or moves to next question
          ↓
8. After 3-5 questions (~15 min), session ends
          ↓
9. User receives written feedback summary
   - Strengths identified
   - Areas for improvement
   - STAR structure analysis
```

### 2.2 MVP Feature Set

| Feature | MVP | Future |
|---------|-----|--------|
| Voice conversation | ✅ | ✅ |
| Question bank integration | ✅ | ✅ |
| Session recording | ✅ | ✅ |
| Real-time transcription | ✅ | ✅ |
| Post-session feedback | ✅ | ✅ |
| Follow-up questions | ✅ | ✅ |
| STAR structure detection | ❌ | ✅ |
| Difficulty adaptation | ❌ | ✅ |
| Company-specific personas | ❌ | ✅ |
| Video (face analysis) | ❌ | ✅ |
| Multi-language support | ❌ | ✅ |

### 2.3 Session Structure

**Standard Session: 15 minutes**
- Introduction: 1 minute
- Questions (3-4): 12 minutes
- Wrap-up: 2 minutes

**Question Flow:**
```
Question 1: Behavioral (warm-up)
    → 1-2 follow-ups based on response

Question 2: Situational
    → 1-2 follow-ups

Question 3: Technical or Case (depending on track)
    → 2-3 follow-ups

Question 4: Culture fit (if time permits)
```

### 2.4 AI Interviewer Persona

**Name:** Alex (gender-neutral)

**Personality Traits:**
- Professional but warm
- Encouraging without being patronizing
- Direct in follow-up questions
- Provides subtle coaching cues

**Voice Characteristics:**
- Clear, moderate pace
- American English accent (default)
- Slight warmth/friendliness
- Confident tone

**System Prompt (Excerpt):**
```
You are Alex, an experienced technical interviewer conducting a mock
interview. Your role is to:

1. Ask questions from the provided question bank
2. Listen carefully to responses
3. Ask relevant follow-up questions to probe deeper
4. Maintain a professional, encouraging tone
5. Keep track of time and move through questions appropriately

When the candidate finishes speaking, evaluate their response internally:
- Did they use the STAR format?
- Was the situation clearly described?
- Were actions specific and detailed?
- Were results quantified?

If the response was weak, ask a clarifying follow-up. If strong,
acknowledge briefly and move to the next question.

Do NOT provide feedback during the interview. Save all evaluation
for the post-session summary.
```

---

## 3. Technical Architecture

### 3.1 System Components

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER'S BROWSER                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │   Microphone    │  │    Speaker      │  │   UI/React     │  │
│  │   (WebRTC)      │  │    (Audio)      │  │   Components   │  │
│  └────────┬────────┘  └────────▲────────┘  └────────────────┘  │
│           │                    │                                │
│           ▼                    │                                │
│  ┌─────────────────────────────┴─────────────────────────────┐  │
│  │              WebSocket Connection                          │  │
│  └─────────────────────────────┬─────────────────────────────┘  │
└────────────────────────────────┼────────────────────────────────┘
                                 │
                                 ▼
┌────────────────────────────────────────────────────────────────┐
│                     BACKEND (Vercel/AWS)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Session    │  │   Question   │  │   Feedback           │  │
│  │   Manager    │  │   Selector   │  │   Generator          │  │
│  └──────┬───────┘  └──────────────┘  └──────────────────────┘  │
│         │                                                       │
│         ▼                                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Voice AI Integration Layer                   │  │
│  └──────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ELEVENLABS / OPENAI                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │    STT       │  │     LLM      │  │        TTS           │  │
│  │  (Speech to  │  │  (Claude/    │  │   (Text to           │  │
│  │   Text)      │  │   GPT)       │  │    Speech)           │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Data Flow

**Real-time Conversation:**
```
1. User speaks → Browser captures audio via WebRTC
2. Audio streamed to backend via WebSocket
3. Backend forwards to STT service
4. Transcribed text sent to LLM with context
5. LLM response sent to TTS service
6. Generated audio streamed back to browser
7. Browser plays audio response
```

**Latency Budget:**
| Component | Target | Max Acceptable |
|-----------|--------|----------------|
| Audio capture | 50ms | 100ms |
| Network (up) | 50ms | 150ms |
| STT processing | 200ms | 500ms |
| LLM processing | 300ms | 1000ms |
| TTS processing | 200ms | 500ms |
| Network (down) | 50ms | 150ms |
| **Total** | **850ms** | **2400ms** |

### 3.3 Technology Stack

| Component | Recommended | Alternative |
|-----------|-------------|-------------|
| Frontend | React + WebRTC | Next.js + WebSocket |
| Backend | Vercel Functions | AWS Lambda |
| Voice API | ElevenLabs SDK | OpenAI Realtime |
| LLM | Claude 3.5 Sonnet | GPT-4o |
| Database | Supabase | PostgreSQL |
| Storage | Supabase Storage | S3 |
| Auth | Supabase Auth | Auth0 |

### 3.4 ElevenLabs Integration Code (Example)

```typescript
// Basic ElevenLabs Conversational AI setup
import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

// Create conversation session
const conversation = await client.conversationalAI.createSession({
  agentId: "mock-interviewer-agent",
  config: {
    llm: {
      provider: "anthropic",
      model: "claude-3-5-sonnet",
      systemPrompt: INTERVIEWER_SYSTEM_PROMPT,
    },
    voice: {
      voiceId: "professional-male-01",
      stability: 0.5,
      similarityBoost: 0.75,
    },
    conversation: {
      maxDurationSeconds: 900, // 15 minutes
      silenceTimeoutSeconds: 10,
    },
  },
});

// Handle audio streaming
conversation.on("audio", (audioChunk) => {
  // Stream to user's browser
  websocket.send(audioChunk);
});

conversation.on("transcript", (text, isFinal) => {
  // Store transcription
  if (isFinal) {
    saveTranscript(sessionId, text);
  }
});

conversation.on("end", async () => {
  // Generate feedback
  const feedback = await generateFeedback(sessionId);
  await saveSessionResults(sessionId, feedback);
});
```

---

## 4. Cost Model

### 4.1 Per-Session Cost Breakdown

**Scenario: 15-minute mock interview session**

#### Option A: ElevenLabs + Claude

| Component | Calculation | Cost |
|-----------|-------------|------|
| ElevenLabs Voice (15 min) | 15 × $0.08 | $1.20 |
| Claude 3.5 Sonnet | ~5K tokens | $0.02 |
| Infrastructure (Vercel) | Minimal | $0.01 |
| **Total per session** | | **$1.23** |

#### Option B: OpenAI Realtime API

| Component | Calculation | Cost |
|-----------|-------------|------|
| Audio Input (user speaking ~8 min) | 8 × $0.06 | $0.48 |
| Audio Output (AI speaking ~7 min) | 7 × $0.24 | $1.68 |
| Text tokens | ~3K tokens | $0.02 |
| Infrastructure | Minimal | $0.01 |
| **Total per session** | | **$2.19** |

#### Option C: Sesame + Deepgram + Claude

| Component | Calculation | Cost |
|-----------|-------------|------|
| Sesame TTS (7 min AI) | 7 × $0.05 | $0.35 |
| Deepgram STT (8 min user) | 8 × $0.0047 | $0.04 |
| Claude 3.5 Sonnet | ~5K tokens | $0.02 |
| Infrastructure | Minimal | $0.02 |
| **Total per session** | | **$0.43** |

### 4.2 Monthly Cost Projections

| Users | Sessions/Month | Option A | Option B | Option C |
|-------|----------------|----------|----------|----------|
| 100 | 300 | $369 | $657 | $129 |
| 500 | 1,500 | $1,845 | $3,285 | $645 |
| 1,000 | 3,000 | $3,690 | $6,570 | $1,290 |
| 5,000 | 15,000 | $18,450 | $32,850 | $6,450 |

*Assumes 3 sessions per user per month*

### 4.3 Pricing Strategy

**Recommended User Pricing:**

| Option | Price | Your Cost | Margin |
|--------|-------|-----------|--------|
| Per session | $5 | $1.23 | 75% |
| 5-pack | $20 ($4 each) | $6.15 | 69% |
| 10-pack | $35 ($3.50 each) | $12.30 | 65% |
| Unlimited (monthly) | $49 | ~$12 (avg 10 sessions) | 76% |

**Break-even Analysis:**
- At $5/session with $1.23 cost: Need 265 sessions/month to cover $1,000 fixed costs
- At $49/month unlimited: Need ~27 subscribers to cover $1,000 fixed costs

### 4.4 Cost Control Measures

1. **Session time limits:** Cap at 15 minutes, warn at 12 minutes
2. **Daily limits:** Max 3 sessions per user per day
3. **Silence detection:** Stop billing during extended silence
4. **Caching:** Cache common interviewer responses
5. **Tiered quality:** Offer "standard" and "premium" voice quality

---

## 5. Technical Feasibility Assessment

### 5.1 Feasibility Scores

| Aspect | Score | Notes |
|--------|-------|-------|
| Core voice technology | 9/10 | Mature platforms available |
| Integration complexity | 7/10 | SDKs available, some custom work needed |
| Latency requirements | 8/10 | Achievable with proper architecture |
| Scalability | 8/10 | Cloud-native, scales well |
| Cost predictability | 6/10 | Variable costs require monitoring |
| Voice quality | 9/10 | ElevenLabs/Sesame near-human quality |
| Reliability | 7/10 | Depends on third-party uptime |

**Overall Feasibility: 7.7/10 - PROCEED WITH CAUTION**

### 5.2 Key Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| High latency | Medium | High | Use edge servers, optimize pipeline |
| Cost overruns | High | Medium | Implement hard limits, monitoring |
| API downtime | Low | High | Implement fallback to OpenAI |
| Poor voice quality | Low | Medium | Test extensively before launch |
| Browser compatibility | Medium | Medium | Test across browsers, provide fallback |

### 5.3 Development Effort Estimate

| Phase | Tasks | Effort |
|-------|-------|--------|
| **Phase 1: Prototype** | Basic voice loop, single question | 3-5 days |
| **Phase 2: MVP** | Full session flow, question bank, feedback | 2-3 weeks |
| **Phase 3: Polish** | UI/UX, error handling, monitoring | 1-2 weeks |
| **Phase 4: Scale** | Performance optimization, cost controls | 1 week |

**Total MVP Development: 4-7 weeks**

---

## 6. Competitive Landscape

### 6.1 Existing Voice Interview Solutions

| Competitor | Offering | Price | Weakness |
|------------|----------|-------|----------|
| Pramp | Peer mock interviews | Free | Not AI, scheduling hassle |
| Interviewing.io | Human interviewers | $100+/session | Expensive |
| Final Round AI | AI interview prep | $96-149/month | Generic, not conversational |
| Yoodli | Speech coaching | $12-20/month | Not interview-specific |

### 6.2 Differentiation Opportunity

Our voice mock interview would be unique because:

1. **Company-specific:** Questions tailored to Google, Amazon, McKinsey, etc.
2. **Role-specific:** Different tracks for SWE, PM, Consulting
3. **Framework-aware:** Evaluates STAR structure, case frameworks
4. **Integrated:** Part of comprehensive prep bundle, not standalone
5. **Affordable:** $5/session vs $100+ for human practice

---

## 7. Recommendations

### 7.1 Go/No-Go Decision

**Recommendation: GO** (with phased approach)

**Rationale:**
- Technical feasibility is high
- Unit economics work at $5/session
- Strong differentiation from competitors
- Aligns with premium product positioning

**Conditions:**
- Start with ElevenLabs (easier integration)
- Implement strict cost controls from day 1
- Launch as beta with limited users
- Monitor costs closely before scaling

### 7.2 Phased Rollout Plan

**Phase 1: Internal Alpha (Week 1-2)**
- Build basic prototype
- Test with team members
- Validate voice quality and latency

**Phase 2: Closed Beta (Week 3-4)**
- Invite 20-50 paying customers
- Gather feedback
- Monitor costs per session

**Phase 3: Limited Release (Week 5-6)**
- Open to all premium users
- Implement usage limits
- A/B test pricing

**Phase 4: Full Release (Week 7+)**
- Remove beta label
- Scale based on demand
- Consider Sesame migration for cost savings

### 7.3 Success Metrics

| Metric | Target (Beta) | Target (Launch) |
|--------|---------------|-----------------|
| Session completion rate | >80% | >90% |
| User satisfaction (NPS) | >30 | >50 |
| Cost per session | <$1.50 | <$1.00 |
| Sessions per user/month | >2 | >4 |
| Conversion rate (free→paid) | >10% | >15% |

### 7.4 Next Steps

1. **Create ElevenLabs account** and test conversational AI
2. **Build prototype** with single question flow
3. **Test latency** across different network conditions
4. **Design feedback generation** prompt
5. **Plan beta user recruitment**

---

## Appendix: Resources

### API Documentation
- [ElevenLabs Conversational AI](https://elevenlabs.io/conversational-ai)
- [OpenAI Realtime API](https://platform.openai.com/docs/guides/realtime)
- [Sesame CSM on Hugging Face](https://huggingface.co/sesame/csm-1b)

### Code Examples
- [ElevenLabs JS SDK](https://elevenlabs.io/developers)
- [Sesame OpenAI-compatible wrapper](https://github.com/phildougherty/sesame_csm_openai)
- [Vogent Sesame integration](https://blog.vogent.ai/posts/build-ultrarealistic-voice-agents-with-sesame)

### Pricing Calculators
- [AI Voice Agent Calculator](https://softcery.com/ai-voice-agents-calculator)
- [Voice AI Pricing Comparison](https://comparevoiceai.com/)
