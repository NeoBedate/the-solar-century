# Guide: working with Claude on The Solar Century

How to ask for work so it is fast and cheap. Keep it open while you plan a session.

## Quick reference

| Do | Why |
|---|---|
| Send several small requests in **one message** | One round trip instead of many; Claude tests them all once |
| Give **exact values** (px, colours, positions, wording) | Avoids rounds of trial and error |
| Start a **new session for each unrelated topic** | Every turn re-reads the whole conversation; long sessions cost more per turn |
| Use a **cheaper model for routine work** | Sonnet or Haiku cost a fraction of Opus |
| Say **"push it"** when you want a push | Claude never pushes otherwise |
| Point at the **screen and element** ("Starships overview, the Parts tab") | Claude goes straight to the right code section |

## 1. Batch your requests

Each message you send makes Claude reload the conversation, find the code, edit, test and report. Five tweaks in five messages pay that cost five times; in one message, once.

- Good: "Top bar: move the date 10px left, make the clock buttons 32px tall, and show the weekday in orange."
- Costly: three messages, one per change.

If you are exploring ("try a few options"), ask for **the options side by side in one go** (for example "show me three versions of the Resources bar as screenshots"), then pick one.

## 2. Be exact

Vague requests ("make it nicer", "a bit bigger") lead to guesses and corrections. Name:

- **Where:** the screen and element (Moonbase panel, Colonies pager, Database tabs).
- **What:** the property and the value (16px, 50% opacity, orange accent, "Launch probe").
- **Against what:** a reference if there is one ("same height as the Main menu button").
- **Done when:** what you will check ("the date never passes the pause button").

A template you can copy:

```
Screen/element:
Change:
Values:
Like (reference):
Check:
```

For new **game rules**, say whether the numbers are final or placeholders (balancing is postponed, so placeholders are the default).

## 3. One topic per session

- Start a **new session** when you switch to unrelated work (for example from the top bar to colonisation rules). The project files (`CLAUDE.md`, the GDD, the code) carry everything a new session needs, so nothing is lost.
- Stay in the **same session** for follow-ups on the same feature, while Claude still has the context.
- Claude tells you when a session becomes long or expensive; that is a good moment to start a fresh one.

## 4. Pick the model for the job

Change it with the model selector in the Claude app's message box.

| Work | Model |
|---|---|
| New systems, game design, tricky bugs, big refactors | Opus (default) |
| Routine features, UI tweaks with exact values, doc updates | Sonnet |
| Running checks, syncing the GDD, small text edits, questions about the code | Haiku |

## 5. Things you can run yourself

You need Node.js. Set up once: `cd tools && npm i && npx playwright install chromium`.

| Command | What it does |
|---|---|
| `node tools/serve.js` | Plays the game on http://localhost:8080 and reloads when files change |
| `node tools/check.js` | Tests every screen and map level, runs 90 game days, checks the GDD; says "no page errors" when all is well |
| `node tools/check.js --shot base,map3` | Also saves screenshots in `tools/out/` |
| `node tools/sync-gdd.js` | Copies the game's current data into the GDD tables |

## 6. What costs the most

- **Screenshots** (each one Claude looks at is expensive): ask for them only for visual work.
- **Reading big files**: `index.html` is about 140 KB. Pointing at the screen or feature saves Claude searching.
- **Long conversations**: see section 3.
- **Back-and-forth on looks**: see sections 1 and 2.
