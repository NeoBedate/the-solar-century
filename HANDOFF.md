# Handoff: resuming on the desktop PC

Written on 2026-11-17 on the Mac, to continue the next day on the PC. Delete this file once you have resumed. `CLAUDE.md` (rules, architecture, UI conventions), `README.md` (what exists) and `PROMISES.md` (what is pending) are the durable docs; this file only says where we stopped.

## Where we are

Everything done on the Mac is committed and pushed to `main` (`NeoBedate/theSolarCentury`). On the PC: `git pull`, then open `index.html` in a browser. There is no build step.

Done in the last sessions:
- Fixed 16:9 stage (1920x1080, scaled to fit), the main screen is the location scene and all UI floats in front.
- Top bar rework: Moonbase and overview buttons (touching), date, menu, clock; a Resources bar (category icons dimmed behind bold numbers, green/normal/red by growth, tooltips with the daily rate) and a Research points bar. Jura is the only font.
- Overviews: Technology (category filters), Mission Control Log (with an Under Investigation tab), close buttons, pinned title and filters.
- Placeholder scenes for all 31 locations, and the five-level orbiting map (Solar System, region with hoverable Inner/Middle/Outer zones, planetary system, orbit, main screen) with a zoom bar.
- Colonisation first steps: probe survey, analysis, "Colonise X" technologies, colonisation module in Construction (details in `CLAUDE.md`, "Colonisation").

## What comes next (owner to define)

- The colonisation flow is only the start: the owner said "there will be more details". Open points are in `PROMISES.md` (what a finished module does, what the analysis reveals, real per-location values).
- Rendering rules are still being defined one at a time; record each in `CLAUDE.md`.
- Owner working style: one step at a time, implement as we go, short replies. Push only when the owner says so ("push it"). Remind about pushing only once ten changes have piled up, and never mention counts or push status before that.

## Differences between the Mac and the PC

- **Blender** is installed only on the Mac (Homebrew cask). On the PC, install Blender (blender.org) and run `tools/blender.sh`: it finds Blender on the PATH or in `BLENDER=/path/to/blender`. The script is bash, so on native Windows use Git Bash or WSL, or ask Claude for a `.py`/`.ps1` version. Nothing in the game uses Blender yet; the owner has not asked for it.
- **Git login** (`gh auth login`) was done on the Mac only. The PC needs its own.
- **Editor configurations** live in the browser's local storage, so they stay on the Mac; use Export and Import in the Editor to move them.
- **Claude memory** (the push-reminder rule) lives in the Mac's `~/.claude`; the same rule is in `CLAUDE.md`, so it carries over.
- **Testing:** `CLAUDE.md` mentions Playwright, but the Mac has neither Node nor Playwright; testing there was done in the built-in browser by driving the page with JavaScript. If the PC has Node, Playwright works as described.

## Testing tips

- URL parameters for testing: `?scale=0.5` forces the stage scale, `?z=1..5` starts at a map zoom level, `?loc=mars` starts at another location. (The Claude preview pane drops query strings; set `S.loc` and call `zoomTo(n)` from the console instead.)
- Handy console calls: `S` (state), `go('db')`, `zoomTo(4)`, `svSend('mars')`, `tick()`.

## To resume the conversation

A conversation does not move between machines. Start a new session in this folder on the PC and say: "Read HANDOFF.md, CLAUDE.md and PROMISES.md, then continue from there."
