import type {NextPage} from 'next';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Projects from '../components/projects';

const Home: NextPage = () => (
	<div>
		<h1>Benjamin Hinchliff</h1>
		<Projects />
	</div>
);

export default Home;
