import type {FunctionComponent} from 'react';
import Preview from './preview';
import PreviewBody from './preview-body';
import PreviewTitle from './preview-title';

type Props = {
	name: string;
	content: string;
};

const Post: FunctionComponent<Props> = ({name, content}) => (
	<Preview>
		<PreviewTitle>{name}</PreviewTitle>
		<PreviewBody>{content}</PreviewBody>
	</Preview>
);

export default Post;
