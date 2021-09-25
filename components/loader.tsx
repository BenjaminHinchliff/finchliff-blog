import type {FunctionComponent} from 'react';

const Loader: FunctionComponent = () => (
	<div
		className="mx-auto my-4 w-16 h-16 border-4 border-yellow-700 border-solid rounded-full animate-spin"
		style={{borderTopColor: 'transparent'}}
	/>
);

export default Loader;
