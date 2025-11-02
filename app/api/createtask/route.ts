import { NextRequest, NextResponse } from "next/server";
import { taskTable } from "@/model/schema";
import { createTask } from "@/db/task";
import { withMiddleware } from "@/apiMiddlewares/middlewareWraper";
import { CreateTask_Payload } from "@/apiMiddlewares/types";

const createHandler = async (
  request: NextRequest,
  body: CreateTask_Payload
) => {
  const { task_name, frequency } = body;
  const newTask: typeof taskTable.$inferInsert = { task_name, frequency };
  try {
    await createTask(newTask);
    return NextResponse.json({ message: "New Task created!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) =>
  withMiddleware<CreateTask_Payload>(createHandler, [])(request);
