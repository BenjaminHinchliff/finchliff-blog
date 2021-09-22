import React from 'react';

type Props = {
	onBack: () => void;
	onNext: () => void;
};

export default function PageButtons({onBack, onNext}: Props) {
	return (
		<div className="flex justify-center my-2">
			<button
				onClick={onBack}
				className="border rounded px-2 py-1 bg-gray-300 hover:bg-gray-400"
			>
				back
			</button>
			<button
				onClick={onNext}
				className="border rounded px-2 py-1 bg-gray-300 hover:bg-gray-400"
			>
				next
			</button>
		</div>
	);
}
