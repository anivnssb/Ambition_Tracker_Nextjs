"use client";
import React from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useMarkCompleteMutation,
} from "@/store/api";

import { startOfWeek, endOfWeek, format } from "date-fns";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { Task } from "@/utils/types";

const TaskList: React.FC = () => {
  const {
    data: tasks = { tasklist: [] },
    isLoading,
    error,
  } = useGetTasksQuery();

  const [deleteTask] = useDeleteTaskMutation();
  const [markComplete] = useMarkCompleteMutation();

  const thisWeek = (): string[] => {
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);
    const daysOfWeek = eachDayOfInterval({
      start: weekStart,
      end: weekEnd,
    });
    console.log(daysOfWeek);
    const formattedDays: string[] = daysOfWeek.map((day: Date) =>
      format(day, "dd/MM/yyyy")
    );
    return formattedDays;
  };
  const checkCompleted = (task: Task): boolean => {
    return (
      (task.frequency === "daily" &&
        format(new Date(), "dd/MM/yyyy") ===
          task.completed_dates.dates[task.completed_dates.dates.length - 1]) ||
      (task.frequency === "weekly" &&
        thisWeek().includes(
          task.completed_dates.dates[task.completed_dates.dates.length - 1]
        ))
    );
  };
  return (
    <div>
      {tasks.tasklist.map((task) => (
        <div key={task.id}>
          <div>
            <div>
              <p>{task.task_name}</p>
              <p>{task.frequency}</p>
            </div>
            <div>
              <div>
                <button
                  onClick={() =>
                    markComplete({
                      id: Number(task.id),
                      remove: checkCompleted(task),
                      date: format(new Date(), "dd/MM/yyyy"),
                    })
                  }
                >
                  {checkCompleted(task) ? "Complete " : "Not complete "}
                </button>
                <button
                  onClick={() => deleteTask(Number(task.id))}
                  color="error"
                >
                  &nbsp;Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
