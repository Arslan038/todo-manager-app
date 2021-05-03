import UserRepository from './UserRepository';
import TodoRepository from './TodoRepository';

const repositories = {
  user_repository: UserRepository,
  todo_repository: TodoRepository
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};