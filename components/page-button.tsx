import React from 'react';

type Props = {
	active: boolean;
	onClick: () => void;
	children?: React.ReactNode;
};

export default function PageButton({
	active,
	onClick,
	children,
}: Props) {
	return (
		<button
			disabled={!active}
			onClick={onClick}
			className="px-2 py-1 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 border border-gray-400 rounded"
		>
			{children}
		</button>
	);
}
