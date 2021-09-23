import type {NextPage} from 'next';
import React from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Projects from '../components/projects';

const Home: NextPage = () => (
	<div className="container mx-auto">
		<Header />
		<Projects />
	</div>
);

export default Home;
