// lib/apiResponse.js
import { NextResponse } from "next/server";

export function apiResponse({ success = true, statusCode = 200, message = "", data = null }) {
  return NextResponse.json(
    {
      success,
      statusCode,
      message,
      data,
    },
    { status: statusCode }
  );
}
