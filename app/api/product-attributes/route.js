import { apiResponse } from "@/lib/apiResponse";
import prisma from "@/lib/prisma";
import paginator  from "@/lib/paginator";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";

const createProductAttributeSchema = z.object({
    productId:z.number().positive(),
    attributeId:z.number().positive(),
    attributeOptionId:z.number().positive(),
    priceAdjustment:z.number().min(0).optional().default(0)
});


export  const GET = async (req) => {
    try {
      const { searchParams } = new URL(req.url);
      const page = parseInt(searchParams.get("page")) || 1;
      const limit = parseInt(searchParams.get("limit")) || 10;
      const productId = searchParams.get("productId");

    if (!productId) {
            return apiResponse({
              success: false,
              statusCode: 400,
              message: "productId  is required",
              data: null,
            });
          }
  
      const result = await paginator(
        prisma.ProductAttribute,
        {
          where: { isDeleted: false, isActive: true,productId:Number(productId) },
          orderBy: { createdAt: "desc" },
        },
        page,
        limit
      );
  
      return apiResponse({
        data: result,
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
        const data = await req.json();
        const parsedData = createProductAttributeSchema.parse(data);
    
        // Check if the attribute option already exists
        const existingProduct = await prisma.ProductAttribute.findFirst({
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
        
        const newProduct = await prisma.ProductAttribute.create({
        data: parsedData,
        });
    
        return apiResponse({
        success: true,
        statusCode: 201,
        message: "Product created successfully",
        data: newProduct,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return apiResponse({
        success: false,
        statusCode: 500,
        message: "Failed to create product",
        data: null,
        });
    }
});