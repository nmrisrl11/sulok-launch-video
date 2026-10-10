import {
	AbsoluteFill,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { SyncSVG } from "../components/SyncSVG";

export const SaveLinkScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Title animation
	const titlePop = spring({ frame: frame - 0, fps, config: { damping: 14 } });

	// Feature blocks animations (staggered)
	const b1Pop = spring({ frame: frame - 10, fps, config: { damping: 12 } });
	const b2Pop = spring({ frame: frame - 20, fps, config: { damping: 12 } });
	const b3Pop = spring({ frame: frame - 30, fps, config: { damping: 12 } });

	const features = [
		{
			title: "The Quick Save Popup",
			image: "quick-save-popup.svg",
			anim: b1Pop,
			rotation: -4,
		},
		{
			title: "Zero-Click Context Menus",
			image: "context-menu.svg",
			anim: b2Pop,
			rotation: 0,
		},
		{
			title: "Smart Clipboard",
			image: "smart-clipboard.svg",
			anim: b3Pop,
			rotation: 4,
		},
	];

	return (
		<AbsoluteFill className="bg-brand-bg flex flex-col items-center justify-center gap-16 p-16">
			{/* Title */}
			<h2
				style={{
					opacity: titlePop,
					transform: `translateY(${interpolate(titlePop, [0, 1], [30, 0])}px) scale(${interpolate(titlePop, [0, 1], [0.9, 1])})`,
				}}
				className="text-brand-text text-6xl font-bold tracking-tight"
			>
				The Fastest Ways to Save
			</h2>

			{/* Features Container */}
			<div className="flex w-full max-w-6xl items-start justify-center gap-12">
				{features.map((feature, index) => {
					return (
						<div
							key={index}
							className="flex flex-1 flex-col items-center gap-6 text-center"
							style={{
								opacity: feature.anim,
								transform: `scale(${interpolate(feature.anim, [0, 1], [0.8, 1])}) translateY(${interpolate(feature.anim, [0, 1], [40, 0])}px) rotate(${interpolate(feature.anim, [0, 1], [0, feature.rotation])}deg)`,
							}}
						>
							{/* SVG Container */}
							<div className="border-brand-linen/50 relative flex w-full items-center justify-center overflow-hidden rounded-[2rem] border bg-[#f9f3e5] p-8 shadow-xl shadow-black/5">
								<SyncSVG
									src={staticFile(`feature-guides/${feature.image}`)}
									className="flex h-full w-full items-center justify-center drop-shadow-sm [&>svg]:h-full [&>svg]:w-full"
								/>
							</div>

							{/* Feature Title */}
							<div className="bg-brand-amber shadow-brand-amber/20 rounded-full px-6 py-2 text-lg font-bold tracking-wide whitespace-nowrap text-white uppercase shadow-lg">
								{feature.title}
							</div>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};
