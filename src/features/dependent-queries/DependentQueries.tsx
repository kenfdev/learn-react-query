import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

type User = {
  id: number;
};

type Project = {
  id: number;
  name: string;
};

function getUserByEmail() {
  return new Promise<User>((resolve) => {
    // simulate 3s request
    setTimeout(async () => {
      const { data } = await axios.get<User>('/users/1');
      return resolve(data);
    }, 3000);
  });
}

function getProjectsByUser() {
  return new Promise<Project[]>((resolve) => {
    // simulate 1.5s request
    setTimeout(async () => {
      const { data } = await axios.get<Project[]>('/projects');
      return resolve(data);
    }, 1500);
  });
}

function DependentQueries() {
  // Get the user
  const { data: user } = useQuery(['user' /*, email*/], getUserByEmail);

  const userId = user?.id;

  // Then get the user's projects
  const {
    isIdle,
    data: projects,
    isLoading,
    isError,
    error,
  } = useQuery<Project[], any>(['projects', userId], getProjectsByUser, {
    // The query will not execute until the userId exists
    enabled: !!userId,
  });

  // isIdle will be `true` until `enabled` is true and the query begins to fetch.
  if (isIdle) {
    return <span>Second query idle...</span>;
  }

  // It will then go to the `isLoading` stage and hopefully the `isSuccess` stage :)
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <ul>
        {projects?.map((p) => (
          <li>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DependentQueries;
