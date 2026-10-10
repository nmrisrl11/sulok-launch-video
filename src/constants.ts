import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadGeistMono } from "@remotion/google-fonts/GeistMono";

export const { fontFamily: manropeFamily } = loadManrope("normal", {
	weights: ["400", "500", "600", "700", "800"],
	subsets: ["latin"],
});

export const { fontFamily: frauncesFamily } = loadFraunces("normal", {
	weights: ["400", "700", "800", "900"],
	subsets: ["latin"],
});

loadFraunces("italic", {
	weights: ["400", "700", "800", "900"],
	subsets: ["latin"],
});

export const { fontFamily: geistMonoFamily } = loadGeistMono("normal", {
	weights: ["400", "700"],
	subsets: ["latin"],
});

export const FONT_FAMILY = {
	sans: manropeFamily,
	heading: frauncesFamily,
	mono: geistMonoFamily,
};
