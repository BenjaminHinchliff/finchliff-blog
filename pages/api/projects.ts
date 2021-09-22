// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';

type Data = {
	data: {
		viewer: {
			repositories: {
				edges: [
					{
						cursor: string,
						node: {
							id: string,
							name: string,
							url: string,
						}
					}
				]
			}
		}
	}
} | string;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	const {method} = req;
	if (method !== 'POST') {
		res.status(400).send('400 Bad Request');
	}

	try {
		const response = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`,
			},
			body: JSON.stringify(req.body),
		});
		const json = await response.json();
		res.status(response.status).json(json);
	} catch (_) {
		res.status(500).send('');
	}
}
