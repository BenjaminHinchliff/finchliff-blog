import React from 'react';
import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client';

const link = new HttpLink({
	uri: '/api/projects',
});

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});

function MyApp({Component, pageProps}: AppProps) {
	return <ApolloProvider client={client}>
		<Component {...pageProps} />
	</ApolloProvider>;
}

export default MyApp;
