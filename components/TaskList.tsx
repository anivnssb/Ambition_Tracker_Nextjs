"use client";
import React from "react";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useMarkCompleteMutation,
} from "@/store/api";

import { startOfWeek, endOfWeek, format } from "date-fns";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { Frequency, Task } from "@/types/types";

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
      (task.frequency === Frequency.Daily &&
        format(new Date(), "dd/MM/yyyy") ===
          task.completed_dates.dates[task.completed_dates.dates.length - 1]) ||
      (task.frequency === Frequency.Weekly &&
        thisWeek().includes(
          task.completed_dates.dates[task.completed_dates.dates.length - 1]
        ))
    );
  };
  return (
    <div className="flex flex-col items-center mt-16">
      {tasks.tasklist.map((task) => (
        <div
          key={task.id}
          className="flex justify-between w-1/2 items-center bg-background-light dark:bg-background-dark border-b border-b-border-light dark:border-b-border-dark  mb-2 p-4 shadow relative"
        >
          <div>
            <p>{task.task_name}</p>
          </div>
          <span className="absolute right-2/3 bg-brand dark:bg-brand-dark text-text-dark dark:text-text-light pl-2 pr-2 pb-1 pt-1 rounded">
            {task.frequency}
          </span>
          <div className="flex justify-around gap-2">
            <button
              className="button-primary"
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
              className="button-outline"
              onClick={() => deleteTask(Number(task.id))}
            >
              &nbsp;Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
