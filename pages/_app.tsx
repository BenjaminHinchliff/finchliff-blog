import React from 'react';
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {relayStylePagination} from '@apollo/client/utilities';

const cache = new InMemoryCache({
	typePolicies: {
		User: {
			fields: {
				repositories: relayStylePagination(),
			},
		},
	},
});

const client = new ApolloClient({
	uri: '/api/projects',
	cache,
});

function MyApp({Component, pageProps}: AppProps) {
	return (
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
			<ApolloProvider client={client}>
				<Component {...pageProps} />
			</ApolloProvider>
		</>
	);
}

export default MyApp;
