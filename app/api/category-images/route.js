import { apiResponse } from "@/lib/apiResponse";
import  prisma  from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { z } from "zod";


export const GET = async (req) => {
    try {
    const { searchParams } = new URL(req.url);
    const categoryId = parseInt(searchParams.get("categoryId"));
    console.log("Category ID:", categoryId);
    if (!categoryId) {
      return apiResponse({
        success: false,
        statusCode: 400,
        message: "Category ID is required",
        data: null,
      });
    }
    const categoryImages = await prisma.categoryImage.findMany({
      where: { categoryId, isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return apiResponse({
      data: categoryImages,
      message: "Category images fetched successfully",
      statusCode: 200,
      success: true,
    });
    } catch (error) {
    console.error("Error fetching category images:", error);
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to fetch category images",
      data: null,
    });
    }
};



export const POST = requireAdmin(async (req) => {
  try {
    
    const data =  await req.formData();
    const imageFile= data.get("image");
    const categoryId= data.get("categoryId")?.toString().trim();

    if (!imageFile || !categoryId) {
     return apiResponse({
        success: false,
        statusCode: 400,
        message: "Image file and Category ID are required",
        data: null,
    })

}
    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId, 10) },
    });

    if (!category) {
     return apiResponse({
        success: false,
        statusCode: 404,
        message: "Category not found",
        data: null,
    })

}

    const fileBuffer = await imageFile.arrayBuffer();
    const mimetype = imageFile.type;
    const folder = "category-images";
    const imageUrl = await uploadImage(Buffer.from(fileBuffer), mimetype, folder);

    if (!imageUrl) {
     return apiResponse({
        success: false,
        statusCode: 500,
        message: "Image upload failed",
        data: null,
    })

}
    const categoryImage = await prisma.categoryImage.create({
        data: {
            url: imageUrl,
            categoryId: parseInt(categoryId, 10),
        },
        });
    return apiResponse({
      data: categoryImage,
      message: "Category image uploaded successfully",
      statusCode: 201,
      success: true,
    });
    } catch (error) {
    console.error("Error uploading category image:", error);
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to upload category image",
      data: null,
    });
    }
});

