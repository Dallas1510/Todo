import { MouseEvent } from "react";
import { Button, Checkbox, Group, Stack } from "@mantine/core";
import styles from "./TodoList.module.css";
import { useAppDispatch } from "../../../store/store";
import { todoActions } from "../../../slices/todo/todoSlice";
import { TodoItem } from "../../../slices/todo/todoSlice.types";

export const TodoList = ({ todoList }: { todoList: TodoItem[] }) => {
  const dispatch = useAppDispatch();

  return (
    <Stack px={16} py={24}>
      {todoList.map((todo) => (
        <Group
          className={styles.todoWrapper}
          w={"100%"}
          key={todo.id}
          wrap="nowrap"
        >
          <Checkbox
            checked={todo.completed}
            classNames={{
              label: [
                styles.checkLabel,
                todo.completed && styles.completed,
              ].join(" "),
              labelWrapper: styles.checkLabel,
            }}
            h={"100%"}
            mah={"100%"}
            onChange={() => {
              dispatch(todoActions.checkTodo({ todoId: todo.id }));
            }}
            label={todo.title}
            radius={"xl"}
            w={"100%"}
          />

          <Button
            variant="subtle"
            color="red"
            style={{ flex: "0 0 auto" }}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              dispatch(todoActions.removeTodo({ todoId: todo.id }));
            }}
          >
            Remove
          </Button>
        </Group>
      ))}
    </Stack>
  );
};
