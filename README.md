# MCD2 Speedrunning Field Guide

Speedrun site

## Development

Node 24.19.0, exact dependencies and lockfile. Run `npm ci`, then `npm run dev`. Run `npm run check` before a checkpoint (18 regression tests, static rendering smoke, content/schema checks, TypeScript and production build). Browser/visual QA remains a separate publication gate. The build uses `/mcd2speedrunning/` and hash routing for GitHub Pages.

## Content

35 entries and 46 references imported from the live `Entries` and `Videos` tabs on October 4, 2026. Instructions, notes, IDs, Unicode credits, dates and ordered URLs are preserved. `npm run audit` checks exact source parity. Unknown locations and screenshots remain explicitly labeled. Actual Any% route steps await approved input.

Studio edits are local drafts. Only an authorized GitHub commit can change public content. See `docs/CONTENT_EDITING.md` and `docs/ROUTE_EDITING.md` for the export workflow.

Deployment is not implied by a committed workflow. See `docs/HANDOFF.md` for verified status.

## Current delivery status

The site shell, complete migration, studio and branching route guide are implemented. Publication is pending browser QA and Pages configuration. No public site URL has been verified. Pushes run automated checks; publishing requires a manual workflow dispatch after that gate.
