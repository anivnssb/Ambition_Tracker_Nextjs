import { NextRequest, NextResponse } from "next/server";
import { Middleware } from "./types";

export function withMiddleware<T>(
  routeHandler: (request: NextRequest, body: T) => Promise<NextResponse>,
  middlewares: Middleware<T>[]
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const cloned = request.clone();
    const body: T = await cloned.json();
    let result = body;
    if (middlewares.length) {
      for (let i = 0; i < middlewares.length; i++) {
        const middleware = middlewares[i];
        if (i === 0) {
          result = (await middleware(request, body)) as T;
          if (result instanceof NextResponse) {
            return result;
          }
        } else if (i > 0) {
          result = (await middleware(request, result)) as T;
          if (result instanceof NextResponse) {
            return result;
          }
        }
      }
    }

    return routeHandler(request, result);
  };
}
