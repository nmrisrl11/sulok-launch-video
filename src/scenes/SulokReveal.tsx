import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Mascot } from "../components/Mascot";
import { FONT_FAMILY } from "../constants";

export const SulokReveal: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const mascotPop = spring({ frame: frame - 0, fps, config: { damping: 14 } });
	const textPop = spring({ frame: frame - 10, fps, config: { damping: 14 } });
	const subTextPop = spring({ frame: frame - 20, fps, config: { damping: 14 } });

	return (
		<AbsoluteFill className="bg-brand-bg flex flex-col items-center justify-center gap-12 p-20">
			<div
				style={{
					opacity: mascotPop,
					transform: `scale(${interpolate(mascotPop, [0, 1], [0.8, 1])}) translateY(${interpolate(mascotPop, [0, 1], [30, 0])}px)`,
				}}
			>
				<Mascot expression="sleepy" className="h-64 w-64" />
			</div>

			<div className="flex flex-col items-center gap-6 text-center">
				<h1
					style={{
						opacity: textPop,
						transform: `translateY(${interpolate(textPop, [0, 1], [20, 0])}px)`,
					}}
					className="text-brand-text text-8xl font-bold tracking-tight"
				>
					Meet{" "}
					<span
						className="font-extrabold italic"
						style={{ fontFamily: FONT_FAMILY.heading, fontVariationSettings: "'WONK' 0, 'SOFT' 0" }}
					>
						Sulok.
					</span>
				</h1>
				<p
					style={{
						opacity: subTextPop,
						transform: `translateY(${interpolate(subTextPop, [0, 1], [20, 0])}px)`,
					}}
					className="text-brand-stone text-5xl font-medium"
				>
					Your corner of the web.
				</p>
			</div>
		</AbsoluteFill>
	);
};
