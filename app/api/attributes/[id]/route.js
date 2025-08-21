import { apiResponse } from "@/lib/apiResponse";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

import { z } from "zod";

const createAttributeSchema = z.object({
  name: z.string().min(3, "Name is required"),
});

const updateAttributeSchema = z.object({
    name: z.string().min(3, "Name is required").optional(),
    isActive: z.boolean().optional(),
});

async function objectExist(id){
    const attribute = await prisma.Attribute.findUnique({
        where: { id, isDeleted: false },
    });
    return attribute;
}

export const GET = async (req, { params }) => {
  try {
    const { id } = await params;

    const attribute = await objectExist(parseInt(id));

    if (!attribute) {
      return apiResponse({
        success: false,
        statusCode: 404,
        message: "Attribute not found",
        data: null,
      });
    }

    return apiResponse({
      data: attribute,
      message: "Attribute fetched successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to fetch attribute",
      data: null,
    });
  }
}

export const PUT = requireAdmin(async (req, { params }) => {

    try {
        const { id } = await params;
        const data= await req.json();
    
        const attribute = await objectExist(parseInt(id));
    
        if (!attribute) {
        return apiResponse({
            success: false,
            statusCode: 404,
            message: "Attribute not found",
            data: null,
        });
        }
    
        // check if the new name already exists
        const existingAttribute = await prisma.attribute.findFirst({
        where: { name:data.name, isDeleted: false, isActive: true },
        });
    
        if (existingAttribute && existingAttribute.id !== parseInt(id)) {
        return apiResponse({
            success: false,
            statusCode: 400,
            message: "Attribute with this name already exists",
            data: null,
        });
        }
    
        const updatedAttribute = await prisma.attribute.update({
        where: { id: parseInt(id) },
        data: data,
        });
    
        return apiResponse({
        data: updatedAttribute,
        message: "Attribute updated successfully",
        statusCode: 200,
        success: true,
        });
    } catch (error) {
        return apiResponse({
        success: false,
        statusCode: 500,
        message: "Failed to update attribute",
        data: null,
        });
    }
    })

export const DELETE = requireAdmin(async (req, { params }) => {
    try {
        const { id } = await params;

        const attribute = await objectExist(parseInt(id));

        if (!attribute) {
            return apiResponse({
                success: false,
                statusCode: 404,
                message: "Attribute not found",
                data: null,
            });
        }

        // Soft delete the attribute
        const deletedAttribute = await prisma.attribute.update({
            where: { id: parseInt(id) },
            data: { isDeleted: true, isActive: false },
        });

        return apiResponse({
            data: deletedAttribute,
            message: "Attribute deleted successfully",
            statusCode: 200,
            success: true,
        });
    } catch (error) {
        return apiResponse({
            success: false,
            statusCode: 500,
            message: "Failed to delete attribute",
            data: null,
        });
    }
}
);

export const PATCH = requireAdmin(async (req) => {
    try {
        const data = await req.json();

        // Validate input
        const parsedData = updateAttributeSchema.safeParse(data);
        if (!parsedData.success) {
            return apiResponse({
                success: false,
                statusCode: 400,
                message: parsedData.error.errors[0].message,
                data: null,
            });
        }

        // Check if the attribute exists
        const existingAttribute = await prisma.attribute.findFirst({
            where: { data, isDeleted: false, isActive: true },
        });

        if (!existingAttribute) {
            return apiResponse({
                success: false,
                statusCode: 404,
                message: "Attribute not found",
                data: null,
            });
        }

        // Update the attribute
        const updatedAttribute = await prisma.attribute.update({
            where: { id: existingAttribute.id },
            data:data
        });

        return apiResponse({
            data: updatedAttribute,
            message: "Attribute updated successfully",
            statusCode: 200,
            success: true,
        });
    } catch (error) {
        console.error("Error updating attribute:", error);
        return apiResponse({
            success: false,
            statusCode: 500,
            message: "Failed to update attribute",
            data: null,
        });
    }
})