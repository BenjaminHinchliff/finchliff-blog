import type {ReactNode} from 'react';
import Header from './header';

type Props = {
	children?: ReactNode;
};

export default function Layout({children}: Props) {
	return (
		<main className="container mx-auto">
			<Header />
			{children}
		</main>
	);
}
