import React, {FunctionComponent} from 'react';
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout';
import {createClient, fetchExchange, Provider} from 'urql';
import {cacheExchange} from '@urql/exchange-graphcache';
import {relayPagination} from '@urql/exchange-graphcache/extras';
import {devtoolsExchange} from '@urql/devtools';

const cache = cacheExchange({
	resolvers: {
		User: {
			repositories: relayPagination(),
		},
	},
});

const client = createClient({
	url: '/api/projects',
	exchanges: [devtoolsExchange, cache, fetchExchange],
});

const MyApp: FunctionComponent<AppProps> = ({
	Component,
	pageProps: {session, ...pageProps},
}) => (
	<>
		<Head>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon-16x16.png"
			/>
			<link rel="manifest" href="/site.webmanifest" />
			<link
				rel="mask-icon"
				href="/safari-pinned-tab.svg"
				color="#000000"
			/>
			<meta name="msapplication-TileColor" content="#ffffff" />
			<meta name="theme-color" content="#ffffff" />
		</Head>
		<Layout>
			<Provider value={client}>
				<Component {...pageProps} />
			</Provider>
		</Layout>
	</>
);

export default MyApp;
