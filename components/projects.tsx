import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Project from './project';
import PageButtons from './page-buttons';

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
				hasPreviousPage: boolean;
				startCursor: string;
			};
		};
	};
};

const REVERSE_PROJECT_QUERY = gql`
	query ProjectsQuery($cursor: String) {
		viewer {
			id
			repositories(
				last: 10
				before: $cursor
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

	const onPrevPage = () => {
		if (pageInfo.hasPreviousPage) {
			fetchMore({
				query: REVERSE_PROJECT_QUERY,
				variables: {
					cursor: pageInfo.startCursor,
				},
			});
		}
	};

	const onNextPage = () => {
		if (pageInfo.hasNextPage) {
			fetchMore({
				variables: {
					cursor: pageInfo.endCursor,
				},
			});
		}
	};

	return (
		<div>
			{nodes.map(({id, ...props}) => (
				<Project key={id} {...props} />
			))}
			<PageButtons onBack={onPrevPage} onNext={onNextPage} />
		</div>
	);
}
