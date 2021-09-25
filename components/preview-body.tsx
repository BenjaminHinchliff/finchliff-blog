import type {FunctionComponent} from 'react';

const PreviewBody: FunctionComponent = ({children}) => (
	<p className="text-gray-800 truncate">{children}</p>
);

export default PreviewBody;
