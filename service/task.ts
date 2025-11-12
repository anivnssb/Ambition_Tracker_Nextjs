import { taskTable } from "@/model/schema";
import { db } from "../db/db";
import { MySqlRawQueryResult } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";

export async function createTask(
  newTask: typeof taskTable.$inferInsert
): Promise<MySqlRawQueryResult> {
  return db.insert(taskTable).values(newTask);
}

export async function deleteTask(id: string): Promise<MySqlRawQueryResult> {
  return db.delete(taskTable).where(eq(taskTable.id, Number(id)));
}

export async function getTask(): Promise<(typeof taskTable.$inferSelect)[]> {
  return db.select().from(taskTable);
}

export async function getCompletedDatesById(
  id: string
): Promise<
  { completed_dates: typeof taskTable.$inferSelect.completed_dates }[]
> {
  return db
    .select({ completed_dates: taskTable.completed_dates })
    .from(taskTable)
    .where(eq(taskTable.id, Number(id)));
}

export async function toggleTaskComplete(
  dates: typeof taskTable.$inferSelect.completed_dates,
  id: string
): Promise<MySqlRawQueryResult> {
  return db
    .update(taskTable)
    .set({
      completed_dates: { dates },
    })
    .where(eq(taskTable.id, Number(id)));
}
