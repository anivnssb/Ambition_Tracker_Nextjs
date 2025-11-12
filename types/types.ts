export interface Task {
  id: string;
  task_name: string;
  frequency: string;
  completed_dates: { dates: string[] };
}
