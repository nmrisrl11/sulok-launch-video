import React, { useEffect, useMemo, useState } from "react";
import { continueRender, delayRender, useCurrentFrame, useVideoConfig } from "remotion";

const cache: Record<string, string> = {};

export const SyncSVG: React.FC<{ src: string; className?: string; style?: React.CSSProperties }> = ({ src, className, style }) => {
	const [svgContent, setSvgContent] = useState<string | null>(cache[src] || null);
	const [handle] = useState(() => delayRender());
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	useEffect(() => {
		if (cache[src]) {
			setSvgContent(cache[src]);
			continueRender(handle);
			return;
		}
		fetch(src)
			.then((res) => res.text())
			.then((text) => {
				cache[src] = text;
				setSvgContent(text);
				continueRender(handle);
			})
			.catch((err) => {
				console.error("Failed to fetch SVG", err);
				continueRender(handle);
			});
	}, [src, handle]);

	const timeInSeconds = frame / fps;

	const html = useMemo(() => {
		if (!svgContent) return null;
		
		// Inject a style block at the end of the SVG to freeze all animations
		// at the exact current frame time.
		const styleInject = `
		<style>
			* {
				animation-delay: -${timeInSeconds}s !important;
				animation-play-state: paused !important;
			}
		</style>
		`;
		
		return svgContent.replace('</svg>', `${styleInject}</svg>`);
	}, [svgContent, timeInSeconds]);

	if (!html) return null;

	return (
		<div 
			className={className}
			style={style}
			dangerouslySetInnerHTML={{ __html: html }} 
		/>
	);
};
