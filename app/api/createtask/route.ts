import { NextRequest, NextResponse } from "next/server";
import { taskTable } from "@/model/schema";
import { createTask } from "@/db/task";

export const POST = async (request: NextRequest) => {
  const { task_name, frequency } = await request.json();
  const newTask: typeof taskTable.$inferInsert = { task_name, frequency };
  try {
    await createTask(newTask);
    return NextResponse.json({ message: "New Task created!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
