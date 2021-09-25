import type {FunctionComponent} from 'react';

const Preview: FunctionComponent = ({children}) => (
	<div className="border-b border-gray-400 my-2 px-6 py-4 h-24">
		{children}
	</div>
);

export default Preview;
