# Issue 8: Merge redesign/mockup-i1 into main

## What
Once every issue in the mockup-i1 adoption initiative (#9 through the
Contact section and Misc polish issues that follow #13) has merged into
the `redesign/mockup-i1` integration branch, review the whole revamp
together and merge that branch into `main` in one final PR.

## Why
Per this project's standing convention for multi-issue initiatives with
a temporary integration branch: `main` stays untouched, and its Netlify
auto-deploy stays safe, until the entire revamp is reviewed as a whole
and merged in a single final PR, rather than each individual issue
touching `main` directly. See CLAUDE.md's "Current Priority" section for
the full rationale.

## Acceptance Criteria
- [ ] Every issue under the mockup-i1 adoption initiative is merged into
      `redesign/mockup-i1` (decor system, Nav + Hero, About consolidation,
      Projects section, Testimonials + Footer, Contact section polish,
      Misc polish)
- [ ] `redesign/mockup-i1` reviewed as a whole (a full pass through the
      live site, not just individual PR diffs) before opening the final
      PR into `main`
- [ ] Full pre-commit gate (`npm run precommit`: build + lint + test) is
      green on `redesign/mockup-i1` immediately before opening the PR
- [ ] Final PR opened from `redesign/mockup-i1` into `main`, reviewed and
      approved by the developer, then merged
- [ ] CLAUDE.md's "Current Priority" section updated to remove the
      mockup-i1-in-progress paragraph once this merges, per its own
      closing instruction ("Remove this paragraph once
      redesign/mockup-i1 merges to main")

## Layers Touched
None directly, this issue is process/integration only, not a code
change in itself.

## Edge Cases
- If `main` has received any hotfix commits directly during the mockup-i1
  initiative (the whole reason `main`'s deploy was kept live and
  untouched), confirm the merge doesn't silently drop or conflict with
  those before finalizing

## Blocked By
All other open issues under the mockup-i1 adoption initiative.

## Definition of Done
- [ ] `redesign/mockup-i1` merged into `main`
- [ ] Live site (Netlify auto-deploy from `main`) verified post-merge
- [ ] CLAUDE.md's Current Priority paragraph removed
