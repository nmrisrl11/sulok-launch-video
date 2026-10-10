import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from "remotion";
import { Mascot } from "../components/Mascot";
import { FONT_FAMILY } from "../constants";

const SLIME_DOTS = Array.from({ length: 40 }).map((_, i) => {
	const seed = i * 12345.6789;
	return {
		id: i,
		x: (Math.sin(seed) * 0.5 + 0.5) * 100,
		y: (Math.cos(seed) * 0.5 + 0.5) * 100,
		delay: (Math.sin(seed * 2) * 0.5 + 0.5) * 80, // up to ~2.5 seconds of spreading
		baseSize: (Math.sin(seed * 3) * 0.5 + 0.5) * 200 + 100, // 100px - 300px
	};
});

export const ClosingScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const slimeStartFrame = 210; // Start slime transition at 7 seconds

	// Sulok Text Animation
	const textPop = spring({ frame: frame + 15, fps, config: { damping: 12 } });
	const sloganPop = spring({ frame: frame + 10, fps, config: { damping: 12 } });

	const textScale = interpolate(textPop, [0, 1], [0, 1]);
	const sloganScale = interpolate(sloganPop, [0, 1], [0, 1]);

	// Starts at center, then falls drastically when hit
	const textHit = spring({ frame: frame - 60, fps, config: { damping: 14 } });
	const textY = interpolate(textHit, [0, 1], [0, 1000]);
	const textRot = interpolate(textHit, [0, 1], [0, 15]);

	// Link Badge Animation (Falls from top, stops at center)
	const linkFall = spring({ frame: frame - 55, fps, config: { damping: 12 } });
	// Mascot hits it later, causing a jolt
	const linkJolt = spring({ frame: frame - 105, fps, config: { damping: 10, mass: 0.8 } });
	const linkJoltY = interpolate(linkJolt, [0, 0.5, 1], [0, 30, 0], { extrapolateRight: "clamp" });
	const linkY = interpolate(linkFall, [0, 1], [-800, 100]) + linkJoltY;

	// Mascot Animation (Falls from top, lands on badge)
	const mascotFall = spring({ frame: frame - 95, fps, config: { damping: 10, mass: 1.5 } });
	const mascotSquishY = interpolate(linkJolt, [0, 0.5, 1], [1, 0.6, 1], {
		extrapolateRight: "clamp",
	});
	const mascotSquishX = interpolate(linkJolt, [0, 0.5, 1], [1, 1.3, 1], {
		extrapolateRight: "clamp",
	});

	// Centered with link badge, gap is 200px (closer than before)
	const mascotY = interpolate(mascotFall, [0, 1], [-800, -100]) + linkJoltY;

	return (
		<AbsoluteFill className="bg-brand-bg flex items-center justify-center overflow-hidden">
			{/* SULOK & SLOGAN */}
			<div
				className="absolute z-10 flex flex-col items-center gap-4 text-center"
				style={{
					transform: `translateY(${textY}px) scale(${textScale}) rotate(${textRot}deg)`,
				}}
			>
				<h1
					style={{
						transform: `scale(${textScale})`,
						fontFamily: FONT_FAMILY.heading,
						fontVariationSettings: "'WONK' 0, 'SOFT' 0",
					}}
					className="text-brand-text text-[9rem] leading-none font-extrabold tracking-tight italic drop-shadow-sm"
				>
					Sulok
				</h1>
				<p
					style={{ transform: `scale(${sloganScale})` }}
					className="text-brand-text/70 text-4xl font-semibold tracking-wide"
				>
					Your corner of the web.
				</p>
			</div>

			{/* LINK BADGE */}
			<div
				className="absolute z-20 flex items-center justify-center"
				style={{
					transform: `translateY(${linkY}px)`,
				}}
			>
				<div className="text-brand-bg bg-brand-text flex items-center gap-4 rounded-full px-10 py-4 text-3xl font-bold shadow-2xl">
					sulok-app.vercel.app
				</div>
			</div>

			{/* MASCOT */}
			<div
				className="absolute z-30"
				style={{
					transform: `translateY(${mascotY}px) scaleX(${mascotSquishX}) scaleY(${mascotSquishY})`,
					transformOrigin: "bottom center",
				}}
			>
				<Mascot
					expression={frame >= slimeStartFrame ? "neutral" : "shy"}
					className="h-56 w-56 drop-shadow-2xl"
				/>
			</div>

			{/* SLIME TRANSITION */}
			<svg width="0" height="0" className="pointer-events-none absolute">
				<defs>
					<filter id="goo">
						<feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
						<feColorMatrix
							in="blur"
							mode="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -15"
						/>
					</filter>
				</defs>
			</svg>

			<div className="pointer-events-none absolute inset-0 z-50" style={{ filter: "url(#goo)" }}>
				{SLIME_DOTS.map((dot) => {
					const progress = interpolate(
						frame,
						[slimeStartFrame + dot.delay, slimeStartFrame + dot.delay + 45],
						[0, 1],
						{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
					);
					const easeProgress = Easing.inOut(Easing.ease)(progress);
					const scale = interpolate(easeProgress, [0, 1], [0, 25]);

					return (
						<div
							key={dot.id}
							className="bg-brand-text absolute rounded-full"
							style={{
								left: `${dot.x}%`,
								top: `${dot.y}%`,
								width: dot.baseSize,
								height: dot.baseSize,
								marginLeft: -dot.baseSize / 2,
								marginTop: -dot.baseSize / 2,
								transform: `scale(${scale})`,
							}}
						/>
					);
				})}

				{/* Final cleanup circle to ensure full coverage */}
				<div
					className="bg-brand-text absolute rounded-full"
					style={{
						left: "50%",
						top: "50%",
						width: 100,
						height: 100,
						marginLeft: -50,
						marginTop: -50,
						transform: `scale(${interpolate(
							frame,
							[slimeStartFrame + 80, slimeStartFrame + 110],
							[0, 50],
							{ extrapolateLeft: "clamp", extrapolateRight: "clamp" },
						)})`,
					}}
				/>
			</div>
		</AbsoluteFill>
	);
};
