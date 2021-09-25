import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Project from './cell';
import PageButton from './page-button';

export type ProjectsShape = {
	viewer: {
		repositories: {
			edges: [
				{
					node: {
						id: string;
						name: string;
						url: string;
						description: string;
					};
				},
			];
			pageInfo: {
				endCursor: string;
				hasNextPage: boolean;
				hasPreviousPage: boolean;
				startCursor: string;
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
				edges {
					node {
						id
						name
						url
						description
					}
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
	const {loading, error, data, fetchMore} = useQuery<ProjectsShape>(
		PROJECT_QUERY,
		{
			fetchPolicy: 'cache-first',
		},
	);

	if (loading) {
		return (
			<div
				className="mx-auto my-4 w-16 h-16 border-4 border-yellow-700 border-solid rounded-full animate-spin"
				style={{borderTopColor: 'transparent'}}
			/>
		);
	}

	if (error || !data) {
		return (
			<p className="text-center my-4">
				<span className="text-red-400">Error:</span> something went
				wrong - maybe try again later?
			</p>
		);
	}

	const {repositories} = data.viewer;
	const {edges, pageInfo} = repositories;
	const {hasNextPage} = pageInfo;

	const loadMore = () => {
		if (hasNextPage) {
			fetchMore({
				variables: {
					cursor: pageInfo.endCursor,
				},
			});
		}
	};

	return (
		<div>
			{edges
				.map(({node}) => node)
				.map(({id, ...props}) => (
					<Project key={id} {...props} />
				))}

			<div className="flex justify-center my-2">
				<PageButton active={hasNextPage} onClick={loadMore}>
					Load More
				</PageButton>
			</div>
		</div>
	);
}
