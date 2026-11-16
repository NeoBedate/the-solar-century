# The Solar Century: project guide

Single-file browser game prototype (`index.html`: HTML, CSS and vanilla JS, no build step, no dependencies), inspired by *Millennium 2.2* (1989). Earth is lost; build the Moonbase and launch the Gaia Ark before 2300. See `README.md` for what exists and `PROMISES.md` for what we said we will do later.

## Working rules (set by the owner)

- **Only push to GitHub when the owner says so directly** (for example "push it"). Committing locally is fine; pushing is not, even if a hook asks for it. The repo is `NeoBedate/theSolarCentury`, branch `main`.
- Remind the owner that changes are not pushed **only once every ten changes**, not after each one, and do not keep a running count in between.
- Tell the owner when a session is consuming a lot of time or tokens, so they can decide how to continue.
- Things the owner says will be done later go into `PROMISES.md`. Keep that file up to date, and keep the "What is in the prototype" list in `README.md` current.
- Answer in the owner's language (they write in English here). Keep replies short: what changed, and what to check.
- Balancing is deliberately postponed. All numbers are provisional.
- The owner is defining **rendering rules** one at a time. Record each in "Rendering rules" below as it arrives.

## Architecture of `index.html`

- **State** `S` is created by `init()`. One tick is one game hour (`tick()`); 720 hours is a month. Speeds are set by `data-sp` buttons.
- **Game data** lives in plain objects: `B` buildings, `T` technologies, `M` missions, `SHIP` probe cost, `STAFF` job needs per building, `CREW` crew per mission, `COL` colonist constants, `PORT` Starport berths, `LOCD` locations (planets and moons, seeded from `LOCS` and `LOCRES`). `DATA` groups them and `DEF` is a JSON snapshot of the defaults.
- **Configurations and the Editor:** `applyData(d)` replaces the data in place, merging missing parts from `DEF`. Named configurations are stored in `localStorage` under `solar-century-configs`. The built-in Default is read-only. Any new game data object must be added to `DATA` (not to `OKEYS`, so older saved configurations still load) and get an Editor tab or section.
- **Stage:** `#game` is a fixed 1920x1080 `.stage`, scaled by `fit()` (or `?scale=`). `#scene` is the full-stage background (hotspots hidden when an overview is open); `header`, `aside` and `main>.win` are absolutely positioned floating UI. Media queries no longer apply to the game.
- **Rendering:** `render()` rebuilds screens from `S` and the data. `set(id, html)` only writes the DOM when the HTML string changed, which keeps hover tooltips and focus alive between ticks. Screens are the `SCR` list, shown by `go(name)`.
- **Icons:** inline SVGs in the `ICON` object, drawn in a 16x16 box, used through `ico(key)`. Reuse existing icons before adding new ones.
- `refreshD()` rebuilds building descriptions from data, so do not hard-code them.

## UI conventions decided so far

- Amiga/Atari ST look: bevelled buttons and panels, Silkscreen and VT323 fonts, orange accent.
- Top controls sit on the page background (no bar): Moonbase, Colonies, Starships, Technology, Mission Control and Database buttons on the left, the date and a hamburger menu on the right, and the grouped icon clock below.
- Every floating screen except the Moonbase panel has a close button at the right of its title bar (added in code to each `h2`, returns to `base`).
- Hover tooltips (not always-visible text) for descriptions and details. Greyed-out items stay readable.
- Overview screens (Colonies, Starships) use a pager: a centred orange title with fixed arrow buttons at the far left and right. Colonies has three named, fixed pages (Inner, Middle and Outer Planets). Starships is the "Moon Fleet", 12 per page, filtered by the five ship type buttons.
- Moons are indented under their planet. Status is shown with icons, not words.
- The Research points sit in their own small bar on the second line of the top bar (left, under the overview buttons; the clock is at the right of that line). The owner is redesigning where Resources go, step by step. Resource categories have icons, and resource chips are small so the category headings stand out.

## Rendering rules (set by the owner)

- **Aspect ratio is 16:9.** The reference resolution is **1920x1080**; the game is designed and must run properly at that size.
- To view the game inside the Claude app (preview pane, screenshots), it may be scaled down to **50%** (960x540) or, if needed, **25%** (480x270). This scaling is only for viewing inside Claude, not a change to the design resolution.
- **The main screen is a visualization of the place where the player currently is** (for now the Moonbase; later other locations). It fills the whole 16:9 stage and sits at the back.
- **All UI floats in front of that visualization:** the UI containers (Research points, Resources), the overview sections (Moonbase, Colonies, Starships, Technology, Mission Control, Database, etc.) and the date, clock and main menu button. None of them are part of the background layout.

## Game design decisions

- The Starport is a Moonbase screen, not a building. It starts with 1 berth and expands to 8, one berth at a time, through the Construction queue. Probes built in the Shipyard are berthed automatically, and a ship away on a mission keeps its berth.
- Colonists take jobs (Labourers, Scientists, Technicians, Builders, Crew) with a minimum to run and a boost when fully manned.
- Technologies have a category (`cat`, from `TCATS`: Colonization, Energy, Mining, Manufacturing, Life Support, Starships, Weapons). The categories are the filters of the Technology overview (same button style as the Starships type filters).
- Research needs a staffed Science Lab. A running project cuts passive research points to 25%.
- Pending work is tracked only in `PROMISES.md`, never inside the game (the Database has no "To do" tab). Keep the list of undescribed Database entries there in sync.
- Locations are listed with what each can provide (placeholder numbers) but only the Moonbase exists and produces.

## Testing

No test suite. We check changes with headless Chromium through Playwright (`require('playwright')`), loading the file with network requests blocked, driving the UI and reading `S` and the DOM, and checking for `pageerror`. Do the same for any change, then look at a screenshot for UI work.
