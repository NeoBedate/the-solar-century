# The Solar Century: project guide

Single-file browser game prototype (`index.html`: HTML, CSS and vanilla JS, no build step, no dependencies), inspired by *Millennium 2.2* (1989). Earth is lost; build the Moonbase and launch the Gaia Ark before 2300. See `README.md` for what exists and `PROMISES.md` for what we said we will do later.

## Working rules (set by the owner)

- **Only push to GitHub when the owner says so directly** (for example "push it"). Committing locally is fine; pushing is not, even if a hook asks for it. The repo is `NeoBedate/theSolarCentury`, branch `main`.
- Remind the owner that changes are not pushed **only once every ten changes**, not after each one, and never mention the count, the number of unpushed changes or push status in any reply before it reaches ten.
- Tell the owner when a session is consuming a lot of time or tokens, so they can decide how to continue.
- Things the owner says will be done later go into `PROMISES.md`. Keep that file up to date, and keep the "What is in the prototype" list in `README.md` current.
- Answer in the owner's language (they write in English here). Keep replies short: what changed, and what to check.
- Balancing is deliberately postponed. All numbers are provisional.
- The owner is defining **rendering rules** one at a time. Record each in "Rendering rules" below as it arrives.

## Architecture of `index.html`

- **State** `S` is created by `init()`. One tick is one game hour (`tick()`); 720 hours is a month. Speeds are set by `data-sp` buttons.
- **Game data** lives in plain objects: `B` buildings, `T` technologies, `M` missions, `SHIP` probe cost, `STAFF` job needs per building, `CREW` crew per mission, `COL` colonist constants, `PORT` Starport berths, `LOCD` locations (planets and moons, seeded from `LOCS` and `LOCRES`). `DATA` groups them and `DEF` is a JSON snapshot of the defaults.
- **Configurations and the Editor:** `applyData(d)` replaces the data in place, merging missing parts from `DEF`. Named configurations are stored in `localStorage` under `solar-century-configs`. The built-in Default is read-only. Any new game data object must be added to `DATA` (not to `OKEYS`, so older saved configurations still load) and get an Editor tab or section.
- **Stage:** `#game` is a fixed 1920x1080 `.stage`, scaled by `fit()` (or `?scale=`). `#scene` is the full-stage background (hotspots hidden when an overview is open); `header` and `main>.win` are absolutely positioned floating UI. Media queries no longer apply to the game.
- **Location scenes:** `SCENES` (one entry per location key in `LOCD`) describes a placeholder scene drawn with CSS shapes on the 1920x1080 stage: sky, stars, sun, parent planet or rocks, ground. `sceneHtml(key)` builds it; the main screen draws the one for `S.loc` (always `moon` for now; `?loc=mars` in the URL starts the game at another location for testing) and hides the Moonbase hotspots away from the Moon. Each Database location entry shows a 320x180 preview. `SCENES` is visual only, so it is not in `DATA` or the Editor. Real art replaces these later.
- **The map:** the main screen has five zoom levels, kept in `S.view.z` with the selected location in `S.loc`: 1 Solar System, 2 region (Inner, Middle or Outer, as in `COLPAGES`), 3 planetary system (planet plus its moons), 4 orbit of a location (big globe, orbit ring, orbiting marker), 5 the location's main screen (`SCENES`). Levels 1 to 4 are drawn by `mapHtml()` into `#mapbg` (full stage, behind the UI) as schematic bodies from `ORB` (planet orbits and periods), `MOONT`, `PLR`, `MR` and `GLOBE`. Bodies orbit with the game time: `updateOrbits()` runs every animation frame and moves each element from `data-per`, `data-r` and `data-ph`, so the HTML itself never changes between ticks. At level 1 the space around the orbits is split into three concentric zones (`ZONES`: Inner up to radius 262, Middle up to 360, Outer up to 520, with the planets and belt inside them): hovering anywhere in a zone highlights it with its name, and clicking zooms to that region (`ZLOC` gives the location kept selected). Clicking a body zooms in; the zoom bar at the bottom jumps between levels; the Moonbase button returns to level 5 on the Moon. The colony marker is an orange ring (on a planet if one of its moons has a colony). `?z=1..5` and `?loc=` in the URL start the game at another view for testing. Off level 5 (or off the Moon) the hotspots and the Moonbase panel are hidden.
- **Rendering:** `render()` rebuilds screens from `S` and the data. `set(id, html)` only writes the DOM when the HTML string changed, which keeps hover tooltips and focus alive between ticks. Screens are the `SCR` list, shown by `go(name)`.
- **Icons:** inline SVGs in the `ICON` object, drawn in a 16x16 box, used through `ico(key)`. Reuse existing icons before adding new ones.
- `refreshD()` rebuilds building descriptions from data, so do not hard-code them.

