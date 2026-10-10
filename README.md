# Sulok Launch Video 🎬

This repository contains the programmatic launch video for **[Sulok](https://sulok-app.vercel.app/)**, built entirely in code using [React](https://reactjs.org/) and [Remotion](https://www.remotion.dev/).

Sulok is a modern bookmarking and knowledge management tool—"Your corner of the web." This video demonstrates its core features: **Saving, Organizing, and Rediscovering** links, culminating in a dynamic and highly-animated launch sequence.

## 🛠️ Tech Stack

- **[Remotion](https://www.remotion.dev/)**: For rendering React components into an MP4 video.
- **[React](https://reactjs.org/)**: For component architecture and state-driven animations.
- **[Tailwind CSS (v4)](https://tailwindcss.com/)**: For rapid and scalable styling.
- **Spring Physics**: heavily utilizing `spring()` and `interpolate()` for organic, fluid animations.
- **Synchronized SVG Animations**: Custom `SyncSVG` component to ensure CSS animations embedded in external SVGs perfectly sync with the Remotion frame clock during rendering.

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Remotion Studio

To preview the video, adjust timings, and inspect individual scenes:

```bash
npm run dev
```

This will open the Remotion Studio in your browser where you can scrub through the timeline.

### 3. Render the Video

To export the final high-quality `.mp4` video file:

```bash
npm run build
```

Or use the CLI command directly for specific formats:

```bash
npx remotion render src/index.ts SulokLaunchVideo out/sulok-launch-video.mp4 --pixel-format=yuv444p --color-space="bt709"
```

## 🎥 Scenes Breakdown

1. **OpeningChaos**: A massive cluster of links filling the screen to establish the "problem" of a disorganized web.
2. **TheProblemExplained**: "The web is messy. We built a corner for it."
3. **SulokReveal**: Introduction of the Sulok brand and the sleepy Sulo mascot.
4. **SaveLinkScene**: Highlighting the quick-save and smart clipboard features.
5. **OrganizeLinksScene**: Showcasing drag-and-drop organization.
6. **RediscoverScene**: Demonstrating the Command Palette for instant recall.
7. **PreCloseScene**: A dynamic sequence summarizing the workflow, culminating in a massive zoom-in through the search icon.
8. **ClosingScene**: The final lockup featuring a bouncy collision between Sulo and the URL badge, ending with an organic dark slime transition.

## 💡 Notes

- All animations are timeline-based using `useCurrentFrame()` to ensure 100% deterministic rendering.
- Animated SVGs (like the Sulo mascot and feature mockups) are strictly synchronized to the Remotion clock via a custom injection technique (`SyncSVG.tsx`).

---

_Built with ❤️ for Sulok._
