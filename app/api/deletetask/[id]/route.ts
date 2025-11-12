import { deleteTask } from "@/service/task";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}
export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;
  await deleteTask(id);
  return NextResponse.json(
    { message: "Task Deleted Successfully!" },
    { status: 200 }
  );
}
