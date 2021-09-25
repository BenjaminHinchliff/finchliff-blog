import type {FunctionComponent} from 'react';

const ErrorMsg: FunctionComponent = () => (
	<p className="text-center my-4">
		<span className="text-red-400">Error:</span> something went wrong -
		maybe try again later?
	</p>
);

export default ErrorMsg;
