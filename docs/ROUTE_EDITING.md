# Route Builder

The actual Any% guide awaits Robin's supplied sequence. **Load labeled example for editing** is a sample fixture, not an assertion about the current route.

Use Add step for each unique visit, including repeat visits to the same region. Fill title, action, rationale, region/subsection, warnings, entry/method IDs, media, declared conditions and resulting objective state. Reorder with up/down or drag; IDs, explanations and media remain attached to their visit. Duplicate gives the visit, alternatives and actions new IDs. Deletion requires confirmation; review references after deletion.

A blank Next means the next ordered stage. Set Next explicitly for branching paths or a later reconvergence. Add alternative creates a mutually exclusive option. Each alternative may contain multiple actions and its own conditions, declared results, basis/date, timing and reliability observations. Add action within alternative and reorder actions as necessary. Do not turn parallel choices into consecutive required steps.

The live chart computes graph columns and connectors from the effective next-stage connections. Same-depth visits stack; alternatives stay vertical inside a visit. The reading/checklist view follows chosen alternatives and pauses at an unchosen branch, so visits on other branches are not presented as required sequential steps. Every authored stage and option remains accessible in the chart and stage navigation. Rationale is available through focus/hover previews and the persistent details panel. Entry links include the exact method ID and retain guide context.

Validation checks shapes, IDs, entry/method/media references, missing destinations, unintended cycles, unreachable visits, declared conditions on every reachable graph path, and unequal incoming fact sets at any reconvergence. It treats conditions/results as **additive declared facts**. It does not model consuming items, arbitrary game mechanics or optimality. If paths reach different quest states, align them with appropriate objective actions or give them distinct downstream visits. Distinct states must not silently reconverge.

Schema-valid, dependency-reviewed and gameplay-tested are separate statuses. The latter two are author assertions based on review/testing; the editor does not infer them from videos. Leave unknown timing and reliability blank. Observations require a basis/date.

Undo/redo, save, import and export use the same studio workflow as catalog content. After a valid export, copy its route JSON to the exact `content/routes/` path and commit. Newly added guides are automatically loaded from those files; no UI code change is required.

An empty Next uses the next ordered visit (or the stage destination for an alternative). Choose **Guide ends here** to terminate a branch independently. This prevents unrelated terminal alternatives from being serialized together. Stage rationale is readable below each node and exposed to keyboard focus, with a persistent details panel.
