import { apiResponse } from "@/lib/apiResponse";
import prisma from "@/lib/prisma";
import paginator  from "@/lib/paginator";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";


const updateProductAttributeSchema = z.object({
    productId:z.number().positive(),
    attributeId:z.number().positive(),
    attributeOptionId:z.number().positive(),
    priceAdjustment:z.number().min(0),
    isActive:z.boolean()
});

export  const GET = async (req, { params }) => {
    try {
      const { id } = params;
      const attribute = await prisma.ProductAttribute.findFirst({
        where: { id: Number(id), isDeleted: false },
      });
  
      if (!attribute) {
        return apiResponse({
          success: false,
          statusCode: 404,
          message: "Product Attribute not found",
          data: null,
        });
      }
  
      return apiResponse({
        data: attribute,
        message: "Product Attribute fetched successfully",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching product attribute:", error);
      return apiResponse({
        success: false,
        statusCode: 500,
        message: "Failed to fetch product attribute",
        data: null,
      });
    }
  }


export const PUT = requireAdmin(async (req, { params }) => {
    try {
        const { id } = await params;
        const body = await req.json();
        console.log(body);
        
        const parsed = updateProductAttributeSchema.safeParse(body);
        console.log(parsed);
        
        if (!parsed.success) {
          return apiResponse({
            success: false,
            statusCode: 400,
            message: "Invalid request data",
            data: parsed.error.errors,
          });
        }
    
        const existing = await prisma.ProductAttribute.findFirst({
          where: { id: Number(id), isDeleted: false },
        });
    
        if (!existing) {
          return apiResponse({
            success: false,
            statusCode: 404,
            message: "Product Attribute not found",
            data: null,
          });
        }
    
        const updated = await prisma.ProductAttribute.update({
          where: { id: Number(id) },
          data: {
            productId: parsed.data.productId,
            attributeId: parsed.data.attributeId,
            attributeOptionId: parsed.data.attributeOptionId,
            priceAdjustment: parsed.data.priceAdjustment,
            isActive: parsed.data.isActive,
          },
        });
    
        return apiResponse({
          data: updated,
          message: "Product Attribute updated successfully",
          statusCode: 200,
          success: true,
        });
      } catch (error) {
        console.error("Error updating product attribute:", error);
        return apiResponse({
          success: false,
          statusCode: 500,
          message: "Failed to update product attribute",
          data: null,
        });
      }
    });

export const DELETE = requireAdmin(async (req, { params }) => {
    try {
        const { id } = await params;
    
        const existing = await prisma.ProductAttribute.findFirst({
          where: { id: Number(id), isDeleted: false },
        });
    
        if (!existing) {
          return apiResponse({
            success: false,
            statusCode: 404,
            message: "Product Attribute not found",
            data: null,
          });
        }
    
        await prisma.ProductAttribute.update({
          where: { id: Number(id) },
          data: { isDeleted: true },
        });
    
        return apiResponse({
          message: "Product Attribute deleted successfully",
          statusCode: 200,
          success: true,
        });
      } catch (error) {
        console.error("Error deleting product attribute:", error);
        return apiResponse({
          success: false,
          statusCode: 500,
          message: "Failed to delete product attribute",
          data: null,
        });
      }
    });