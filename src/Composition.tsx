import { AbsoluteFill, Sequence } from "remotion";
import { FONT_FAMILY } from "./constants";

import { ClosingScene } from "./scenes/ClosingScene";
import { OpeningChaos } from "./scenes/OpeningChaos";
import { OrganizeLinksScene } from "./scenes/OrganizeLinksScene";
import { RediscoverScene } from "./scenes/RediscoverScene";
import { SaveLinkScene } from "./scenes/SaveLinkScene";
import { SulokReveal } from "./scenes/SulokReveal";
import { TheProblemExplained } from "./scenes/TheProblemExplained";
import { PreCloseScene } from "./scenes/PreCloseScene";

export const SulokLaunchVideo: React.FC = () => {
	return (
		<AbsoluteFill style={{ fontFamily: FONT_FAMILY.sans }} className="bg-brand-bg text-brand-text">
			<Sequence durationInFrames={180}>
				<OpeningChaos />
			</Sequence>
			<Sequence from={180} durationInFrames={210}>
				<TheProblemExplained />
			</Sequence>
			<Sequence from={390} durationInFrames={90}>
				<SulokReveal />
			</Sequence>
			<Sequence from={480} durationInFrames={150}>
				<SaveLinkScene />
			</Sequence>
			<Sequence from={630} durationInFrames={150}>
				<OrganizeLinksScene />
			</Sequence>
			<Sequence from={780} durationInFrames={90}>
				<RediscoverScene />
			</Sequence>
			<Sequence from={1000} durationInFrames={410}>
				<ClosingScene />
			</Sequence>
			<Sequence from={870} durationInFrames={160}>
				<PreCloseScene />
			</Sequence>
		</AbsoluteFill>
	);
};
