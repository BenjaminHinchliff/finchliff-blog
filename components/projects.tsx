import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Project from './project';

export type ProjectsShape = {
	viewer: {
		repositories: {
			nodes: [
				{
					id: string;
					name: string;
					url: string;
					description: string;
				},
			];
			pageInfo: {
				endCursor: string;
				hasNextPage: boolean;
			};
		};
	};
};

const PROJECT_QUERY = gql`
	query ProjectsQuery($cursor: String) {
		viewer {
			id
			repositories(
				first: 10
				after: $cursor
				orderBy: {direction: DESC, field: CREATED_AT}
				privacy: PUBLIC
			) {
				nodes {
					id
					name
					url
					description
				}
				pageInfo {
					endCursor
					hasNextPage
					hasPreviousPage
					startCursor
				}
			}
		}
	}
`;

export default function Projects() {
	const {loading, error, data, fetchMore} =
		useQuery<ProjectsShape>(PROJECT_QUERY);

	if (loading) {
		return <p>loading...</p>;
	}

	if (error || !data) {
		return <p>error :(</p>;
	}

	const {repositories} = data.viewer;
	const {nodes, pageInfo} = repositories;

	return (
		<div>
			<button
				onClick={() => {
					if (pageInfo.hasNextPage) {
						console.log('fetching next');
						fetchMore({
							variables: {
								cursor: pageInfo.endCursor,
							},
						});
					}
				}}
				className="border rounded px-2 py-1 bg-gray-300 hover:bg-gray-400"
			>
				load more
			</button>
			{nodes.map(({id, ...props}) => (
				<Project key={id} {...props} />
			))}
		</div>
	);
}
