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

const CORE_REPO_FIELDS = gql`
	fragment CoreRepoFields on Repository {
		id
		name
		url
		description
	}
`;

const REVERSE_PROJECT_QUERY = gql`
	${CORE_REPO_FIELDS}
	query ProjectsQuery($cursor: String) {
		viewer {
			id
			repositories(
				last: 20
				before: $cursor
				orderBy: {direction: DESC, field: CREATED_AT}
				privacy: PUBLIC
			) {
				nodes {
					...CoreRepoFields
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
	${CORE_REPO_FIELDS}
	query ProjectsQuery($cursor: String) {
		viewer {
			id
			repositories(
				first: 20
				after: $cursor
				orderBy: {direction: DESC, field: CREATED_AT}
				privacy: PUBLIC
			) {
				nodes {
					...CoreRepoFields
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
			></div>
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
	const {nodes, pageInfo} = repositories;
	const {hasPreviousPage, hasNextPage} = pageInfo;

	const prevPage = () => {
		if (pageInfo.hasPreviousPage) {
			fetchMore({
				query: REVERSE_PROJECT_QUERY,
				variables: {
					cursor: pageInfo.startCursor,
				},
			});
			window.scrollTo(0, 0);
		}
	};

	const nextPage = () => {
		if (pageInfo.hasNextPage) {
			fetchMore({
				variables: {
					cursor: pageInfo.endCursor,
				},
			});
			window.scrollTo(0, 0);
		}
	};

	return (
		<div>
			{nodes.map(({id, ...props}) => (
				<Project key={id} {...props} />
			))}
			<PageButtons
				hasBack={hasPreviousPage}
				onBack={prevPage}
				hasNext={hasNextPage}
				onNext={nextPage}
			/>
		</div>
	);
}
