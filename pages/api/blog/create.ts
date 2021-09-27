import type {NextApiRequest, NextApiResponse} from 'next';
import {getSession} from 'next-auth/client';
import clientPromise from '../../../util/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({req});
	if (
		!session ||
		session.user?.name !== process.env.NEXT_PUBLIC_ADMIN_USERNAME
	) {
		return res.status(401).end();
	}

	const {method, body} = req;

	if (method !== 'POST') {
		return res.status(400).send(`${method} request not allowed to this endpoint`);
	}

	const client = await clientPromise;

	client.db().collection('posts').insertOne(body);

	return res.status(204).end();
};
