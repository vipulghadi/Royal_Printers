import { apiResponse } from "@/lib/apiResponse";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";


export const GET=async (req)=>{
    try {
        const { searchParams } = new URL(req.url);
        const isActive = searchParams.get("isActive")? searchParams.get("isActive") === "true" : true;
        const includeOptions = searchParams.get("includeOptions") ? searchParams.get("includeOptions") === "true" : false;

    
        
        const attributes = await prisma.attribute.findMany({
        where: { isActive: isActive },
        include: includeOptions ? { options: { where: { isActive: true } } } : false,
        orderBy: { createdAt: "desc" },
        });
    
        return apiResponse({
        data: attributes,
        message: "Attributes fetched successfully",
        statusCode: 200,
        success: true,
        });
    } catch (error) {
        console.error("Error fetching attributes:", error);
        return apiResponse({
        success: false,
        statusCode: 500,
        message: "Failed to fetch attributes",
        data: null,
        });
    }
}

export const POST = requireAdmin(async (req) => {
  try {
    const {name} = await req.json();
    console.log(name);


    
// check allready exists
    const existingAttribute = await prisma.attribute.findFirst({
      where: { name, isActive: true },
    });

    if (existingAttribute) {
        console.log("Attribute already exists");
      return apiResponse({
        success: false,
        statusCode: 400,
        message: "Attribute with this name already exists",
        data: null,
      });
    }

    const newAttribute = await prisma.Attribute.create({
      data: {
        name,
        isActive: true,
        
      },
    });

    return apiResponse({
      data: newAttribute,
      message: "Attribute created successfully",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    console.error("Error creating attribute:", error);
    return apiResponse({
      success: false,
      statusCode: 400,
      message: error.message || "Failed to create attribute",
      data: null,
    });
  }
}
)