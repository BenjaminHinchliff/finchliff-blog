import React from 'react';
import {gql, useQuery} from '@apollo/client';

const PROJECT_QUERY = gql`
  query ProjectsQuery($cursor: String) {
    viewer {
      repositories(first: 10, after: $cursor) {
        edges {
          cursor
          node {
            id
            name
            url
          }
        }
      }
    }
  }
`;

export default function Projects() {
	const {loading, error, data} = useQuery(PROJECT_QUERY);

	if (loading) {
		return <p>loading...</p>;
	}

	if (error) {
		return <p>error :(</p>;
	}

	return (
		<div>
			<pre>
				{JSON.stringify(data, null, 2)}
			</pre>
		</div>
	);
}
