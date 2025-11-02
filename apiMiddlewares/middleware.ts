import { NextRequest, NextResponse } from "next/server";
import { CreateTask_Payload, Middleware } from "./types";
let converter;
export const promptParsing: Middleware<CreateTask_Payload> = async (
  request,
  body
) => {
  try {
    const cloned = request.clone();
    return body;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
};
