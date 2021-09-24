import React from 'react';
import Header from './header';

type Props = {
	children?: React.ReactNode;
};

export default function Layout({children}: Props) {
	return (
		<main className="container mx-auto">
			<Header />
			{children}
		</main>
	);
}
