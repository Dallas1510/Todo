export type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoInitial = {
  todos: TodoItem[];
  todoInput: string;
};
