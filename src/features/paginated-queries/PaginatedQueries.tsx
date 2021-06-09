// https://react-query.tanstack.com/guides/paginated-queries

import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import parse from 'parse-link-header';

type Project = {
  id: number;
  name: string;
};

type ProjectsResponse = {
  projects: Project[];
  hasMore: boolean;
};

function PaginatedQueries() {
  const [page, setPage] = React.useState(1);

  const fetchProjects = (page = 1) => {
    return new Promise<ProjectsResponse>((resolve) => {
      setTimeout(async () => {
        const { data, headers } = await axios.get<Project[]>(
          '/projects?_limit=10&_page=' + page
        );
        const link = parse(headers.link);
        resolve({
          projects: data,
          hasMore: !!link?.next,
        });
      }, 2000);
    });
  };

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery<ProjectsResponse, any>(
      ['projects', page],
      () => fetchProjects(page),
      {
        keepPreviousData: false,
      }
    );

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data?.projects.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          if (!isPreviousData && data?.hasMore) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousData || !data?.hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{' '}
    </div>
  );
}

export default PaginatedQueries;
