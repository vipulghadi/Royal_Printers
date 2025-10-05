import { apiResponse } from "@/lib/apiResponse";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { success, z } from "zod";
import { generateSlug } from "@/lib/utils";
import { uploadImage } from "@/lib/cloudinary";

const categoryUpdateSchema = z.object({
  name: z.string().min(3, "Name is required"),
  isActive: z.boolean().optional(),
});

async function objectExist(id) {
  const category = await prisma.category.findUnique({
    where: { id },
  });
  return category;
}

export const GET = requireAdmin(async (req, { params }) => {
  try {
    const { id } = params;
    const category = objectExist(parseInt(id));

    if (!category) {
      return apiResponse({
        success: false,
        statusCode: 404,
        message: "Category not found",
        data: null,
      });
    }

    return apiResponse({
      data: category,
      message: "Category fetched successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to fetch category",
      data: null,
    });
  }
});

export const DELETE = requireAdmin(async (req, { params }) => {
  try {
    const { id } = await params;
    const category = objectExist(parseInt(id));

    if (!category) {
      return apiResponse({
        success: false,
        statusCode: 404,
        message: "Category not found",
        data: null,
      });
    }

    await prisma.category.delete({
      where: { id: parseInt(id, 10) },
    });

    return apiResponse({
      success: true,
      statusCode: 200,
      message: "Category deleted successfully",
      data: null,
    });
  } catch (error) {
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to delete category",
      data: null,
    });
  }
});

export const PUT = requireAdmin(async (req, { params }) => {
  try {
    const { id } = await params;
    const data = await req.json();

    // Get fields from formData
    const rawData = {
      name: data.name,
      isActive: data.isActive,
    };

    // Zod validation
    const parsed = categoryUpdateSchema.safeParse(rawData);
    if (!parsed.success) {
      return apiResponse({
        success: false,
        statusCode: 400,
        message: "errors in input data",
        data: null,
      });
    }

    const { name, isActive } = parsed.data;

    // Check if category exists
    const existingCategory = objectExist(parseInt(id));

    if (!existingCategory) {
      return apiResponse({
        success: false,
        statusCode: 404,
        message: "Category not found",
        data: null,
      });
    }

    //here i have to check if category exist for this data allready rather than original one
    const duplicated = prisma.category.findFirst({
      where: {
        name: name,
        id: { not: parseInt(id) },
      },
    });

    if (duplicated) {
      return apiResponse({
        success: false,
        message: "category exist with given data",
        data: null,
        statusCode: 404,
      });
    }

    // Update category
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        slug: generateSlug(name),

        isActive: isActive ?? existingCategory.isActive,
      },
    });

    return apiResponse({
      data: updatedCategory,
      message: "Category updated successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to update category",
      data: null,
    });
  }
});
