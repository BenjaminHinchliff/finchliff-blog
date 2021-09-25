import {Preview} from './preview';
import PreviewBody from './preview-body';
import PreviewTitle from './preview-title';

type Props = {
	url: string;
	name: string;
	description: string;
};

export default function Project({url, name, description}: Props) {
	return (
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
}
