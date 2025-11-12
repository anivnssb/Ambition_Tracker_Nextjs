import { getTask } from "@/service/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const task = await getTask();
  return NextResponse.json({ tasklist: task }, { status: 200 });
}
