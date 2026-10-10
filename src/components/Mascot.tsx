import { staticFile } from "remotion";
import { SyncSVG } from "./SyncSVG";

export const Mascot: React.FC<{
	expression: string;
	className?: string;
	style?: React.CSSProperties;
}> = ({ expression, className, style }) => {
	return (
		<SyncSVG
			src={staticFile(`mascots/sulo-${expression}.svg`)}
			className={
				className
					? `${className} [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain`
					: `[&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain`
			}
			style={style}
		/>
	);
};
