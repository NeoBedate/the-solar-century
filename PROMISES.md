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
- Map: starships and missions shown flying on the map and in orbit, and real art for the orbit globes. The orbit view only shows the globe with a marker. Moons are drawn on circular orbits with arbitrary starting positions (their real eccentricities and positions are not used), and Saturn's moons use compressed spacing.
- Founding colonies on other planets, moons and in the asteroid belt. They are listed in Colonies but only the Moonbase exists.
- Several outposts running different research projects at the same time. The Under Investigation tab of the Mission Control Log is built for this.
- The other starship types: Hop Miners, Solar Carriers, Nuclear Cruisers and Colony Ships. They can be researched and built, and today only Probes exist.

**Database descriptions still to write** (not tracked in the game; this list is the only record)
- Resources: all 18 (Hydrogen, Oxygen, Water, Nitrogen, Methane, Sulphur, Titanium, Aluminium, Copper, Silica, Iron, Silver, Chromium, Platinum, Uranium, Components, Machinery, Software).
- Starships: Probes, Hop Miners, Solar Carriers, Nuclear Cruisers, Colony Ships.
- Colonists: Colonists, Labourers, Scientists, Technicians, Builders, Crew.

