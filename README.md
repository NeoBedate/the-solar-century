# The Solar Century

A single-file browser prototype of a lunar-colony resource management game, inspired by *Millennium 2.2* (1989). Earth is lost; build up a Moon base and launch the Gaia Ark before the year 2200. The game starts on Friday 1 January 2100 and uses the real calendar, with leap years and weekdays.

**Status:** early prototype. All costs, rates and timings are provisional.

## Play

Open `index.html` in any modern browser. No build step and no dependencies. The Jura font (free, SIL Open Font License) loads from Google Fonts when online; the game falls back to the system sans-serif font otherwise.

## What is in the prototype

A short summary. The full description of every system, with its current values, is in the Game Design Document.

- **Menus:** title screen with New Game, Editor, Design Document and Exit (Load Game and Options are not working yet); light and dark themes.
- **Main interface:** a 1920x1080 stage that scales to the window, with the current location's scene behind floating panels: overview buttons, the Resources and Research points bars, the date, the clock and the main menu.
- **Map:** seven zoom levels from the whole Solar System to the Moonbase, with real orbits and the real positions of the planets on the game date.
- **Moonbase:** buildings, power, colonists in jobs, construction, research, the Starport and Shipyard, missions and the Mission Control log.
- **Colonisation (first steps):** send probes, analyse locations, research "Colonise" technologies and build colonisation modules. Founding the colony comes later.
- **Overviews:** Colonies (34 locations), Starships (the Moon Fleet, with crew and resource loading), Technology and the Database.
- **Editor:** every game value in named configurations, exportable as JSON.

## Documents

- [GDD.html](GDD.html): the Game Design Document (vision, systems, values, open questions). Open it in a browser or from the title screen.
- [PROMISES.md](PROMISES.md): what we have said we will build, decide or write later.
- [docs/guide-working-with-claude.md](docs/guide-working-with-claude.md): how to ask for work so it is fast and cheap.
- [docs/guide-process-roadmap.md](docs/guide-process-roadmap.md): planned improvements to the development process.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [CLAUDE.md](CLAUDE.md): technical notes and working rules for Claude.

## Development tools

Node.js only, for development (the game needs nothing). Set up once: `cd tools && npm i && npx playwright install chromium`.

- `node tools/serve.js`: serves the folder on http://localhost:8080 and reloads the page when a file changes.
- `node tools/check.js`: headless test of every screen, with optional screenshots (`--shot base`).
- `node tools/sync-gdd.js`: copies the game's data into the GDD's tables.
- `git config core.hooksPath .githooks` (once per computer): runs the check before each commit that changes the game. GitHub runs it too on every push.

## Credits

Inspired by *Millennium 2.2*. Not affiliated with the original game or its publishers.
