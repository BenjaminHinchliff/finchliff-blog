import type {NextPage} from 'next';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Projects from '../components/projects';

const Home: NextPage = () => (
	<div className="container mx-auto">
		<h1 className="text-center text-4xl font-light my-4">
			Benjamin Hinchliff
		</h1>
		<Projects />
	</div>
);

export default Home;
