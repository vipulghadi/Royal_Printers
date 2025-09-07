import {apiResponse} from "@/lib/apiResponse";
import {requireAdmin} from "@/lib/auth";
import prisma from "@/lib/prisma";

import {z} from "zod";

const updateAttributeOptionSchema = z.object({
    value: z.string().min(3, "Name is required").optional(),
    isActive: z.boolean().optional(),
    attributeId: z.number({
        required_error: "Attribute ID is required",
        invalid_type_error: "Attribute ID must be a number",
      })
      .int({ message: "Attribute ID must be an integer" })
      .positive({ message: "Attribute ID must be positive" }),
});

async function objectExist(id) {
  const attributeOption = await prisma.attributeOption.findUnique({
    where: { id },
  });
  return attributeOption;
}

export const GET = async (req, { params }) => {
  try {
    const { id } = await params;

    const attributeOption = await objectExist(parseInt(id));

    if (!attributeOption) {
      return apiResponse({
        success: false,
        statusCode: 404,
        message: "Attribute option not found",
        data: null,
      });
    }

    return apiResponse({
      data: attributeOption,
      message: "Attribute option fetched successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to fetch attribute option",
      data: null,
    });
  }
}

export const PUT = requireAdmin(async (req, { params }) => {
    try {
        const { id } = await params;
        const data = await req.json();
        
        const attributeOption = await objectExist(parseInt(id));
    
        if (!attributeOption) {
        return apiResponse({
            success: false,
            statusCode: 404,
            message: "Attribute option not found",
            data: null,
        });
        }
    
        const parsedData = updateAttributeOptionSchema.parse(data);
    
        // Check if the new value already exists
        const existingAttributeOption = await prisma.AttributeOption.findFirst({
        where: { value: parsedData.value, isDeleted: false, attributeId: parsedData.attributeId },
        });
    
        if (existingAttributeOption && existingAttributeOption.id !== parseInt(id)) {
        return apiResponse({
            success: false,
            statusCode: 400,
            message: "Attribute option with this value already exists",
            data: null,
        });
        }
    
        const updatedAttributeOption = await prisma.attributeOption.update({
        where: { id: parseInt(id) },
        data: parsedData,
        });
    
        return apiResponse({
        data: updatedAttributeOption,
        message: "Attribute option updated successfully",
        statusCode: 200,
        success: true,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return apiResponse({
                success: false,
                statusCode: 400,
                message: error.errors.map(e => e.message).join(", "),
                data: null,
            });
        }
        console.error("Error updating attribute option:", error);
        return apiResponse({
        success: false,
        statusCode: 500,
        message: "Failed to update attribute option",
        data: null,
        });
    }
    })


export const DELETE = requireAdmin(async (req, { params }) => {
    try {
        const { id } = await params;

        const attributeOption = await objectExist(parseInt(id));

        if (!attributeOption) {
            return apiResponse({
                success: false,
                statusCode: 404,
                message: "Attribute option not found",
                data: null,
            });
        }

        await prisma.AttributeOption.delete({
            where: { id: parseInt(id) },
        });

        return apiResponse({
            success: true,
            statusCode: 200,
            message: "Attribute option deleted successfully",
            data: null,
        });
    } catch (error) {
        console.error("Error deleting attribute option:", error);
        return apiResponse({
            success: false,
            statusCode: 500,
            message: "Failed to delete attribute option",   
            data: null,
        });
    }
})