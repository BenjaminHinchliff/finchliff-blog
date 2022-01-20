import type {FunctionComponent} from 'react';
import Image from 'next/image';
import logoPic from '../public/logo.svg';

const Header: FunctionComponent = () => (
	<div>
		<div className="relative text-center py-20 rounded bg-orange-500 shadow overflow-hidden">
			<div className="absolute left-0 right-0 top-0 z-0 opacity-30">
				<Image src={logoPic} alt="logo picture"></Image>
			</div>
			<h1 className="relative text-6xl font-light">Benjamin Hinchliff</h1>
		</div>
	</div>
);

export default Header;
