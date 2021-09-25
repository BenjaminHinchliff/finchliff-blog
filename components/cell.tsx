import React from 'react';

type Props = {
	url?: string;
	name: string;
	description: string;
};

export default function Cell({url, name, description}: Props) {
	return (
		<a
			className="max-w-full block border-b border-gray-400 my-2 px-6 py-4 h-24"
			href={url ?? ''}
			target={url ? '_blank' : ''}
			rel="noreferrer"
		>
			<h2 className="font-bold text-xl mb-2">{name}</h2>
			<p className="text-gray-800 truncate">{description ?? '(no description)'}</p>
		</a>
	);
}
