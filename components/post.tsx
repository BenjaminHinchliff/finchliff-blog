import type {FunctionComponent} from 'react';
import Preview from './preview';
import PreviewBody from './preview-body';
import PreviewTitle from './preview-title';
import Link from 'next/link';

type Props = {
	slug: string;
	name: string;
	content: string;
};

const Post: FunctionComponent<Props> = ({slug, name, content}) => (
	<Preview>
		<Link href={`/blog/${slug}`}>
			<a>
				<PreviewTitle>{name}</PreviewTitle>
				<PreviewBody>{content}</PreviewBody>
			</a>
		</Link>
	</Preview>
);

export default Post;
