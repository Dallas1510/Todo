import { Todo } from "../components/Todo/Todo";
import "./App.css";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <Todo />
    </div>
  );
}

export default App;