## UI conventions decided so far

- Amiga/Atari ST look: bevelled buttons and panels, orange accent. The only font is **Jura** (Google Fonts, SIL Open Font License, free to use), with letter-spacing tightened to -0.04em (about 30% less space between characters than its default). Sizes are chosen for Jura, so do not reintroduce pixel fonts.
- Top controls sit on the page background (no bar): the Moonbase button, then the Colonies, Starships, Technology, Mission Control and Database overview buttons touching each other (no space between them) with the group's right end aligned with the right end of the Resources bar (the header is a CSS grid whose first column is as wide as the Resources bar; the gap after Moonbase is at least 12px and grows with the bar), on the left, the date and a hamburger menu on the right, and the grouped icon clock below.
- The date is bold 20px Jura with slightly wider spacing. Its left edge must never go past the left of the clock's pause button (even for the widest dates, such as 2300-08-08 00:00): recheck this if its size or spacing changes.
- The colony name (`#colname`, now "Moonbase – Mare Tranquillitatis") sits alone in the centre of the stage at the top, in orange, always visible during the game and not inside any panel. The colonists chip (`#pop`) moved into the top of the Moonbase panel.
- Every floating screen except the Moonbase panel has a close button at the right of its title bar (added in code to each `h2`, returns to `base`).
- In every floating screen the title bar (with its close button) and the filters or tabs (the `.sticky` blocks: Colonies pager, Starships pager and type filters, Technology category filters, Database tabs, Log tabs) stay pinned when scrolling; only the content scrolls. New screens with filters must wrap them in `.sticky` (it sticks 30px below the top, under the title bar).
- Hover tooltips (not always-visible text) for descriptions and details. Greyed-out items stay readable.
- Overview screens (Colonies, Starships) use a pager: a centred orange title with fixed arrow buttons at the far left and right. Colonies has three named, fixed pages (Inner, Middle and Outer Planets). Starships is the "Moon Fleet", 12 per page, filtered by the five ship type buttons.
- Moons are indented under their planet. Status is shown with icons, not words.
- A Resources bar sits on the second line of the top bar (left-aligned with the Moonbase button; the clock is at the right of that line), and the Research points bar sits on a third line right below it, as wide as the Moonbase button (106px) with the same treatment as the categories (big dimmed flask behind the centred number, 100px hover area). The Resources bar is one merged bar divided by dashed lines, with the category icon drawn big (62px, 35% opacity, centre 6px from the section's left edge or separator) behind the numbers and clipped to the bar, then each resource as just its quantity in bold (no icon), separated by "·", in the fixed `CAT` order. A quantity is green if growing, normal text colour if stale, red if diminishing (`resRate()`). Tooltips: the category name over the icon; over a resource, its icon, name and the net growth per day in smaller text (the Research points follow the same colour and tooltip rules). The owner is refining the top bar step by step.

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

## Blender (headless)

Blender 5.3 is installed (`/Applications/Blender.app`, Homebrew cask; `blender` is also in `/opt/homebrew/bin`). There is no window and no MCP server: Claude drives it from Bash through `tools/blender.sh`, which runs `blender --background --factory-startup --python-exit-code 1` (a Python error fails the command).

- `tools/blender.sh script.py [args]` runs a script (read `args` after `--` in `sys.argv`); `tools/blender.sh -e 'print(1)'` runs one expression.
- Typical use: build or load a scene with `bpy`, render with `bpy.ops.render.render(write_still=True)` and export (for example glTF with `bpy.ops.export_scene.gltf`). Cycles on the CPU (`scene.cycles.device='CPU'`) renders with materials; Workbench is fast but ignores material colours.
- Keep scratch scripts and renders in the scratchpad, not in the repo. Anything meant for the game goes through the owner first, because the game is a single `index.html` with no assets folder.
