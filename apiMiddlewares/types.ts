import { NextRequest, NextResponse } from "next/server";

export type Middleware<T> = (
  request: NextRequest,
  body: T
) => Promise<T | NextRequest | NextResponse>;
export type CreateTask_Payload = {
  task_name: string;
  frequency: "daily" | "weekly";
};
