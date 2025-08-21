import { apiResponse } from "@/lib/apiResponse";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const createAttributeOptionSchema = z.object({
  value: z.string().min(3, { message: "Name is required" }),
  attributeId: z.number({
      required_error: "Attribute ID is required",
      invalid_type_error: "Attribute ID must be a number",
    })
    .int({ message: "Attribute ID must be an integer" })
    .positive({ message: "Attribute ID must be positive" }),
});

// async function objectExist(id) {
//   const attributeOption = await prisma.attributeOption.findUnique({
//     where: { id, isDeleted: false },
//   });
//     return attributeOption;
// }

export const GET = async (req) => {
  try {
    const attributes = await prisma.attributeOption.findMany({
      where: { isDeleted: false, isActive: true },
      orderBy: { createdAt: "desc" },
    });

    return apiResponse({
      data: attributes,
      message: "Attributes fetched successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
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
    const data = await req.json();
    const parsedData = createAttributeOptionSchema.parse(data);
    console.log(parsedData);

    // Check if the attribute option already exists
    const existingAttributeOption = await prisma.AttributeOption.findFirst({
      where: { value: parsedData.value, isDeleted: false,attributeId: parsedData.attributeId },
    });

    if (existingAttributeOption) {
      return apiResponse({
        success: false,
        statusCode: 400,
        message: "Attribute option with this name already exists",
        data: null,
      });
    }

    const newAttributeOption = await prisma.attributeOption.create({
      data: {
        value: parsedData.value,
        attributeId: parsedData.attributeId,
        isActive: true,
        isDeleted: false,
      },
    });

    return apiResponse({
      data: newAttributeOption,
      message: "Attribute option created successfully",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
        console.error("Validation Error:", error);
      return apiResponse({
        success: false,
        statusCode: 400,
        message:   "Validation failed",
        data: null,
      });
    }
    console.error("Error creating attribute option:", error);
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to create attribute option",
      data: null,
    });
  }
}   
);

