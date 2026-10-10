import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const TheProblemExplained: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const b1Enter = spring({ frame: frame - 5, fps, config: { damping: 14 } });
	const b1Exit = spring({ frame: frame - 40, fps, config: { damping: 14 } });

	const b2Enter = spring({ frame: frame - 45, fps, config: { damping: 14 } });
	const b2Exit = spring({ frame: frame - 105, fps, config: { damping: 14 } });

	const b3Enter = spring({ frame: frame - 110, fps, config: { damping: 14 } });
	const b3Exit = spring({ frame: frame - 150, fps, config: { damping: 14 } });

	const b4Enter = spring({ frame: frame - 155, fps, config: { damping: 14 } });
	const b4Exit = spring({ frame: frame - 190, fps, config: { damping: 14 } });

	const getBlockStyle = (enter: number, exit: number, fadeOutOnly = false) => {
		const y =
			interpolate(enter, [0, 1], [30, 0]) + (fadeOutOnly ? 0 : interpolate(exit, [0, 1], [0, -30]));
		const opacity = interpolate(enter, [0, 1], [0, 1]) - interpolate(exit, [0, 1], [0, 1]);

		return {
			opacity,
			transform: `translateY(${y}px)`,
		};
	};

	return (
		<AbsoluteFill className="bg-brand-bg flex items-center justify-center p-20">
			<div className="relative flex h-full w-full max-w-5xl items-center justify-center text-center">
				{/* Block 1 */}
				<h2
					style={getBlockStyle(b1Enter, b1Exit)}
					className="text-brand-text absolute text-5xl leading-tight font-bold"
				>
					We save great finds everywhere.
				</h2>

				{/* Block 2 */}
				<h2
					style={getBlockStyle(b2Enter, b2Exit)}
					className="text-brand-text absolute text-5xl leading-tight font-bold"
				>
					Buried in browser folders, sent in self-DMs, <br /> or lost in a sea of open tabs.
				</h2>

				{/* Block 3 */}
				<h2
					style={getBlockStyle(b3Enter, b3Exit)}
					className="text-brand-text absolute text-5xl leading-tight font-bold"
				>
					But finding them when you actually <br /> need them?
				</h2>

				{/* Block 4 */}
				<h2
					style={getBlockStyle(b4Enter, b4Exit, true)}
					className="text-brand-text absolute text-5xl leading-tight font-bold"
				>
					That's another story.
				</h2>
			</div>
		</AbsoluteFill>
	);
};
