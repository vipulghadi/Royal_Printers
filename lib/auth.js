import { NextResponse } from "next/server";
import { apiResponse } from "./apiResponse";
const TOKEN="admin-token"; 

async function getUserFromRequest(req) {
  // Example if using JWT
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
    if (token !== TOKEN) return null;
  
  const user = { id: 1, role: "admin" }; 
  return user;
}

// Wrapper to restrict route to admins
export function requireAdmin(handler) {
  return async (req, ctx) => {
    const user = await getUserFromRequest(req);

    if (!user || user.role !== "admin") {
      return apiResponse(
        {
          success: false,
          statusCode: 403,
          message: "Forbidden: Admin access required",
          data: null,
        }
      )
    }

    return handler(req, ctx, user);
  };
}
