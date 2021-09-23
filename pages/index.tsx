import type {NextPage} from 'next';
import React from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Projects from '../components/projects';

const Home: NextPage = () => (
	<>
		<Head>
			<title>Ben H - Projects</title>
			<meta name="description" content="Benjamin (Ben) Hinchliff Projects Page" />
		</Head>
		<div className="container mx-auto">
			<Header />
			<Projects />
		</div>
	</>
);

export default Home;
