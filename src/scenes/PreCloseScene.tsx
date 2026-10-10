import {
	AbsoluteFill,
	Easing,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

export const PreCloseScene: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Global Zoom In
	const zoomFrame = frame - 130;
	const zoomProgress = interpolate(zoomFrame, [0, 25], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const easeZoom = Easing.in(Easing.poly(4))(zoomProgress);
	const sceneScale = interpolate(easeZoom, [0, 1], [1, 100]);
	const searchBgOpacity = interpolate(zoomProgress, [0, 0.05], [1, 0], {
		extrapolateRight: "clamp",
		extrapolateLeft: "clamp",
	});
	const sceneOpacity = interpolate(easeZoom, [0.9, 1], [1, 0]);

	// Titles
	const saveEnter = spring({ frame: frame - 0, fps, config: { damping: 14 } });
	const saveExit = spring({ frame: frame - 45, fps, config: { damping: 14 } });
	const organizeEnter = spring({ frame: frame - 50, fps, config: { damping: 14 } });
	const organizeExit = spring({ frame: frame - 95, fps, config: { damping: 14 } });
	const rediscoverEnter = spring({ frame: frame - 100, fps, config: { damping: 14 } });
	const rediscoverExit = spring({ frame: frame - 145, fps, config: { damping: 14 } });

	const getTitleStyle = (enter: number, exit: number) => ({
		opacity: enter - exit,
		transform: `translateY(${interpolate(enter, [0, 1], [30, 0]) + interpolate(exit, [0, 1], [0, -30])}px)`,
	});

	// SAVE PHASE
	const folderPop = spring({ frame: frame - 5, fps, config: { damping: 12 } });

	const l1Pop = spring({ frame: frame - 10, fps, config: { damping: 12 } });
	const l2Pop = spring({ frame: frame - 15, fps, config: { damping: 12 } });
	const l3Pop = spring({ frame: frame - 20, fps, config: { damping: 12 } });

	const l1Move = spring({ frame: frame - 25, fps, config: { damping: 14 } });
	const l2Move = spring({ frame: frame - 30, fps, config: { damping: 14 } });
	const l3Move = spring({ frame: frame - 35, fps, config: { damping: 14 } });

	// Folder Jolting when items enter
	const bump1 = spring({ frame: frame - 25, fps, config: { damping: 10, mass: 0.5 } });
	const bump2 = spring({ frame: frame - 30, fps, config: { damping: 10, mass: 0.5 } });
	const bump3 = spring({ frame: frame - 35, fps, config: { damping: 10, mass: 0.5 } });

	const jolt1 = interpolate(bump1, [0, 0.5, 1], [0, 0.15, 0], { extrapolateRight: "clamp" });
	const jolt2 = interpolate(bump2, [0, 0.5, 1], [0, 0.15, 0], { extrapolateRight: "clamp" });
	const jolt3 = interpolate(bump3, [0, 0.5, 1], [0, 0.15, 0], { extrapolateRight: "clamp" });
	const totalJolt = jolt1 + jolt2 + jolt3;

	// ORGANIZE PHASE
	const mouseEnter = spring({ frame: frame - 45, fps, config: { damping: 14 } });

	const drag1 = spring({ frame: frame - 55, fps, config: { damping: 14 } });
	const drag2 = spring({ frame: frame - 70, fps, config: { damping: 14 } });
	const drag3 = spring({ frame: frame - 85, fps, config: { damping: 14 } });

	const dragProgressX =
		interpolate(drag1, [0, 1], [0, 250]) +
		interpolate(drag2, [0, 1], [0, -500]) +
		interpolate(drag3, [0, 1], [0, 250]);

	const dragProgressY =
		interpolate(drag1, [0, 1], [0, -150]) +
		interpolate(drag2, [0, 1], [0, 300]) +
		interpolate(drag3, [0, 1], [0, -150]);

	const mouseWaitProgress = spring({ frame: frame - 100, fps, config: { damping: 12 } });

	// REDISCOVER PHASE
	const folderMorphOut = spring({ frame: frame - 105, fps, config: { damping: 12 } });
	const searchMorphIn = spring({ frame: frame - 110, fps, config: { damping: 12 } });

	const mouseClickMove = spring({ frame: frame - 115, fps, config: { damping: 12 } });
	const clickAction = interpolate(frame, [120, 125, 130], [1, 0.8, 1], {
		extrapolateRight: "clamp",
		extrapolateLeft: "clamp",
	});
	const searchClickScale = interpolate(frame, [120, 125, 130], [1, 0.85, 1], {
		extrapolateRight: "clamp",
		extrapolateLeft: "clamp",
	});

	// Calculations
	let mx = interpolate(mouseEnter, [0, 1], [400, 0]);
	mx += dragProgressX;
	mx += interpolate(mouseWaitProgress, [0, 1], [0, 120]);
	mx -= interpolate(mouseClickMove, [0, 1], [0, 90]);

	let my = interpolate(mouseEnter, [0, 1], [400, 0]);
	my += dragProgressY;
	my += interpolate(mouseWaitProgress, [0, 1], [0, 120]);
	my -= interpolate(mouseClickMove, [0, 1], [0, 80]);

	const mouseOpacity =
		interpolate(mouseEnter, [0, 1], [0, 1]) -
		interpolate(zoomProgress, [0, 0.2], [0, 1], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		});
	const mouseScale = clickAction;

	const folderX = dragProgressX;
	const folderY = dragProgressY;
	// Apply jolt to folder scale
	const folderScale = (interpolate(folderPop, [0, 1], [0, 1]) + totalJolt) * (1 - folderMorphOut);

	const finalSearchScale = searchMorphIn * searchClickScale;

	return (
		<AbsoluteFill className="z-50 flex items-center justify-center overflow-hidden">
			<div
				className="flex h-full w-full flex-col items-center justify-center"
				style={{
					opacity: sceneOpacity,
					transform: `scale(${sceneScale})`,
				}}
			>
				{/* SCALED BACKGROUND WITH PROCEDURAL HOLE (Avoids mask texture limits) */}
				<div
					className="pointer-events-none absolute rounded-full"
					style={{
						width: 64,
						height: 64,
						left: "calc(50% - 36px)",
						top: "calc(50% - 36px)",
						boxShadow: "0 0 0 99999px #F7F5F0",
					}}
				/>

				{/* TITLES */}
				<div className="absolute bottom-32 flex items-center justify-center">
					<h2
						className="text-brand-text absolute text-8xl font-bold tracking-tight"
						style={getTitleStyle(saveEnter, saveExit)}
					>
						Save
					</h2>
					<h2
						className="text-brand-text absolute text-8xl font-bold tracking-tight"
						style={getTitleStyle(organizeEnter, organizeExit)}
					>
						Organize
					</h2>
					<h2
						className="text-brand-text absolute text-8xl font-bold tracking-tight"
						style={getTitleStyle(rediscoverEnter, rediscoverExit)}
					>
						Rediscover
					</h2>
				</div>

				{/* CENTER STAGE */}
				<div className="relative flex h-[400px] w-[400px] items-center justify-center">
					{/* SAVE LOGOS */}
					{/* Logo 1: Grok */}
					<div
						className="bg-brand-text absolute z-0 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white p-5 shadow-xl"
						style={{
							opacity: l1Pop - l1Move,
							transform: `
								translate(
									${interpolate(l1Move, [0, 1], [-110, 0])}px, 
									${interpolate(l1Move, [0, 1], [-220, 0])}px
								) 
								scale(${interpolate(l1Pop, [0, 1], [0, 1]) * interpolate(l1Move, [0, 1], [1, 0.3])})
							`,
						}}
					>
						<svg
							width="1024"
							height="1024"
							viewBox="0 0 1024 1024"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="h-full w-full"
						>
							<path
								d="M395.479 633.828L735.91 381.105C752.599 368.715 776.454 373.548 784.406 392.792C826.26 494.285 807.561 616.253 724.288 699.996C641.016 783.739 525.151 802.104 419.247 760.277L303.556 814.143C469.49 928.202 670.987 899.995 796.901 773.282C896.776 672.843 927.708 535.937 898.785 412.476L899.047 412.739C857.105 231.37 909.358 158.874 1016.4 10.6326C1018.93 7.11771 1021.47 3.60279 1024 0L883.144 141.651V141.212L395.392 633.916"
								fill="white"
							/>
							<path
								d="M325.226 695.251C206.128 580.84 226.662 403.776 328.285 301.668C403.431 226.097 526.549 195.254 634.026 240.596L749.454 186.994C728.657 171.88 702.007 155.623 671.424 144.2C533.19 86.9942 367.693 115.465 255.323 228.382C147.234 337.081 113.244 504.215 171.613 646.833C215.216 753.423 143.739 828.818 71.7385 904.916C46.2237 931.893 20.6216 958.87 0 987.429L325.139 695.339"
								fill="white"
							/>
						</svg>
					</div>

					{/* Logo 2: Codex */}
					<div
						className="bg-brand-text absolute z-0 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white p-5 shadow-xl"
						style={{
							opacity: l2Pop - l2Move,
							transform: `
								translate(
									${interpolate(l2Move, [0, 1], [0, 0])}px, 
									${interpolate(l2Move, [0, 1], [-220, 0])}px
								) 
								scale(${interpolate(l2Pop, [0, 1], [0, 1]) * interpolate(l2Move, [0, 1], [1, 0.3])})
							`,
						}}
					>
						<svg
							fill="#fff"
							fillRule="evenodd"
							style={{ flex: "none", lineHeight: 1 }}
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							className="h-full w-full"
						>
							<title>Codex</title>
							<path
								clipRule="evenodd"
								d="M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z"
							></path>
						</svg>
					</div>

					{/* Logo 3: Cursor */}
					<div
						className="bg-brand-text absolute z-0 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white p-6 shadow-xl"
						style={{
							opacity: l3Pop - l3Move,
							transform: `
								translate(
									${interpolate(l3Move, [0, 1], [110, 0])}px, 
									${interpolate(l3Move, [0, 1], [-220, 0])}px
								) 
								scale(${interpolate(l3Pop, [0, 1], [0, 1]) * interpolate(l3Move, [0, 1], [1, 0.3])})
							`,
						}}
					>
						<svg
							id="Ebene_1"
							xmlns="http://www.w3.org/2000/svg"
							version="1.1"
							viewBox="0 0 466.73 532.09"
							className="h-full w-full"
						>
							<path
								fill="#edecec"
								d="M457.43,125.94L244.42,2.96c-6.84-3.95-15.28-3.95-22.12,0L9.3,125.94c-5.75,3.32-9.3,9.46-9.3,16.11v247.99c0,6.65,3.55,12.79,9.3,16.11l213.01,122.98c6.84,3.95,15.28,3.95,22.12,0l213.01-122.98c5.75-3.32,9.3-9.46,9.3-16.11v-247.99c0-6.65-3.55-12.79-9.3-16.11h-.01ZM444.05,151.99l-205.63,356.16c-1.39,2.4-5.06,1.42-5.06-1.36v-233.21c0-4.66-2.49-8.97-6.53-11.31L24.87,145.67c-2.4-1.39-1.42-5.06,1.36-5.06h411.26c5.84,0,9.49,6.33,6.57,11.39h-.01Z"
							/>
						</svg>
					</div>

					{/* FOLDER ICON & LABEL */}
					<div
						className="absolute z-10 flex flex-col items-center justify-center"
						style={{
							transform: `translate(${folderX}px, ${folderY}px) scale(${folderScale})`,
						}}
					>
						<svg
							viewBox="0 0 64 64"
							xmlns="http://www.w3.org/2000/svg"
							width="180"
							height="180"
							className="drop-shadow-2xl"
						>
							<g>
								<path
									d="m59.61 10.69h-29.43c-1.2 0-2.35-.49-3.18-1.36l-3.76-3.94c-.83-.87-1.98-1.36-3.18-1.36h-15.67c-2.43 0-4.39 1.96-4.39 4.38v41.88c0 2.42 1.96 4.39 4.39 4.39h55.22c2.42 0 4.39-1.96 4.39-4.39v-35.21c0-2.42-1.96-4.39-4.39-4.39z"
									fill="#56b2e3"
								></path>
								<path
									d="m57.26 15.07h-50.52c-1.83 0-3.32 1.49-3.32 3.32v33.48c0 1.84 1.49 3.32 3.32 3.32h50.52c1.83 0 3.32-1.49 3.32-3.32v-33.47c0-1.84-1.48-3.33-3.32-3.33z"
									fill="#ffffff"
								></path>
								<path
									d="m59.61 20.42h-55.22c-2.43 0-4.39 1.96-4.39 4.39v30.78c0 2.42 1.96 4.39 4.39 4.39h55.22c2.42 0 4.39-1.96 4.39-4.39v-30.78c0-2.43-1.96-4.39-4.39-4.39z"
									fill="#98cfef"
								></path>
							</g>
						</svg>
						<div className="bg-brand-stone/5 text-brand-text/80 border-brand-stone/10 mt-3 rounded-full border px-5 py-1.5 text-lg font-bold tracking-wide uppercase shadow-sm">
							My Corner
						</div>
					</div>

					{/* SEARCH ICON */}
					<div
						className="absolute z-10 flex items-center justify-center rounded-full p-8"
						style={{
							backgroundColor: `rgba(247, 245, 240, ${searchBgOpacity})`,
							opacity: searchMorphIn,
							transform: `scale(${finalSearchScale})`,
							boxShadow: `0 25px 50px -12px rgba(0, 0, 0, ${interpolate(zoomProgress, [0, 0.1], [0.25, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })})`,
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="96"
							height="96"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-brand-text"
						>
							<path d="m21 21-4.34-4.34" />
							<circle cx="11" cy="11" r="8" />
						</svg>
					</div>

					{/* MOUSE POINTER */}
					<div
						className="absolute z-50 flex items-center justify-center drop-shadow-xl"
						style={{
							opacity: mouseOpacity,
							transform: `translate(${mx}px, ${my}px) scale(${mouseScale})`,
							transformOrigin: "top left",
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="64"
							height="64"
							viewBox="0 0 24 24"
							fill="currentColor"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="-mt-6 -ml-6 text-[#4a3c31]"
						>
							<path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" />
						</svg>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
