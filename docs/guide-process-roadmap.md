# Guide: process roadmap

Improvements to how the game is built and tested. Each item says what it gives, what Claude does, and what **you** need to do or decide. To start one, tell Claude its number (for example "do roadmap item 2"). Claude updates the Status column when an item is done.

## Overview

| # | Improvement | Status | Your part |
|---|---|---|---|
| 1 | Test scenarios from the URL (`?state=`, `?seed=`) | Planned | Choose the situations worth saving |
| 2 | Checkpoint before each commit (git hook) | Planned | Say yes; install Node.js on each computer |
| 3 | Automatic checks on GitHub | Planned | Say yes; a push is needed to activate it |
| 4 | Balancing simulator | Later (when balancing starts) | Decide what "balanced" means |
| 5 | Automatic GDD revision numbers | Planned | Nothing |
| – | Token savings: `tools/check.js`, `tools/sync-gdd.js`, short `CLAUDE.md`, short README, code signposts | Done | – |

## 1. Test scenarios from the URL

**Gives:** any situation can be tested without clicking through the game. `?state=midgame` would load a prepared save (for example: a probe in orbit around Mars, three colonists short of water, year 2150), and `?seed=42` makes random events repeat exactly. Tests become shorter and cheaper, and bugs you report can be reproduced. It also builds half of Load Game.

**Claude does:** a save format for `S`, a few named scenarios, the URL options, and support in `tools/check.js`.

**You:** list the situations you want to reach quickly (for example "late game with all technologies", "brown-out", "Starport full").

## 2. Checkpoint before each commit

**Gives:** `tools/check.js` runs by itself before every commit and stops a commit that breaks the game. No tokens are spent on it.

**Claude does:** a git pre-commit hook in the repository and a one-line install command.

**You:** approve it, and run the install command once on each computer (desktop PC and Mac). Node.js must be installed on both.

## 3. Automatic checks on GitHub

**Gives:** every push is tested on GitHub's computers (free for this size of project); a red or green mark appears next to each commit.

**Claude does:** a GitHub Actions workflow file that installs Playwright and runs `tools/check.js`.

**You:** approve it, then say "push it" so it starts working. If a check fails, GitHub emails you.

## 4. Balancing simulator

**Gives:** the whole century played automatically in seconds, with no screen, following simple strategies. It reports resources, population, research and the year the Ark could launch. You tune numbers from its reports instead of playing for hours.

**Claude does:** a `tools/simulate.js` script that runs the game's own `tick()` and writes a report (and charts if useful).

**You:** decide what a balanced game looks like (for example "the Ark should be possible around 2185 with good play; running out of water should be a real risk in the first 10 years"). Balancing is postponed, so this waits until you start it.

## 5. Automatic GDD revision numbers

**Gives:** the GDD's revision number and history row come from git, so they are never forgotten. (The game commit the tables were synced from is already filled in automatically.)

**Claude does:** extend `tools/sync-gdd.js`.

**You:** nothing.
