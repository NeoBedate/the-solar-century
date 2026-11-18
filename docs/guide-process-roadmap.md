# Guide: process roadmap

Improvements to how the game is built and tested. Each item says what it gives, what Claude does, and what **you** need to do or decide. To start one, tell Claude its number (for example "do roadmap item 2"). Claude updates the Status column when an item is done.

## Overview

| # | Improvement | Status | Your part |
|---|---|---|---|
| 1 | Test scenarios from the URL (`?state=`, `?seed=`) | Planned | Choose the situations worth saving |
| 2 | Checkpoint before each commit (git hook) | Done on the desktop PC | Install it on the Mac (see below) |
| 3 | Automatic checks on GitHub | Ready, starts with the next push | Say "push it" |
| 4 | Balancing simulator | Later (when balancing starts) | Decide what "balanced" means |
| 5 | Automatic GDD revision numbers | Done | – |
| – | Token savings: `tools/check.js`, `tools/sync-gdd.js`, short `CLAUDE.md`, short README, code signposts | Done | – |

## 1. Test scenarios from the URL

**Gives:** any situation can be tested without clicking through the game. `?state=midgame` would load a prepared save (for example: a probe in orbit around Mars, three colonists short of water, year 2150), and `?seed=42` makes random events repeat exactly. Tests become shorter and cheaper, and bugs you report can be reproduced. It also builds half of Load Game.

**Claude does:** a save format for `S`, a few named scenarios, the URL options, and support in `tools/check.js`.

**You:** list the situations you want to reach quickly (for example "late game with all technologies", "brown-out", "Starport full").

## 2. Checkpoint before each commit

**Gives:** `tools/check.js` runs by itself before every commit and stops a commit that breaks the game. No tokens are spent on it.

**How it works:** the hook is `.githooks/pre-commit`. It runs only when a commit includes `index.html`, `GDD.html` or a file in `tools/` (documents alone are not checked), takes about 5 seconds, and when it stops a commit it prints the page error that caused it. On a computer without Node.js or without the tools set up it prints a warning and lets the commit through.

**Installed on:** the desktop PC.

**You, on the Mac (once):** in Terminal, from the repository folder, after pulling:

```
cd tools && npm i && npx playwright install chromium && cd ..
git config core.hooksPath .githooks
```

Node.js is needed (`brew install node` if it is missing).

## 3. Automatic checks on GitHub

**Gives:** every push is tested on GitHub's computers (free for this size of project); a red or green mark appears next to each commit.

**How it works:** the workflow is `.github/workflows/check.yml`. On every push to `main` (and on pull requests) GitHub installs the tools, runs `tools/check.js`, checks that the GDD data matches the game (`tools/sync-gdd.js --check`), and keeps three screenshots for 7 days (Actions tab, the run, "Artifacts"). You can also start it by hand: Actions tab, "Game check", "Run workflow".

**You:** say "push it"; the first run starts with that push. Check the result on GitHub (green tick or red cross next to the commit, or the Actions tab). If a run fails, GitHub emails you; tell Claude and it will read the log.

## 4. Balancing simulator

**Gives:** the whole century played automatically in seconds, with no screen, following simple strategies. It reports resources, population, research and the year the Ark could launch. You tune numbers from its reports instead of playing for hours.

**Claude does:** a `tools/simulate.js` script that runs the game's own `tick()` and writes a report (and charts if useful).

**You:** decide what a balanced game looks like (for example "the Ark should be possible around 2185 with good play; running out of water should be a real risk in the first 10 years"). Balancing is postponed, so this waits until you start it.

## 5. Automatic GDD revision numbers

**Gives:** the GDD's revision number, date and Revision history come from git, so they are never forgotten.

**How it works:** every commit that changes `GDD.html` is one revision, described by its commit message. `tools/sync-gdd.js` writes the number and history into the GDD, and the pre-commit hook runs it (and includes the GDD) whenever a commit touches the game or the GDD. The newest row reads "this version", because a commit cannot contain its own hash.

**You:** nothing.
