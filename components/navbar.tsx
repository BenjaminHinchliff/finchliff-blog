import {useRouter} from 'next/dist/client/router';
import {FunctionComponent} from 'react';
import Link from 'next/link';
import {BiRefresh} from 'react-icons/bi';

const Navbar: FunctionComponent = () => {
	const {pathname} = useRouter();

	const isBlog = pathname === '/blog';

	return (
		<div className="my-1 flex justify-center">
			<Link href={isBlog ? '/' : '/blog'}>
				<a className="inline-block bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-4 mx-auto rounded">
					{isBlog ? 'Blog' : 'Home'}
					<BiRefresh style={{display: 'inline'}} />
				</a>
			</Link>
		</div>
	);
};

export default Navbar;
