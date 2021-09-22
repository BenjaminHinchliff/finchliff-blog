import React from 'react';
import '../styles/globals.css';
import type {AppProps} from 'next/app';
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
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;
