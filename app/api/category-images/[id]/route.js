import { apiResponse } from "@/lib/apiResponse";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";


export const DELETE = requireAdmin(async (req, { params }) => {
    try {
        const { id } = params;
        const categoryImage = await prisma.categoryImage.findUnique({
        where: { id: parseInt(id, 10), isDeleted: false },
        });
    
        if (!categoryImage) {
        return apiResponse({
            success: false,
            statusCode: 404,
            message: "Category image not found",
            data: null,
        });
        }
    
        await prisma.categoryImage.delete({
        where: { id: parseInt(id, 10) },
    
        });
    
        return apiResponse({
        success: true,
        statusCode: 200,
        message: "Category image deleted successfully",
        data: null,
        });
    } catch (error) {
        console.error("Error deleting category image:", error);
        return apiResponse({
        success: false,
        statusCode: 500,
        message: "Failed to delete category image",
        data: null,
        });
    }
});
