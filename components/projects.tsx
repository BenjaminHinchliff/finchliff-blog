import Project from './project';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from './loader';
import ErrorMsg from './error-msg';
import {FunctionComponent, useState} from 'react';
import {gql, useQuery} from 'urql';

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
				}
			}
		}
	}
`;

const Projects: FunctionComponent = () => {
	const [cursor, setCursor] = useState<string | null>(null);

	const [result] = useQuery<ProjectsShape>({
		query: PROJECT_QUERY,
		variables: {
			cursor,
		},
	});

	const {data, error} = result;

	if (!data) {
		return <Loader />;
	}

	if (error) {
		return <ErrorMsg />;
	}

	const {repositories} = data.viewer;
	const {edges, pageInfo} = repositories;
	const {hasNextPage} = pageInfo;

	const loadMore = () => {
		if (hasNextPage) {
			setCursor(pageInfo.endCursor);
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
