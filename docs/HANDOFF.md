# MCD2 website handoff

Scope: only A-Birdi/mcd2speedrunning. Google Sheet unchanged. No other repository, site, account domain, DNS setting or cross-project browser storage was modified.

## Checkpoints

Initial source baseline documentation: 1442e406f0a7ede607766b93aa68c0af8d2905db.
Robin's README update: b84c8f181b036fbf3aa03b95d313e88917b55a59, preserved as an ancestor and retained in README.
Verified shell/migration checkpoint: 5906cd0f7698c997076ac2b29442b45c5ae33600.
Acceptance-hardening product checkpoint: f5e12ef098c5b65ad31b5b872440afe2196cc283. Remote readback matches all 74 tracked paths byte-for-byte and mode-for-mode. The final status update to this handoff is documentation-only; use git rev-parse HEAD for its containing commit.

## Implemented

- Exact Tech → ten regions → Speedrun Guides navigation; hash links under /mcd2speedrunning/; global search, all entries and location review queue.
- Complete 35-entry / 46-reference migration, exact instructions/notes, Unicode credits, dates and ordered canonical URLs. Related foundational-tech links and reverse references are separate from mandatory requirements.
- Navy field guide shell, persistent selected navigation, landscape placeholders, confirmed region/subsection browsing, long-form entry/method pages, caveats and separate evidence/credit fields.
- Click-to-load YouTube player, source fallback and tutorial preference; canonical Discord HTTPS references.
- Form studio for discoveries, credits, entry/method prerequisites, media ordering/tutorial promotion, subsection labels/regions/order and uploaded screenshot metadata/bytes.
- Browser draft save/restore, portable backup, changed-file ZIP export, revision conflict checks, undo/redo, validation and preview that preserves studio state. Incomplete safe drafts restore for further editing; unsafe/malformed drafts are rejected. Unsupported content-file removals require branch reconciliation rather than silently surviving export.
- Semantic Route Builder: ordered visits, alternatives with multiple actions, references/conditions/results/rationale/warnings, branch reconvergence, drag/up-down reorder, duplicate, confirmed deletion and live preview.
- Chart positions and SVG connections computed from authored graph edges; branch-specific reading/checklist path; stage navigation and persistent details; exact-method entry links preserve guide context.
- Validation of every graph path, incompatible joins, cycles, unreachable stages and missing references. Declared facts are additive; no gameplay-optimality claim.

## Latest verification

21 Node regression tests passed, no failures/skips.
Static React rendering smoke passed for Tech, all entries, Honeycomb Fields, an entry, branching example and three studio tabs. This is component rendering, **not browser or visual QA**.
TypeScript, runtime/build content validation and Vite production build passed.
Initial migration audit passed: 35/35 entries and 46/46 exact source records and ordered associations.
GitHub Actions independently passed the push validation workflow for product f5e12ef: run 37235915901, https://github.com/A-Birdi/mcd2speedrunning/actions/runs/37235915901 . The deployment job was skipped; this successful validation run is not a publication.

## Deployment state

Pages is enabled. Its original branch-source run 37238104196 published raw source HTML and the public URL rendered blank. This is being replaced by the compiled dist artifact.

Browser acceptance checkpoint 572b8fc6b259689e98ca45556a340759336d9bbb passed GitHub Actions run 37241624350 (https://github.com/A-Birdi/mcd2speedrunning/actions/runs/37241624350): all 12 browser tests passed across Chromium, Firefox and touch/reduced-motion. Desktop and 320/390px shell, entry, branching chart and studio screenshots were downloaded and visually inspected. The independent form exercise corrected a description, added a discovery/tutorial/screenshot, reordered alternatives, exported exact paths/bytes and restored the ZIP. Stale imports and newer-upstream export attempts were blocked without replacing the draft. These fixtures stayed local to the test browsers and were never added to catalog content.

The publishing checkpoint enables validated automatic main deployment; PRs only validate. A public URL must still be inspected after its deployment before claiming publication. The GitHub plugin is authenticated as A-Birdi, but exposes no Pages settings action. The separate browser sign-in was not completed. The repository publishing source should be switched from its existing branch setting to GitHub Actions to remove the competing raw-source workflow and ensure failed validations retain the previous built site. No account-level domain/DNS settings are involved.

Fresh live Sheet reads exactly matched the saved Entries/Videos source snapshot. Sheet remains unchanged. Local content tests, static render smoke, content/type/build checks and the exact 35/46 migration audit passed.

## Content gaps

- Actual Any% sequence, visit rationale, normal/exploit branches and objective checkpoints await Robin's approved input. The real guide has zero stages and a labeled draft status; the example is isolated and explicitly marked.
- Final subsection list and region assignments, especially Sift/Deep Dark and generic doors, need confirmation.
- All real screenshot assets are pending. No imitation game screenshots were generated.
- Future tutorials, source credits and actual retest/usefulness observations remain author-supplied.
- Final content cutover awaits Robin's review; original Sheet remains initial comparison authority.

## Next concrete task

Verify the automatic compiled-dist deployment at https://a-birdi.github.io/mcd2speedrunning/ including entry/region/guide refresh. Finish the repository-only Pages source setting as GitHub Actions. Keep the actual Any% route and missing geographic/image inputs explicitly pending.
