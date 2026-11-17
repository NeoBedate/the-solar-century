# The Solar Century

A single-file browser prototype of a lunar-colony resource management game, inspired by *Millennium 2.2* (1989). Earth is lost; build up a Moon base and launch the Gaia Ark before the year 2200. The game starts on Friday 1 January 2100 and uses the real calendar, with leap years and weekdays.

**Status:** early prototype. All costs, rates and timings are provisional.

## Play

Open `index.html` in any modern browser. No build step and no dependencies. The Jura font (free, SIL Open Font License) loads from Google Fonts when online; the game falls back to the system sans-serif font otherwise.

## What is in the prototype

**Menus and setup**
- Title screen with New Game, Load Game, Options, Editor and Exit. Load Game and Options are not working yet.
- New Game offers a difficulty screen (only Normal is available) and a Select Configuration choice.
- Editor with tabs for Buildings, Tech, Starships, Colonists and Locations. Edits live in named configurations. The built-in Default is read-only, and configurations can be exported and imported as JSON.

**Main interface**
- A fixed 1920x1080 (16:9) stage that scales to fit the window (add `?scale=0.5` to the URL to force a scale). The Moonbase scene fills it as the main screen, and the panels, overview screens, date and clock float in front.
- Top bar with Moonbase, Colonies, Starships, Technology, Mission Control and Database buttons, the date, a hamburger menu and a grouped icon clock (pause, +1 hour and five speeds, from 1 hour per 30 seconds to 1 hour per half second).
- Two bars on the second line of the top bar, left-aligned under the Moonbase button: first one bar holding all the resources, with dashed dividers between its five sections, with the Research points in their own bar right below it, as wide as the Moonbase button. The Research points icon is drawn big and dimmed behind the number, like the category icons. The Research points number is green when growing, normal when stale and red when diminishing, and whose tooltip shows the icon, the name and the points gained per day in smaller text. In the resources bar, the 18 resources are each shown only as its quantity, separated by "·" and in a fixed order, grouped in five sections (Volatiles, Minerals, Metals, Rare metals and Manufactured) each with its category icon drawn big and dimmed behind the numbers, clipped to the bar. A quantity is green when the resource is growing, in the normal text colour when stale and red when diminishing. Hovering a category icon shows its name; hovering a resource shows its icon, its name and, in smaller text, its net growth per day (production and consumption by buildings and colonists, not counting missions).

**Colonisation (first steps)**
- Every location has an analysis difficulty, an analysis length and real orbital data (distance from the Sun or its planet, eccentricity, period). The distance from the Moonbase in AU and the probe trip time are worked out from them (shown in the Database).
- Send a probe to a location, from its orbit view in the map or from Flight plans. When it reaches the orbit, press Start analysis. The analysis takes the location's length and may fail depending on its difficulty (the probe stays in orbit and you can try again, or recall it).
- A successful analysis makes the technology "Colonise <location>" available in Science Labs. Its research cost depends on the location's difficulty and analysis length.
- Once that technology is researched, Construction offers a colonisation module for the location. For now a finished module only gets recorded: launching it and founding the colony come later.

**Map**
- Five zoom levels, each drawn as a full-screen background with the UI floating in front: the Solar System, a region (Inner, Middle or Outer planets), a planetary system (planet plus its moons), the orbit of a location, and the location's main screen. On the Solar System level, hovering over the orbits and the space around them highlights the Inner, Middle or Outer Planets zone, and clicking it opens that region. Click a body to zoom in, or use the zoom bar at the bottom to jump between levels. Planets and moons orbit with the game date, and locations with a colony have an orange ring.

**Moonbase**
- Placeholder scenes for all 31 locations (what each place looks like: sky, ground, sun and the parent planet in the sky). The main screen draws the scene of the current location, which is the Moon for now; the Database shows a preview of each location.
- The colony name sits alone in the centre at the top of the screen. The Moonbase panel at the top right shows colonists, the building tiles, power and jobs.
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
