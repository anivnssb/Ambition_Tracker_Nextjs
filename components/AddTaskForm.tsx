"use client";
import React, { useState } from "react";
import { useAddTaskMutation } from "@/store/api";
import { Frequency } from "@/types/types";

const AddTaskForm: React.FC = () => {
  const [addTask, { isLoading }] = useAddTaskMutation();
  const [name, setName] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>(Frequency.Daily);
  const handleSubmit = () => {
    if (name.trim()) {
      addTask({ task_name: name, frequency });
    }
  };

  return (
    <div>
      <h1>Ambition Tracker</h1>
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
        <option value={Frequency.Daily}>Daily</option>
        <option value={Frequency.Weekly}>Weekly</option>
      </select>
      <button className="button-primary" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};

export default AddTaskForm;
