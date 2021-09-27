import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import ReactMarkdown from 'react-markdown';
import clientPromise from '../../util/mongodb';

type PostType = {
	_id: string;
	name: string;
	content: string;
	slug: string;
};

type Props = {
	post: PostType;
};

const Post: NextPage<Props> = ({post: {name, content}}) => (
	<div className="px-4">
		<h2 className="my-2 text-4xl underline">{name}</h2>
		<ReactMarkdown>{content}</ReactMarkdown>
	</div>
);

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
	const client = await clientPromise;

	const posts = await client.db().collection('posts').find().toArray();

	const paths = posts.map(({slug}) => ({
		params: {slug},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<Props, PostType> = async ({
	params,
}) => {
	const client = await clientPromise;

	const post = await client
		.db()
		.collection('posts')
		.findOne({slug: params?.slug});

	return {
		props: {
			post: JSON.parse(JSON.stringify(post)),
		},
		revalidate: 60,
	};
};
