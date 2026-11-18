# The Solar Century: project guide

Single-file browser game prototype (`index.html`: HTML, CSS and vanilla JS, no build step, no dependencies), inspired by *Millennium 2.2* (1989). Earth is lost; build the Moonbase and launch the Gaia Ark before 2200. The design is in `GDD.html`, what we said we will do later in `PROMISES.md`, and the code architecture and detailed UI conventions in `docs/ARCHITECTURE.md`.

## Working rules (set by the owner)

- **Only push to GitHub when the owner says so directly** (for example "push it"). Committing locally is fine; pushing is not, even if a hook asks for it. The repo is `NeoBedate/theSolarCentury`, branch `main`.
- Remind the owner that changes are not pushed **only once every ten changes**, not after each one, and never mention the count, the number of unpushed changes or push status in any reply before it reaches ten.
- Tell the owner when a session is consuming a lot of time or tokens, so they can decide how to continue.
- Things the owner says will be done later go into `PROMISES.md` (also the list of undescribed Database entries). Pending work is never tracked inside the game.
- **Keep the documents current in the same change:** `GDD.html` (full design, see below), the short "What is in the prototype" summary in `README.md`, and `docs/ARCHITECTURE.md` when the code structure changes.
- Answer in the owner's language (they write in English here). Keep replies short: what changed, and what to check.
- Balancing is deliberately postponed. All numbers are provisional.
- The owner is defining **rendering rules** one at a time. Record each in "Rendering rules" below as it arrives.

## Working cheaply (save tokens)

- **Never read `index.html` whole.** Its script is split into sections marked `/* ===== NAME ===== */`: `grep -n "===== " index.html` lists them, then read only the lines needed. Use `Grep` for names. Read `docs/ARCHITECTURE.md` only for the section a task needs.
- **Test with `node tools/check.js`** (smoke test: every screen, map level, Editor tab, 90 game days, the GDD; exit 1 on page errors). Add `--shot base,map3` for half-size screenshots in `tools/out/`, `--clip x,y,w,h` for a region, `--eval "S.res.iron"`, `--days N`, `--theme light`, `--quick`. Look at screenshots only for UI work, at the smallest scale that answers the question. Setup if `tools/node_modules` is missing: `cd tools && npm i && npx playwright install chromium`.
- **GDD data is synced, not edited:** after changing game data run `node tools/sync-gdd.js` (copies the data block from `index.html`; `check.js` warns when it is stale). Edit the GDD by hand only for prose, "Open design questions" (in step with `PROMISES.md`), and GDD-only data. Its revision number and history are generated from git by the same script (the pre-commit hook runs it); never edit them. Numbers in prose use `data-val`/`data-cost` spans, never typed by hand.
- **Pre-commit hook** (`.githooks/pre-commit`, enabled with `git config core.hooksPath .githooks`) runs `tools/check.js` when a commit touches the game, the GDD or `tools/`. Never bypass it (`--no-verify`): fix the cause. GitHub Actions (`.github/workflows/check.yml`) runs the same check and `tools/sync-gdd.js --check` on every push.
- On the owner's Mac, Node comes from Homebrew and Claude's shell does not have it on the PATH: prefix commands with `export PATH=/opt/homebrew/bin:$PATH;` (including `git commit`, or the hook silently skips the check). Node, `tools/node_modules` and the Playwright Chromium are installed there and the hook is enabled.
- Owner's guides for working together and the process roadmap: `docs/guide-working-with-claude.md` and `docs/guide-process-roadmap.md`. Update the roadmap's status column when an item is done.

## UI conventions decided so far

Details and exact sizes for the top bar, title bars and Resources bar are in `docs/ARCHITECTURE.md` ("UI conventions in detail"): read it before UI work on those parts.

- Amiga/Atari ST look: bevelled buttons and panels, orange accent. The only font is **Jura** (letter-spacing -0.04em); do not reintroduce pixel fonts.
- Every floating screen except the Moonbase panel has a 75px title bar with a centred 26px title and a red-tinted close button; filters and tabs go in `.sticky` blocks so they stay pinned while the content scrolls.
- Hover tooltips (not always-visible text) for descriptions and details. Greyed-out items stay readable. Status is shown with icons, not words. Moons are indented under their planet.
- Light and dark themes (switch in the hamburger menu). New colours must be CSS tokens so both themes work.
- Icons are inline SVGs in `ICON` (16x16 box, `ico(key)`); reuse before adding.

## Rendering rules (set by the owner)

- **Aspect ratio is 16:9.** The reference resolution is **1920x1080**; the game is designed and must run properly at that size.
- To view the game inside the Claude app (preview pane, screenshots), it may be scaled down to **50%** (960x540) or, if needed, **25%** (480x270). This scaling is only for viewing inside Claude, not a change to the design resolution.
- **The main screen is a visualization of the place where the player currently is** (for now the Moonbase; later other locations). It fills the whole 16:9 stage and sits at the back.
- **All UI floats in front of that visualization:** the UI containers (Research points, Resources), the overview sections (Moonbase, Colonies, Starships, Technology, Mission Control, Database, etc.) and the date, clock and main menu button. None of them are part of the background layout.

## Previewing in the Claude app

Use the `game` configuration in `.claude/launch.json` (`tools/serve.js` on http://localhost:8080, live reload). The browser pane opens local files as `data:` copies, where links between `index.html` and `GDD.html` cannot work.
