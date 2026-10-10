import {
	AbsoluteFill,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
import { SyncSVG } from "../components/SyncSVG";

export const OrganizeLinksScene: React.FC = () => {
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
			title: "Drag and Drop",
			image: "drag-and-drop.svg",
			anim: b1Pop,
			rotation: -8,
			x: -360,
			y: -180,
		},
		{
			title: "Favorites",
			image: "favorites.svg",
			anim: b2Pop,
			rotation: 2,
			x: -20,
			y: 250,
		},
		{
			title: "Personal Notes",
			image: "personal-notes.svg",
			anim: b3Pop,
			rotation: 6,
			x: 360,
			y: -160,
		},
	];

	return (
		<AbsoluteFill className="bg-brand-bg flex flex-row items-center justify-center p-12">
			{/* Left Column: Title */}
			<div className="relative z-20 flex w-[35%] flex-col justify-center pl-32">
				<h2
					style={{
						opacity: titlePop,
						transform: `translateY(${interpolate(titlePop, [0, 1], [30, 0])}px)`,
					}}
					className="text-brand-text text-8xl leading-[1.1] font-bold tracking-tight"
				>
					Organizing <br /> Your Corner
				</h2>
			</div>

			{/* Right Column: Features Scattered */}
			<div className="relative flex h-full w-[65%] items-center justify-center">
				{features.map((feature, index) => {
					return (
						<div
							key={index}
							className="absolute flex flex-col items-center gap-8 text-center"
							style={{
								opacity: feature.anim,
								transform: `translateX(${feature.x}px) translateY(${feature.y + interpolate(feature.anim, [0, 1], [40, 0])}px) scale(${interpolate(feature.anim, [0, 1], [0.8, 1])}) rotate(${interpolate(feature.anim, [0, 1], [0, feature.rotation])}deg)`,
							}}
						>
							{/* SVG Container */}
							<div className="border-brand-linen/50 relative flex w-full items-center justify-center overflow-hidden rounded-[2.5rem] border bg-[#f9f3e5] p-8 shadow-2xl shadow-black/5">
								<SyncSVG
									src={staticFile(`feature-guides/${feature.image}`)}
									className="flex h-full w-full items-center justify-center drop-shadow-sm [&>svg]:h-full [&>svg]:w-full"
								/>
							</div>

							{/* Feature Title */}
							<div className="bg-brand-amber shadow-brand-amber/20 rounded-full px-8 py-3 text-2xl font-bold tracking-wide whitespace-nowrap text-white uppercase shadow-lg">
								{feature.title}
							</div>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};
