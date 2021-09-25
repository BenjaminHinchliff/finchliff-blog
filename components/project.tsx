import type {FunctionComponent} from 'react';
import Preview from './preview';
import PreviewBody from './preview-body';
import PreviewTitle from './preview-title';

type Props = {
	url: string;
	name: string;
	description: string;
};

const Project: FunctionComponent<Props> = ({url, name, description}) => (
	<Preview>
		<a
			className="max-w-full block"
			href={url}
			target="_blank"
			rel="noreferrer"
		>
			<PreviewTitle>{name}</PreviewTitle>
			<PreviewBody>{description ?? '(no description)'}</PreviewBody>
		</a>
	</Preview>
);

export default Project;
