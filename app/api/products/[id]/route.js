import { apiResponse } from "@/lib/apiResponse";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { generateSlug } from "@/lib/utils";

const updateProductSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  basePrice: z.number().positive({ message: "Base price must be a positive number" }),
  description: z.string().optional(),   
    categoryId: z.number({
        required_error: "Category ID is required",
        invalid_type_error: "Category ID must be a number",
    }).int({ message: "Category ID must be an integer" }).positive({ message: "Category ID must be positive" }),
    isActive: z.boolean(),
});

async function objectExist(id) {
  const product = await prisma.Product.findUnique({
    where: { id, },
    include: {
        category: true,
        attributes: true,
    },
  });
  return product;
}

export const GET = async (req, { params }) => {
  try {
    const { id } = await params;

    const product = await objectExist(parseInt(id));

    if (!product) {
      return apiResponse({
        success: false,
        statusCode: 404,
        message: "Product not found",
        data: null,
      });
    }

    return apiResponse({
      data: product,
      message: "Product fetched successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to fetch product",
      data: null,
    });
  }
}

export const PUT = requireAdmin(async (req, { params }) => {
  try {
    const { id } = await params;
    const data = await req.json();
    
    const product = await objectExist(parseInt(id));

    if (!product) {
      return apiResponse({
        success: false,
        statusCode: 404,
        message: "Product not found",
        data: null,
      });
    }

    // Validate and parse the input data
    const parsedData = updateProductSchema.parse(data);

    // Check if the product with the same name already exists
    const existingProduct = await prisma.Product.findFirst({
      where: { ...parsedData,  },
    });

    if (existingProduct) {
      return apiResponse({
        success: false,
        statusCode: 400,
        message: "Product with this data already exists",
        data: null,
      });
    }

    // Update the product
    const updatedProduct = await prisma.Product.update({
      where: { id: parseInt(id) },
      data: {
        ...parsedData,
        slug: generateSlug(parsedData.name),
      },
    });

    return apiResponse({
      data: updatedProduct,
      message: "Product updated successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    if (error instanceof z.ZodError) {
      return apiResponse({
        success: false,
        statusCode: 400,
        message: error.errors[0].message,
        data: null,
      });
    }
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to update product",
      data: null,
    });
  }
}   );

export const DELETE = requireAdmin(async (req, { params }) => {
    try {
        const { id } = await params;
    
        const product = await objectExist(parseInt(id));
    
        if (!product) {
        return apiResponse({
            success: false,
            statusCode: 404,
            message: "Product not found",
            data: null,
        });
        }
    
        // Soft delete the product
        await prisma.Product.dalete({
        where: { id: parseInt(id) },
    
        });
    
        return apiResponse({
        message: "Product deleted successfully",
        statusCode: 200,
        success: true,
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return apiResponse({
        success: false,
        statusCode: 500,
        message: "Failed to delete product",
        data: null,
        });
    }
    });