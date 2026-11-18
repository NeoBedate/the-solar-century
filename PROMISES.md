# Promises

Things we have said we will build or decide later.

**Game flow**
- Load Game and Options on the title screen.
- Easy and Hard difficulties (only Normal is available).
- The original-style main screen images. Every location has a CSS placeholder scene today (the Moonbase one included); they are to be replaced by real art.

**Design to define**
- Technologies for the Manufacturing and Weapons research categories. The filters exist, but no technology belongs to them yet.
- Balancing resources and costs, which is a job for later down the road. All values are provisional.
- A source for software.
- Other ways to earn research points besides the Science Lab, such as performing other tasks.
- Where to display the number of colonised locations. It is tracked already, but hidden for now.

**Expansion**
- Drive technologies: specify several drives (faster than the simplest one, which covers 1 AU in 1946 days) so that, over a whole game, every location can be reached. The simplest drive cannot reach beyond Uranus before 2200. Probe trip times must then use the drive's speed instead of the single `SURVEY.dpa`.
- Colonisation, next details from the owner: what a finished colonisation module does (launching it and founding the colony), what the probe analysis reveals about each location, and the real values for each location's analysis difficulty, length, trip time and technology cost. Everything is placeholder today, and a failed analysis only costs time.
- Atmosphere: give each location an atmosphere value based on its controlling atmospheric resource. It decides which environmental technology is needed to sustain a colony there.
- Environmental technology: define the technologies that let a colony survive each atmosphere type (to be tied to the location's atmosphere value).
- Starship parts: every starship gets these parts, each tied to a technology: drive, life support, cargo bay, crew quarters, bridge, ship's computer, weapons and shields.
- Minimum crew warning: every starship needs a minimum crew to work properly. When the crew aboard falls below that minimum, issue a warning (define the minimum per ship type and how the warning is shown).
- Starship loading, next steps: the Crew, Cargo and Resources tabs of each starship exist (Cargo is empty). Crew quarters should limit how many people can be aboard, the Cargo tab needs its content (parts and colony modules in the cargo bay), and missions do not yet use the crew and resources loaded on a ship.
- Refit: the button exists on each starship but is disabled. Define how a starship's parts are changed (cost, time, which parts, whether it must be landed).
- Define the starship parts: what each one does and its values, per starship type (to be defined later).
- Cargo and weight: weights exist (per unit of each resource, per part type and per crew member, all provisional, editable under Starships in the Editor) but nothing uses them yet. The Starships overview shows each ship's total tonnage (fitted parts plus crew) over a maximum (placeholder: 100 t for probes). Still to define: how the maximum is set (by the drive, the cargo bay or the ship type), cargo bay capacity, what loading a starship means, and how total weight affects the drive (speed, fuel or trip time). Weights per part type will need to become per part variant once there are several drives and so on.
- Define colony module: what it is, its size and what it contains. To colonise, a starship must carry a colony module in its cargo bay.
- Colonists travel on the same starship as the colony module and occupy its crew quarters.
- Colonist lifeforms: colonists are Human, Martian, Hydrogoid, Nitroid, Sulphuroid or Methanoid (the owner's table names Titan's lifeform Nitroid; confirm), each based on the atmospheric conditions of a location. All have "Colonist" as base job and any can work as Labourer, Scientist, Technician, Builder or Crew. Locations now carry a lifeform and the table's resources (see Database). Still to define: Leda, Hyperion and Phoebe are now in the game with placeholder scenes (real art still to come), the table has no entry for the other locations (Mercury, Venus, Earth, Phobos, Deimos, belt, Jupiter, Io, Europa, Ganymede, Iapetus, Dione, Mimas, Charon: keep old resources, no lifeform), how a lifeform ties to the atmosphere value and environmental technology, any differences between lifeforms (needs, jobs, births), and how the code changes (today jobs and the ship crew kinds treat Colonists, Labourers, etc. as separate kinds).
- Colony supplies: the ship must also bring a minimum amount of supplies for those colonists (which resources and how much per colonist are still to define).
- Map: starships and missions shown flying on the map and in orbit, and real art for the orbit globes. The orbit view only shows the globe with a marker. Moons are drawn on circular orbits with arbitrary starting positions (their real eccentricities and positions are not used), and the spacing is compressed (exponent per system in `SYSG`; the far irregular moons Leda and Phoebe sit on a dashed outer ring, listed in `IRR`).
- Founding colonies on other planets, moons and in the asteroid belt. They are listed in Colonies but only the Moonbase exists.
- Several outposts running different research projects at the same time. The Under Investigation tab of the Mission Control Log is built for this.
- The other starship types: Hop Miners, Solar Carriers, Nuclear Cruisers and Colony Ships. They can be researched and built, and today only Probes exist.

**Database descriptions still to write** (not tracked in the game; this list is the only record)
- Resources: all 18 (Hydrogen, Oxygen, Water, Nitrogen, Methane, Sulphur, Titanium, Aluminium, Copper, Silica, Iron, Silver, Chromium, Platinum, Uranium, Components, Machinery, Software).
- Starships: Probes, Hop Miners, Solar Carriers, Nuclear Cruisers, Colony Ships.
- Colonists: Colonists, Labourers, Scientists, Technicians, Builders, Crew.

