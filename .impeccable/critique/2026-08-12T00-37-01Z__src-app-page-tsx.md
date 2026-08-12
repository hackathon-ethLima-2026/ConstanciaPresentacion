---
target: fondo del hero (src/app/page.tsx)
total_score: 5
max_score: 12
na_heuristics: 2,3,5,6,7,9,10
p0_count: 2
p1_count: 0
timestamp: 2026-08-12T00-37-01Z
slug: src-app-page-tsx
---
# Critique: src/app/page.tsx — hero background (video vs. static)

Method: dual-agent

## Design Health Score (scoped)
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Video reports playing but never loads on cold navigation |
| 4 | Consistency and Standards | 1 | Breaks the app's own "fixed reading, not decorative loop" canon |
| 8 | Aesthetic and Minimalist Design | 2 | Blurred to near-invisibility, cost without payoff |
Total: 5/12 (Poor, 42%)

## Design Specificity Verdict
Fails — generic AI space/nebula loop, contradicts the product's own calibration-instrument thesis. Detector: 0 rule findings, but browser evidence shows the video does not reliably load on a fresh visit (zero network request, readyState 0), plus an invalid `fetchpriority` React attribute.

## Priority Issues
- P0: Video doesn't reliably load on a fresh visit (confirmed via network/DOM inspection)
- P0: Wrong medium — ambient decorative video contradicts the product's "fixed reading" design language; recommend reverting to the static `.traza-calibracion` CSS trace
- P2: Invalid `fetchpriority` attribute (should be `fetchPriority` or removed)
- P3: `fetchpriority="high"` on a decorative asset competes with real above-the-fold priorities

## Persona Red Flags
Jordan (anxious first-timer): reads as untrustworthy AI decoration, or a broken empty box if load fails.
Casey (mobile, cheap phone): pays full video cost for a barely-visible effect.

## Questions
1. If frozen to a still frame, would anyone notice? If not, why a video?
2. If the footage needs blurring past recognition, what is it contributing?
3. Does "modern and eye-catching" need motion, or a precise static mark?
