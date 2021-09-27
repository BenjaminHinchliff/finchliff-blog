import type {NextPage} from 'next';
import {signIn, signOut, useSession} from 'next-auth/client';
import {FormEvent, useState} from 'react';
import Loader from '../../components/loader';

function nameToSlug(title: string): string {
	return title
		.trim()
		.toLocaleLowerCase()
		.replaceAll(' ', '-')
		.replaceAll(/[^\w-]+/g, '');
}

const Create: NextPage = () => {
	const [session, loading] = useSession();
	const [name, setName] = useState('');
	const [content, setContent] = useState('');

	if (loading) {
		return <Loader />;
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await fetch('/api/blog/create', {
			method: 'POST',
			body: JSON.stringify({name, content, slug: nameToSlug(name)}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};

	if (
		session &&
		session.user?.name === process.env.NEXT_PUBLIC_ADMIN_USERNAME
	) {
		return (
			<>
				<button onClick={() => signOut()}>Sign Out</button>
				<form className="max-w-3xl mx-auto" onSubmit={handleSubmit}>
					<div className="max-w-xs mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="title"
						>
							Title:
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							id="title"
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						<p className="text-sm">
							Slug: {nameToSlug(name) || '(no title)'}
						</p>
					</div>
					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="content"
						>
							Content:{' '}
						</label>
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="content"
							value={content}
							onChange={e => setContent(e.target.value)}
						></textarea>
					</div>
					<input
						className="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
						value="Submit"
					/>
				</form>
			</>
		);
	}

	return (
		<>
			<h2>Unauthorized</h2>
			<p>
				You're not authorized to create posts - please leave this page
				or sign in
			</p>
			<button onClick={() => signIn()}>Sign In</button>
		</>
	);
};

export default Create;
