import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Mascot } from "../components/Mascot";

export const OpeningChaos: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	let expression = "neutral";
	let bubbleText = "";
	let activeBubbleScale = 0;

	const bubbleScale1 = spring({ frame: frame - 15, fps, config: { damping: 14 } });
	const bubbleExit1 = spring({ frame: frame - 55, fps, config: { damping: 14 } });

	const bubbleScale2 = spring({ frame: frame - 60, fps, config: { damping: 14 } });
	const bubbleExit2 = spring({ frame: frame - 100, fps, config: { damping: 14 } });

	const bubbleScale3 = spring({ frame: frame - 105, fps, config: { damping: 14 } });

	if (frame >= 105) {
		expression = "confused";
		bubbleText = "Wait... did I already save this?";
		activeBubbleScale = bubbleScale3;
	} else if (frame >= 60) {
		expression = "suspicious";
		bubbleText = "Where did I save that?";
		activeBubbleScale = bubbleScale2 - bubbleExit2;
	} else if (frame >= 15) {
		expression = "curious";
		bubbleText = "I'll check it later.";
		activeBubbleScale = bubbleScale1 - bubbleExit1;
	}

	const pop1 = spring({ frame: frame - 15, fps, config: { damping: 12 } });
	const pop2 = spring({ frame: frame - 30, fps, config: { damping: 12 } });
	const pop3 = spring({ frame: frame - 45, fps, config: { damping: 12 } });
	const pop4 = spring({ frame: frame - 60, fps, config: { damping: 12 } });

	const float1 = Math.sin(frame / 12) * 12;
	const float2 = Math.sin((frame + 45) / 15) * 15;
	const float3 = Math.sin((frame + 90) / 13) * 10;
	const float4 = Math.sin((frame + 135) / 14) * 14;

	return (
		<AbsoluteFill className="bg-brand-bg flex items-center justify-center overflow-hidden p-20">
			{/* Sulo in the middle */}
			<div className="relative z-10 flex flex-col items-center justify-center">
				{/* Speech Bubble */}
				<div
					className="absolute -top-16 flex w-80 justify-center"
					style={{
						opacity: activeBubbleScale,
						transform: `scale(${activeBubbleScale}) translateY(${interpolate(activeBubbleScale, [0, 1], [20, 0])}px)`,
					}}
				>
					<div className="text-brand-text border-brand-linen relative rounded-2xl border bg-white px-6 py-4 text-center text-xl font-bold shadow-xl">
						{bubbleText}
						{/* Bubble tail */}
						<div className="border-brand-linen absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 transform border-r border-b bg-white"></div>
					</div>
				</div>

				<Mascot expression={expression} className="h-64 w-64 drop-shadow-2xl" />
			</div>

			{/* Floating Windows */}
			{/* Window 1 */}
			<div
				className="absolute top-32 right-64 z-0"
				style={{
					transform: `translateY(${float1}px) scale(${pop1}) rotate(${interpolate(pop1, [0, 1], [-20, 6])}deg)`,
					opacity: interpolate(pop1, [0, 1], [0, 1]),
				}}
			>
				<MockBrowserWindow width="320px" height="240px" />
			</div>

			{/* Window 2 */}
			<div
				className="absolute bottom-32 left-64 z-0"
				style={{
					transform: `translateY(${float2}px) scale(${pop2}) rotate(${interpolate(pop2, [0, 1], [20, -8])}deg)`,
					opacity: interpolate(pop2, [0, 1], [0, 1]),
				}}
			>
				<MockBrowserWindow width="280px" height="200px" />
			</div>

			{/* Window 3 */}
			<div
				className="absolute top-48 left-64 z-0"
				style={{
					transform: `translateY(${float3}px) scale(${pop3}) rotate(${interpolate(pop3, [0, 1], [-15, -12])}deg)`,
					opacity: interpolate(pop3, [0, 1], [0, 1]),
				}}
			>
				<MockBrowserWindow width="300px" height="220px" />
			</div>

			{/* Window 4 (Extra Clutter) */}
			<div
				className="absolute right-64 bottom-40 z-0"
				style={{
					transform: `translateY(${float4}px) scale(${pop4}) rotate(${interpolate(pop4, [0, 1], [15, 10])}deg)`,
					opacity: interpolate(pop4, [0, 1], [0, 0.8]),
				}}
			>
				<MockBrowserWindow width="260px" height="180px" />
			</div>
		</AbsoluteFill>
	);
};

const MockBrowserWindow: React.FC<{ width: string; height: string }> = ({ width, height }) => {
	return (
		<div
			style={{ width, height }}
			className="border-brand-linen/50 flex flex-col overflow-hidden rounded-xl border bg-white/90 shadow-2xl backdrop-blur-sm"
		>
			<div className="bg-brand-linen border-brand-stone/10 flex h-10 w-full items-center gap-2 border-b px-4">
				<div className="h-3 w-3 rounded-full border border-[#E0443E] bg-[#FF5F56]"></div>
				<div className="h-3 w-3 rounded-full border border-[#DEA123] bg-[#FFBD2E]"></div>
				<div className="h-3 w-3 rounded-full border border-[#1AAB29] bg-[#27C93F]"></div>
			</div>
			<div className="flex flex-col gap-3 p-5">
				<div className="bg-brand-stone/10 h-4 w-3/4 rounded"></div>
				<div className="bg-brand-stone/10 h-4 w-full rounded"></div>
				<div className="bg-brand-stone/10 h-4 w-5/6 rounded"></div>
				<div className="bg-brand-stone/10 mt-2 h-4 w-2/3 rounded"></div>
			</div>
		</div>
	);
};
