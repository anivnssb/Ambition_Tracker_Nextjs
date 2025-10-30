import AddTaskForm from "../components/AddTaskForm";
import StoreProvider from "../store/StoreProvider";
import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <StoreProvider>
      <AddTaskForm />
      <TaskList />
    </StoreProvider>
  );
}
