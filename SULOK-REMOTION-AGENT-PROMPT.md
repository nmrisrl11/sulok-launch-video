# AI Agent Prompt --- Build the Sulok Launch Video with Remotion

You are working as a motion designer and senior front-end/Remotion
engineer. Your task is to produce a polished launch video for Sulok
using Remotion.

## First: inspect the workspace

Before changing anything: 1. Inspect the current working directory and
identify the video project, package manager, scripts, Remotion version,
and existing conventions. 2. Read `SULOK-LAUNCH-VIDEO-BRIEF.md`
completely. If it is stored under a different name or location, locate
the corresponding launch-video brief and use it as the creative source
of truth. 3. Inspect the available Sulok assets and references listed in
the brief. The main Sulok repository may be available at
`C:\Users\NOMER ISRAEL\OneDrive\Desktop\Projects\sulok`, but do not
assume that path exists in the current environment. 4. Inspect
`public/app-info.ts`, `public/mascots`, `public/folder-icon`,
`public/feature-guides`, `src/pages/guide`, and the deployed feature
guide when accessible. 5. Verify the actual current implementation of
every feature you intend to depict. 6. Report any essential missing
information or inaccessible paths, but continue with reasonable, clearly
documented alternatives when possible.

Do not start by blindly installing packages or generating a large amount
of code. Understand the workspace and assets first.

## Objective

Create a 45--60 second (aim for about 55 seconds), 16:9, 1920 × 1080, 30
fps motion-introductory launch video for Sulok.

This is **not** a conventional feature demo, a slideshow, or a screen
recording with captions. It should tell a compact, relatable brand
story:

**Opening problem → "That's why I built Sulok" → demonstrate Save,
Organize, Rediscover → closing brand message.**

The central idea is:

> The internet is full of things worth keeping. Give them a place of
> their own.

Brand tagline: **Your corner of the web.**

The emotional arc is: 1. Familiar digital clutter and frustration. 2. A
brief pause and a personal, purposeful reveal. 3. A calm, satisfying
demonstration of the real product. 4. A warm, memorable brand ending.

## Creative and brand requirements

Use the supplied palette: - Text: `#1E1B18` - Background: `#F7F5F0` -
Amber: `#C49A6C` - Stone: `#7C7570` - Linen: `#E8E4DE`

Use the real Sulok logo, mascot SVGs, folder icons, feature-guide
animations, and product UI wherever practical. Inspect asset filenames
and formats rather than guessing them. Preserve the approved artwork and
proportions.

The opening may use darker, denser compositions, but the reveal and
product scenes should transition into Sulok's warm, calm visual
identity. The overall result should feel personal, modern, thoughtful,
polished, and quietly playful---not generic, excessively corporate, or
overloaded with effects.

Use Sulo's expressions intentionally. Possible mapping: - Opening:
confused, suspicious, or unimpressed. - Reveal: curious or attentive. -
Save success: excited or happy. - Closing: proud, happy, or sleepy.

Only use expressions that exist in the assets. Keep Sulo secondary to
the story and product.

## Required story and initial timing

Treat this as an initial edit that can be refined after rendering:

### Scene 1 --- The problem (0:00--0:12)

Depict familiar behaviors: browser tabs multiplying, nested bookmark
folders, a cluttered saved-link list, phone tabs, a link sent to a
personal chat, or duplicate saved links. Build visual density and pace
gradually while maintaining a clear focal point.

Show these text beats one at a time: - "I'll check it later." - "Where
did I save that?" - "Wait... did I already save this?"

Use subtle clicks/keyboard sounds if suitable assets are available. End
with a pause, freeze, or reduced sound.

### Scene 2 --- The reveal (0:12--0:20)

Let the clutter settle, fade, or converge into one coherent space.
Reveal Sulok and transition into the real app UI.

Suggested voice-over: "I found myself saving things everywhere... and
forgetting them just as easily. So I built something of my own."

Headline: "That's why I built Sulok."

Supporting line: "Your corner of the web."

### Scene 3 --- Save (0:20--0:27)

Demonstrate a real, verified way to add a link. Show the URL entry/paste
and actual preview/save behavior if available, followed by the saved
item appearing in the collection.

Suggested voice-over: "Save the things that catch your attention."

### Scene 4 --- Organize (0:27--0:35)

Show the actual saved-link collection in a clean, legible composition.
Use real titles, favicons, previews, and folders where available. If the
current UI supports a concise folder interaction, demonstrate it;
otherwise show the real organization experience without inventing
functionality.

Suggested voice-over: "Keep everything together, organized your way."

### Scene 5 --- Rediscover (0:35--0:43)

Demonstrate an actual search or command-palette flow verified in the
current build. Type a short query, reveal a clear result, then highlight
or open it.

Suggested voice-over: "And find your way back whenever you need to."

### Scene 6 --- Closing (0:43--0:55)

Transition to a clean warm end card. Show the Sulok brand, tagline, and
URL.

Suggested voice-over: "Because the things you find online deserve a
place to call home. Sulok. Your corner of the web."

End card: - Sulok - Your corner of the web. - Save. Organize.
Rediscover. - https://sulok-app.vercel.app/

Hold the end card long enough to read comfortably.

## Remotion implementation requirements

1.  Build a main composition with scene components that can be edited
    independently. Suggested components:
    - `OpeningChaos`
    - `SulokReveal`
    - `SaveLinkScene`
    - `OrganizeLinksScene`
    - `RediscoverScene`
    - `ClosingScene`
