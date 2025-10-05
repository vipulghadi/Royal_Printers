import { apiResponse } from "@/lib/apiResponse";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import paginator from "@/lib/paginator";
import { includes, z } from "zod";
import { generateSlug } from "@/lib/utils";
import { Prisma } from "@prisma/client";

const createProductSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  basePrice: z.number().positive({ message: "Base price must be a positive number" }),
  description: z.string().optional(),
  categoryId: z.number({
    required_error: "Category ID is required",
    invalid_type_error: "Category ID must be a number",
  }).int({ message: "Category ID must be an integer" }).positive({ message: "Category ID must be positive" }).optional(),     
});


export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const result=await paginator(
        prisma.Product,{
            include:{
                images:true
            }
        }
    )
    return apiResponse({
      data: result,
      message: "products fetched successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to fetch products",
      data: null,
    });
  }
};


export const POST = requireAdmin(async (req) => {
    try {
        const data = await req.json();
        console.log(data);
        
        const parsedData = createProductSchema.parse(data);
    
        // Check if the attribute option already exists
        const existingProduct = await prisma.Product.findFirst({
        where: parsedData,
        });
    
        if (existingProduct) {
        return apiResponse({
            success: false,
            statusCode: 400,
            message: "Product with this data already exists",
            data: null,
        });
        }
        const slug=generateSlug(parsedData.name);
        const newProduct = await prisma.Product.create({
        data: {...parsedData, slug},
        });
    
        return apiResponse({
        data: newProduct,
        message: "Product created successfully",
        statusCode: 201,
        success: true,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
        console.error("Validation Error:", error);
        return apiResponse({
            success: false,
            statusCode: 400,
            message: error.errors[0].message,
            data: null,
        });
        }
        console.error("Error creating Product:", error);
        return apiResponse({
        success: false,
        statusCode: 500,
        message: "Failed to create product",
        data: null,
        });
    }
    }   
);


