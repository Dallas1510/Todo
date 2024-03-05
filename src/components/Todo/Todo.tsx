import { Stack, Group, TextInput, Button, Tabs } from "@mantine/core";
import { useCallback, useMemo, ChangeEvent } from "react";
import { TodoList } from "./components/TodoList";
import { todoActions } from "../../slices/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import styles from "./Todo.module.css";

export const Todo = () => {
  const dispatch = useAppDispatch();
  const todoName = useAppSelector((store) => store.todoReducer.todoInput);
  const todos = useAppSelector((store) => store.todoReducer.todos);
  const filterTodos = useCallback(
    (key: string) => {
      if (key === "completed") return todos.filter((item) => item.completed);
      if (key === "current") return todos.filter((item) => !item.completed);
      return todos;
    },
    [todos],
  );

  const tabs = useMemo(
    () => [
      {
        value: "all",
        title: "All",
        content: <TodoList todoList={filterTodos("all")} />,
      },
      {
        value: "completed",
        title: "Completed",
        content: <TodoList todoList={filterTodos("completed")} />,
      },
      {
        value: "current",
        title: "Current",
        content: <TodoList todoList={filterTodos("current")} />,
      },
    ],
    [filterTodos],
  );
  const countItems = useCallback(
    (key: string) => {
      if (key === "completed") return `(${filterTodos(key).length})`;
      if (key === "current") return `(${filterTodos(key).length})`;
      return `(${filterTodos(key).length})`;
    },
    [filterTodos],
  );
  return (
    <div className={styles.wrapper}>
      <Stack gap={32}>
        <Group justify="center" wrap="nowrap">
          <TextInput
            w={"100%"}
            value={todoName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(todoActions.setTodoName(e.target.value))
            }
          />
          <Button
            style={{ flex: "0 0 auto" }}
            px={24}
            onClick={() => dispatch(todoActions.addTodo())}
            disabled={!todoName}
          >
            Add ToDo
          </Button>
        </Group>
        <Tabs defaultValue="all">
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value}>
                {tab.title} {countItems(tab.value)}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Panel key={tab.value} value={tab.value}>
              {tab.content}
            </Tabs.Panel>
          ))}
        </Tabs>
      </Stack>
    </div>
  );
};
