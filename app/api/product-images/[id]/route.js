import { apiResponse } from "@/lib/apiResponse";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { deleteImage } from "@/lib/cloudinary";


export const DELETE = requireAdmin(async (req, { params }) => {

    try {
        const { id } = await params;
    
        const productImage = await prisma.productImage.findUnique({
        where: { id: parseInt(id), isDeleted: false },
        });
    
        if (!productImage) {
        return apiResponse({
            success: false,
            statusCode: 404,
            message: "Product image not found",
            data: null,
        });
        }
    
        // Soft delete the product image
        await prisma.productImage.delete({
        where: { id: parseInt(id) },
        
        });
    
        // Delete the image from cloudinary
        await deleteImage(productImage.imageUrl);
    
        return apiResponse({
        message: "Product image deleted successfully",
        statusCode: 200,
        success: true,
        });
    } catch (error) {
        console.error("Error deleting product image:", error);
        return apiResponse({
        success: false,
        statusCode: 500,
        message: "Failed to delete product image",
        data: null,
        });
    }
    }
);

