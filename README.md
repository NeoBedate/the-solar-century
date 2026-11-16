# The Solar Century

A single-file browser prototype of a lunar-colony resource management game, inspired by *Millennium 2.2* (1989). Earth is lost; build up a Moon base and launch the Gaia Ark before the year 2300.

**Status:** early prototype. All costs, rates and timings are provisional.

## Play

Open `index.html` in any modern browser. No build step and no dependencies. Fonts load from Google Fonts when online; the game falls back to system monospace fonts otherwise.

## What is in the prototype

**Menus and setup**
- Title screen with New Game, Load Game, Options, Editor and Exit. Load Game and Options are not working yet.
- New Game offers a difficulty screen (only Normal is available) and a Select Configuration choice.
- Editor with tabs for Buildings, Tech, Starships, Colonists and Locations. Edits live in named configurations. The built-in Default is read-only, and configurations can be exported and imported as JSON.

**Main interface**
- A fixed 1920x1080 (16:9) stage that scales to fit the window (add `?scale=0.5` to the URL to force a scale). The Moonbase scene fills it as the main screen, and the panels, overview screens, date and clock float in front.
- Top bar with Moonbase, Colonies, Starships, Technology, Mission Control and Database buttons, the date, a hamburger menu and a grouped icon clock (pause, +1 hour and five speeds, from 1 hour per 30 seconds to 1 hour per half second).
- Research points in their own small bar on the second line of the top bar, under Colonies, with the points gained per day in a tooltip. The Resources panel is on the left. The 18 resources are grouped in five categories with icons: Volatiles, Minerals, Metals, Rare metals and Manufactured.

**Moonbase**
- Main screen linking to Science Labs, Construction, Shipyard, Starport, and Flight plans. The Science Labs and Construction buttons show what they are working on, or Idle.
- Buildings with construction time, power use and machinery upkeep, staffed by colonists as Labourers, Scientists, Technicians and Builders, with a boost when fully manned.
- Research projects (the research points total and rate are shown at the top of Science Labs): passive research points from staffed Science Labs, upfront and daily costs, pause and resume.
- Starport with up to 8 berths. It starts with one, and each expansion is built through Construction. Probes built in the Shipyard are berthed there.
- Missions to Earth, Mars, the asteroid belt and the outer moons, crewed by colonists.
- Mission Control Log, an overview screen with Main Objectives, Daily Operations and Under Investigation tabs (the technologies being researched now).

**Overview screens**
- Every overview and Moonbase sub-screen has a close button (X) at the top right of its title bar, on the same line as its name. It returns to the Moonbase, like Esc.
- Colonies: 31 locations in three pages (Inner, Middle and Outer Planets), including the Sun's planets, Pluto and 20 moons. Uncolonised locations are greyed out, and hovering shows a description and each resource category with what is produced and what the location can provide.
- Starships: the Moon Fleet, with a pager, filters for the five ship types and hangar and mission status icons for each ship.
- Technology: paused and completed technologies, with seven category filters (Colonization, Energy, Mining, Manufacturing, Life Support, Starships, Weapons). Every technology has a category, editable in the Editor.
- Database: a compendium of locations, resources, buildings, technologies, starships and colonists (entries without a description simply show their facts).

## Things to do

See [PROMISES.md](PROMISES.md) for what we have said we will build, decide or write later.

## Credits

Inspired by *Millennium 2.2*. Not affiliated with the original game or its publishers.
