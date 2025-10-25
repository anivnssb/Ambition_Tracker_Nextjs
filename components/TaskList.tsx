"use client";
import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {tasks.tasklist.map((task) => (
        <Paper key={task.id} elevation={2} sx={{ p: 2 }}>
          <Grid
            container
            alignItems="center"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid>
              <Typography variant="h6">{task.task_name}</Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textTransform: "capitalize" }}
              >
                {task.frequency}
              </Typography>
            </Grid>
            <Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button
                  startIcon={
                    checkCompleted(task) ? (
                      <CheckCircleIcon />
                    ) : (
                      <CheckCircleOutlineOutlinedIcon />
                    )
                  }
                  variant="outlined"
                  onClick={() =>
                    markComplete({
                      id: Number(task.id),
                      remove: checkCompleted(task),
                      date: format(new Date(), "dd/MM/yyyy"),
                    })
                  }
                >
                  {checkCompleted(task) ? "Complete" : "Mark Complete"}
                </Button>
                <Button
                  onClick={() => deleteTask(Number(task.id))}
                  color="error"
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default TaskList;