2.  Add reusable components for typography, browser windows, floating
    links, scene transitions, and mascot placement as appropriate.
3.  Centralize composition settings, scene durations, brand colors, and
    editable copy. Avoid scattering timing values throughout unrelated
    components.
4.  Use Remotion's frame-based APIs and deterministic animation. Avoid
    timers, uncontrolled randomness, and any behavior that changes
    between renders.
5.  Use the current Remotion version and its supported APIs. Do not
    invent APIs or unnecessarily upgrade dependencies.
6.  Use assets via stable, valid paths and the appropriate Remotion
    asset helpers. Verify that every asset resolves during rendering.
7.  Use actual app UI where practical. If directly importing Sulok
    components would create coupling or build issues, create a faithful
    mockup from verified screenshots/assets and document that choice.
8.  Do not modify the Sulok production app or its data. Keep video work
    isolated to the current video project unless the user explicitly
    authorizes changes elsewhere.
9.  Follow the project's existing package manager and conventions. Add
    dependencies only when justified.
10. TypeScript must remain strict. **Never use TypeScript `any`.** Use
    explicit types and narrow unknown values appropriately.
11. Keep text, timings, colors, asset references, and the closing URL
    easy to update.
12. Ensure animations render consistently in headless Chromium and do
    not rely on unavailable browser APIs or external live requests
    during rendering.

## Audio and voice-over

Inspect for existing audio assets before selecting anything. Use only
music and sound effects that are licensed, original, or otherwise
permitted for use.

If no audio assets are available: - Do not block implementation. - Make
the story work without audio. - Add optional, clearly documented audio
integration points. - Provide the proposed voice-over script as a
separate text artifact or in the README. - Do not synthesize or download
copyrighted music without authorization.

Every essential story beat must be understandable with the sound muted.
If narration is used, provide matching captions or concise on-screen
text.

## Product accuracy guardrails

The creative brief includes background and possible product features,
but not every item is guaranteed to be implemented in the current build.
Verify before depicting or claiming any capability.

Do not invent or imply unsupported functionality, especially around: -
Browser extension behavior. - Device/P2P syncing. - Importing or syncing
browser bookmarks. - Folder nesting and drag-and-drop. - Favorites,
notes, recycle bin, or command palette. - Cross-device/mobile
availability. - Privacy, encryption, account requirements, or storage
guarantees.

Do not claim "cloud-synced," "encrypted," "account-free in every
situation," or similar guarantees unless the current code and approved
product copy substantiate the exact claim. Treat the actual codebase and
assets as the source of truth.

## Quality requirements

- Maintain strong contrast and readable text.
- Keep important content within safe margins.
- Avoid tiny UI text, awkward crops, clipped titles, flicker, visual
  collisions, broken images, and excessive transitions.
- Use motion to direct attention, not merely to decorate.
- Keep the product interface recognizable and avoid distorting the
  real UI.
- Check that each scene communicates its point without requiring
  narration.
- Ensure the video remains coherent when watched silently.
- Do not render the entire UI as tiny, unreadable content just to fit
  more features into a frame.

## Execution workflow

Work through these stages:

### Stage 1 --- Audit and plan

- Inspect the workspace, assets, product references, and scripts.
- Verify feature behavior and available media.
- Produce a concise implementation plan and note any assumptions.
- Then proceed with implementation; do not stop at a plan unless a
  critical blocker prevents progress.

### Stage 2 --- Implement

- Build the Remotion composition and reusable scene components.
- Implement the six scenes and transitions.
- Use actual product assets and verified UI behaviors.
- Keep timing, copy, colors, and scene boundaries easy to revise.

### Stage 3 --- Validate

- Run the project's typecheck, lint, and tests where available.
- Run the Remotion composition/listing or equivalent project
  validation command supported by the installed version.
- Render a low-cost preview first if practical.
- Fix missing assets, TypeScript errors, rendering exceptions, layout
  issues, and timing problems before final rendering.

### Stage 4 --- Review and render

- Render the final 1920 × 1080, 30 fps video to MP4/H.264 using the
  installed project's supported command.
- Review the actual output from beginning to end at full speed.
- Inspect representative frames at scene boundaries and check the end
  card.
- If a video preview cannot be watched directly in the environment,
  inspect rendered frames and report that limitation honestly.
- Do not claim the render or validation succeeded unless it actually
  did.

### Stage 5 --- Document handoff

Provide: - The final video output path. - The exact command to reproduce
the render. - The composition ID and dimensions/fps/duration. - The
voice-over script and any captions. - A list of assets reused and any
assets that had to be mocked. - Validation commands and their actual
results. - Known limitations or unverified details. - A concise summary
of files created or changed.

## Definition of done

The task is complete when: - A coherent, polished video exists---not
just a plan or storyboard. - The duration is approximately 45--60
seconds. - The video is 1920 × 1080 at 30 fps. - All six story beats are
represented. - The real Sulok identity and suitable available assets are
used. - Product interactions and claims match verified current
functionality. - The Remotion composition is deterministic and
maintainable. - TypeScript contains no `any`. - The project renders
successfully and the output has been reviewed. - The render instructions
and limitations are documented.

Begin by inspecting the workspace and the launch-video brief. Then
implement, render, validate, and document the result.
