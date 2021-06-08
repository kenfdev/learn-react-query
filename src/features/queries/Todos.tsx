import { useQuery } from 'react-query';
import axios from 'axios';

type Todo = {
  id: number;
  title: string;
};

function fetchTodoList() {
  return axios.get<Todo[]>('/todos').then((res) => res.data);
}

function Todos() {
  const { isLoading, isError, data, error } = useQuery<Todo[], any>(
    'todos',
    fetchTodoList
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // We can assume by this point that `isSuccess === true`
  return (
    <ul>
      {data?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default Todos;
