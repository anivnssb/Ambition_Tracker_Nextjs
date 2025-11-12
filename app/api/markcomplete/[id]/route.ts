import { getCompletedDatesById, toggleTaskComplete } from "@/service/task";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: Params) {
  let { id } = await params;
  const { remove, date } = await request.json();
  const result = await getCompletedDatesById(id);

  const { completed_dates } = result[0] as {
    completed_dates: { dates: string[] };
  };
  if (remove) {
    completed_dates.dates.splice(completed_dates.dates.length - 1, 1);
  }
  await toggleTaskComplete(
    remove ? completed_dates.dates : [...completed_dates.dates, date],
    id
  );
  return NextResponse.json(
    { message: "Task Updated Successfully!" },
    { status: 200 }
  );
}
