# Initial live catalog migration

Source: `MCD2 Glitch/Exploit/Tech Doc`, spreadsheet `1KJdOOCd2iLOpkINvLU0tgmXMtUNDr9g_4ZnTNzeGqaA`.

Read only on October 4, 2026. Imported `Entries!A1:H200` and `Videos!A1:E200`, the complete metadata-bounded grids. Hidden `Original (archive)` was excluded. No spreadsheet writes were performed.

| Check | Verified result |
|---|---|
| Entries | 35 source / 35 destination, IDs MCD2-001 through MCD2-035 |
| Media | 46 source / 46 destination, IDs VID-001 through VID-046 |
| Titles, categories, instructions, notes | Exact source-value parity |
| Discovery credits | Exact Unicode text preserved |
| Discovery dates | Original serial retained; calendar conversion checked |
| Media associations | Exact IDs, per-entry order and count |
| Source URLs | Exact string parity, including different guild/channel IDs |
| Duplicate archive import | None |

`content/source-snapshot.json` is the authorized recoverable value snapshot. The initial import revision derived from source values. The final editorial content revision hashes the complete normalized catalog, and every export or deliberate JSON change must refresh it. `npm run audit` performs exact comparison against that snapshot. This is a historical migration check, separate from the publishing validator: after approved corrections it may report expected editorial differences. The snapshot and this report remain evidence of the initial import.

Duck Jumps retains four proofs and John Sézchavèire's timing refinement. No unmatched attachment URL was restored. General Out of Bounds remains reference-only with zero dedicated media. Baron Slide has no invented demonstration. Hyper Baron links retain demonstration then input setup. Baron caveats, the Red Tower exception, door objective touch, Tuner distinctions, gold/blue-key dependency, Gardenia POV and different starting point, and the two distinct gold-key discoveries remain verbatim.

Only literal region references were assigned: Brave Haven (MCD2-009); Honeycomb Fields (MCD2-015); Howling Woods (MCD2-017); Illager Stronghold (MCD2-014 and MCD2-026). This does not imply these entries' other named places are resolved. Named legacy places are stored as subsection associations with region null and a visible confirmation queue. Rainy/Frozen zone names were not silently converted into the new region hierarchy. Cross-location tower entry remains a single stable record.

All regions are available even without confirmed discoveries. Region overview placeholders are labeled as overviews, not invented subsection names. No game screenshots were fabricated. The actual Any% route has zero authored stages and an explicit awaiting-input status. The viewer example is isolated and labeled.

Final content cutover still awaits Robin's review. The Sheet remains authoritative for initial comparison; no two-way sync is installed.
