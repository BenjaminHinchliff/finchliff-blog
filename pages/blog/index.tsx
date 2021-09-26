import {GetStaticProps, NextPage} from 'next';
import React from 'react';
import Head from 'next/head';
import clientPromise from '../../util/mongodb';
import Post from '../../components/post';

type Props = {
	posts: {
		_id: string;
		name: string;
		content: string;
		slug: string;
	}[];
};

const Blog: NextPage<Props> = ({posts}) => (
	<>
		<Head>
			<title>Ben H - Blog</title>
			<meta
				name="description"
				content="Benjamin (Ben) Hinchliff Blog Page"
			/>
		</Head>
		{posts.map(({_id, ...props}) => (
			<Post key={_id} {...props} />
		))}
	</>
);

export default Blog;

export const getStaticProps: GetStaticProps = async _context => {
	const client = await clientPromise;

	const posts = await client.db().collection('posts').find().toArray();

	return {
		props: {
			posts: JSON.parse(JSON.stringify(posts)),
		},
	};
};
