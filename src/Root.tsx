import { Composition } from "remotion";
import { SulokLaunchVideo } from "./Composition";
import "./style.css";

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="SulokLaunchVideo"
				component={SulokLaunchVideo}
				durationInFrames={1530}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
