import type {NextPage} from 'next';
import React from 'react';
import Head from 'next/head';
import Projects from '../components/projects';

const Home: NextPage = () => (
	<>
		<Head>
			<title>Ben H - Projects</title>
			<meta name="description" content="Benjamin (Ben) Hinchliff Projects Page" />
		</Head>
		<Projects />
	</>
);

export default Home;
