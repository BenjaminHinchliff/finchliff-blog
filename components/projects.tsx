import {gql, useQuery} from '@apollo/client';
import Project from './project';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './loader';
import ErrorMsg from './error-msg';
import {FunctionComponent} from 'react';

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

const Projects: FunctionComponent = () => {
	const {loading, error, data, fetchMore} = useQuery<ProjectsShape>(
		PROJECT_QUERY,
		{
			fetchPolicy: 'cache-first',
		},
	);

	if (loading) {
		return <Loader />;
	}

	if (error || !data) {
		return <ErrorMsg />;
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

	const projects = edges
		.map(({node}) => node)
		.map(({id, ...props}) => <Project key={id} {...props} />);

	return (
		<InfiniteScroll
			dataLength={projects.length}
			next={loadMore}
			hasMore={hasNextPage}
			loader={<Loader />}
			endMessage={
				<p className="text-center text-lg">That's all folks!</p>
			}
		>
			{projects}
		</InfiniteScroll>
	);
};

export default Projects;
