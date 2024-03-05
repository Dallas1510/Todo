import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodoInitial } from "./todoSlice.types";

const initialState: TodoInitial = {
  todos: [],
  todoInput: "",
};

export const counterSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoName: (state, { payload }: PayloadAction<string>) => {
      state.todoInput = payload;
    },
    addTodo: (state) => {
      if (state.todoInput)
        state.todos = [
          ...state.todos,
          {
            id: new Date().valueOf(),
            title: state.todoInput,
            completed: false,
          },
        ];
      state.todoInput = "";
    },
    checkTodo: (state, { payload }: PayloadAction<{ todoId: number }>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === payload.todoId
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    },
    removeTodo: (state, { payload }: PayloadAction<{ todoId: number }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload.todoId);
    },
  },
});

export const { actions: todoActions, reducer: todoReducer } = counterSlice;
