import {
	AbsoluteFill,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { SyncSVG } from "../components/SyncSVG";

export const RediscoverScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Title animation
	const titlePop = spring({ frame: frame - 0, fps, config: { damping: 14 } });
	const badgePop = spring({ frame: frame - 5, fps, config: { damping: 10 } });

	// Feature block animation
	const featurePop = spring({ frame: frame - 15, fps, config: { damping: 12 } });

	return (
		<AbsoluteFill className="bg-brand-bg flex flex-col items-center justify-center gap-12 p-16">
			{/* Header */}
			<div className="z-10 flex flex-col items-center text-center">
				<h2
					style={{
						opacity: titlePop,
						transform: `translateY(${interpolate(titlePop, [0, 1], [30, 0])}px)`,
					}}
					className="text-brand-text mb-10 text-8xl font-bold tracking-tight"
				>
					Find anything, instantly.
				</h2>
				<div
					style={{
						opacity: badgePop,
						transform: `scale(${interpolate(badgePop, [0, 1], [0.8, 1])}) translateY(${interpolate(badgePop, [0, 1], [20, 0])}px)`,
					}}
					className="bg-brand-amber shadow-brand-amber/20 rounded-full px-8 py-3 text-3xl font-bold tracking-wide text-white uppercase shadow-lg"
				>
					The Command Palette
				</div>
			</div>

			<div
				style={{
					opacity: featurePop,
					transform: `scale(${interpolate(featurePop, [0, 1], [0.85, 1])}) translateY(${interpolate(featurePop, [0, 1], [60, 0])}px)`,
				}}
				className="border-brand-linen/50 relative flex h-[600px] w-full max-w-max items-center justify-center overflow-hidden rounded-[3rem] border bg-[#f9f3e5] p-8 shadow-2xl shadow-black/10"
			>
				<SyncSVG
					src={staticFile("feature-guides/command-palette.svg")}
					className="flex h-full w-full items-center justify-center drop-shadow-xl [&>svg]:h-full [&>svg]:w-full"
				/>
			</div>
		</AbsoluteFill>
	);
};
