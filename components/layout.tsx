import type {FunctionComponent} from 'react';
import Header from './header';

const Layout: FunctionComponent = ({children}) => (
	<main className="container mx-auto">
		<Header />
		{children}
	</main>
);

export default Layout;
