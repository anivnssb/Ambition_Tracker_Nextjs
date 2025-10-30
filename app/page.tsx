import AddTaskForm from "../components/AddTaskForm";
import StoreProvider from "../store/StoreProvider";
import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <StoreProvider>
      <div className="bg-[var(--color-brand)] shadow-[var(--shadow-card)] rounded-[var(--radius-xl)]">
        Hello Tailwind 4
      </div>

      <AddTaskForm />
      <TaskList />
    </StoreProvider>
  );
}
