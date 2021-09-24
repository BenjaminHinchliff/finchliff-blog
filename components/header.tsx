import React from 'react';
import Image from 'next/image';
import logoPic from '../public/logo.svg';

export default function Header() {
	return (
		<div className="relative text-center text-6xl font-light py-20 rounded bg-yellow-600 shadow overflow-hidden">
			<div className="absolute left-0 right-0 top-0 z-0 opacity-30">
				<Image src={logoPic} alt="logo picture"></Image>
			</div>
			<h1 className="relative z-10">Benjamin Hinchliff</h1>
		</div>
	);
}
