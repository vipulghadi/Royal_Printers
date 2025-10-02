import { apiResponse } from "@/lib/apiResponse";
import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { uploadImage } from "@/lib/cloudinary";



export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const productId = parseInt(searchParams.get("productId"));
    console.log("Product ID:", productId);

    if (!productId) {
      return apiResponse({
        success: false,
        statusCode: 400,
        message: "Product ID is required",
        data: null,
      });
    }
    const productImages = await prisma.productImage.findMany({
      where: { productId,  isActive: true },
      orderBy: { createdAt: "desc" },
    });

    return apiResponse({
      data: productImages,
      message: "Product images fetched successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching product images:", error);
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to fetch product images",
      data: null,
    });
  }
};

export const POST = requireAdmin(async (req) => {
  try {
    const data = await req.formData();
    console.log("Form Data:", data);
    const productId = parseInt(data.get("productId"));
    const imageFile = data.get("imageFile");

    console.log("Product ID:", productId);
    console.log("Image File:", imageFile);
    
    if (!productId || !imageFile) {
      return apiResponse({
        success: false,
        statusCode: 400,
        message: "Product ID and image file are required",
        data: null,
        });
    }
    
    

    // Check if the product exists
    const product = await prisma.Product.findUnique({
      where: { id: productId},
    });

    if (!product) {
      return apiResponse({
        success: false,
        statusCode: 404,
        message: "Product not found",
        data: null,
      });
    }
    //upload image to cloudinary
    
    if (!imageFile ) {
      return apiResponse({
        success: false,
        statusCode: 400,
        message: "Image file is required",
        data: null,
      });
    }

    let imageUrl = null;
    const fileBuffer = await imageFile.arrayBuffer();
    const mimetype = imageFile.type;
    const folder = "product-images";
    imageUrl = await uploadImage(Buffer.from(fileBuffer), mimetype, folder);

    // Create the product image
    const productImage = await prisma.ProductImage.create({
      data: {
        productId,
        isActive: true,
        url:imageUrl
      },
    });

    return apiResponse({
      data: productImage,
      message: "Product image created successfully",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    console.error("Error creating product image:", error);
    return apiResponse({
      success: false,
      statusCode: 500,
      message: "Failed to create product image",
      data: null,
    });
  }
});
