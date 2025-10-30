"use client";
import React from "react";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useMarkCompleteMutation,
} from "@/store/api";

import { startOfWeek, endOfWeek, format } from "date-fns";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { Task } from "@/utils/types";
import { TailwindButton } from "./buttons/Button";

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
    <div className="flex flex-col items-center ">
      {tasks.tasklist.map((task) => (
        <div
          key={task.id}
          className="flex justify-between w-1/2 bg-(--color-brand-light) dark:bg-(--color-brand-dark)"
        >
          <div className="flex justify-between">
            <p>{task.task_name}</p>
            <p>{task.frequency}</p>
          </div>

          <div>
            <TailwindButton
              onClick={() =>
                markComplete({
                  id: Number(task.id),
                  remove: checkCompleted(task),
                  date: format(new Date(), "dd/MM/yyyy"),
                })
              }
              variant="primary"
            >
              {checkCompleted(task) ? "Complete " : "Not complete "}
            </TailwindButton>
            <TailwindButton
              onClick={() => deleteTask(Number(task.id))}
              variant="outline"
            >
              &nbsp;Remove
            </TailwindButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
