"use client";
import React, { useState } from "react";
import { addTask } from "@/store/slice/taskSlice";
import { useTaskDispatch } from "@/store/hook";
import { useAddTaskMutation } from "@/store/api";
import { TailwindButton } from "./buttons/Button";

const AddTaskForm: React.FC = () => {
  const [addTask, { isLoading }] = useAddTaskMutation();
  const [name, setName] = useState<string>("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const handleSubmit = () => {
    if (name.trim()) {
      addTask({ task_name: name, frequency });
    }
  };

  return (
    <div>
      <p>Ambition Tracker</p>
      <input
        placeholder="Enter Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className=" w-md input"
      />

      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value as typeof frequency)}
        className=" w-md input"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <button className="button-primary" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};

export default AddTaskForm;
