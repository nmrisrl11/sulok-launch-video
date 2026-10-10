import { staticFile } from "remotion";
import { SyncSVG } from "./SyncSVG";

export const Mascot: React.FC<{
	expression: string;
	className?: string;
	style?: React.CSSProperties;
}> = ({ expression, className, style }) => {
	return (
		<SyncSVG src={staticFile(`mascots/sulo-${expression}.svg`)} className={className ? `${className} [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain` : `[&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain`} style={style} />
	);
};
